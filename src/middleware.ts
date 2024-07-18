import { NextResponse } from "next/server";
import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const pathname = req.nextUrl.pathname;
  const sessionCookie =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";
  const session = !!req.cookies.get(sessionCookie);

  // const redirectPatterns = [
  //   "/dashboard/categories/:id",
  //   "/dashboard/products/:id",
  //   "/dashboard/users/:id",
  // ];

  // for (const pattern of redirectPatterns) {
  //   const escapedPattern = pattern.replace(":id", "[a-zA-Z0-9_]+");
  //   const regex = new RegExp(`^${escapedPattern}$`);

  //   if (pathname.match(regex) && !pathname.endsWith("/create")) {
  //     console.log(pathname);
  //     const url = req.nextUrl.clone();
  //     url.pathname = pathname.replace(/\/[a-zA-Z0-9_]+$/, "");

  //     return NextResponse.redirect(url, 308);
  //   }
  // }

  if (!session) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${pathname}`, req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*", "/transactions"],
};
