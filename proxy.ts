import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/verify-email",
  "/terms",
  "/privacy",
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check for auth token in cookies
  const sessionToken = request.cookies.get("session_token")?.value;

  // 2. If no token and trying to access protected route → redirect to login
  if (!sessionToken && !isPublicRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. If has token, allow through (backend will validate)
  // DON'T validate token here - that causes infinite loops
  return NextResponse.next();
}

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export const config = {
  matcher: ["/((?!api|_next|_static|favicon.ico|public).*)"],
};
