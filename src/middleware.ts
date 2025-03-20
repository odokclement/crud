// middleware.js (or middleware.ts)
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow access to auth routes for unauthenticated users
  if (pathname.startsWith("/auth") || token) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

// Specify the routes to protect
export const config = {
  matcher: ["/UserList/:path*","//:path*"],
};