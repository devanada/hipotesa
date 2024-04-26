import { NextResponse } from "next/server";

import { auth } from "@/auth";

// const protectedRoutes = ["/dashboard", "/user", "/user/settings"];
const unprotectedRoutes = ["/", "/login", "/register"];

export default auth((req) => {
  const url = req.nextUrl.clone();

  if (!req.auth) {
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (req.auth && unprotectedRoutes.includes(url.pathname)) {
    const absoluteURL = new URL("/", url.origin);

    return NextResponse.redirect(absoluteURL.toString());
  }
});

export const config = {
  matcher: ["/products/:path*", "/admin/:path*", "/user/:path*"],
};

// export default async function middleware(request: NextRequest) {
//   const session = await auth();

//   const isProtectedRoute = protectedRoutes.some((prefix) =>
//     request.nextUrl.pathname.startsWith(prefix)
//   );

//   if (!session && isProtectedRoute) {
//     const absoluteURL = new URL("/", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
//   if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
//     const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }

export const runtime = "experimental-edge";
