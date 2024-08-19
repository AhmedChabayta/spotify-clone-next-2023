import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });
  const { pathname } = request.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/artists"],
};
