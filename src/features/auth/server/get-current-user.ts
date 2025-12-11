// /src/features/auth/lib/server-session.ts
import { cookies } from "next/headers";

export interface ServerSession {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url: string | null;
    email_verified: boolean;
  } | null;
}

/**
 * Get the current session on the server side
 * Similar to NextAuth's getServerSession()
 */
export async function getServerSession(): Promise<ServerSession> {
  try {
    const cookieStore = await cookies();

    // Convert cookies to string for backend
    const cookieString = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    if (!cookieString) {
      return { user: null };
    }

    // Call your backend to validate session
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store", // Important: don't cache auth requests
    });

    if (!response.ok) {
      return { user: null };
    }

    const data = await response.json();

    return {
      user: data.data.user,
    };
  } catch (error) {
    console.error("Server session error:", error);
    return { user: null };
  }
}
