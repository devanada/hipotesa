import { NextResponse } from "next/server";
import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const pathname = req.nextUrl.pathname;

  const redirectPatterns = [
    "/dashboard/categories/:id",
    "/dashboard/products/:id",
    "/dashboard/users/:id",
  ];

  for (const pattern of redirectPatterns) {
    const escapedPattern = pattern.replace(":id", "\\d+");
    const regex = new RegExp(`^${escapedPattern}$`);

    if (pathname.match(regex)) {
      const url = req.nextUrl.clone();
      url.pathname = pathname.replace(/\/\d+$/, "");

      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
