import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/about", "/authors", "/categories"];
const authRoutes = ["/login", "/register", "/verify-email"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session_token")?.value;

  // 🔒 1. If has cookie, assume logged in (let backend verify)
  if (sessionToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔐 2. If no cookie, redirect to login
  if (!sessionToken && isPrivateRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

function isPrivateRoute(pathname: string): boolean {
  return privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
