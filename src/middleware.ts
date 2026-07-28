import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/" || pathname === "") {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const isPortuguese = acceptLanguage.toLowerCase().startsWith("pt");

    const destination = isPortuguese ? "/pt" : "/en";

    return NextResponse.redirect(new URL(destination, request.url), 302);
  }

  const localePattern = /^\/(en|pt)(\/|$)/;
  if (!localePattern.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/pt${pathname}`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/(en|pt)/:path*",
  ],
};

