import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get("host") || "";

  if (pathname === "/" || pathname === "") {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const isPortuguese = acceptLanguage.toLowerCase().startsWith("pt");

    const destination = isPortuguese ? "/pt" : "/en";

    return NextResponse.redirect(new URL(destination, request.url), 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
