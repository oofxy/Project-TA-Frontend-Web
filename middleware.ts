import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin"];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isLoggedin = !!session?.user;
  const { pathname } = req.nextUrl;

  if (
    !isLoggedin &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedin && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/auth/:path*"],
};
