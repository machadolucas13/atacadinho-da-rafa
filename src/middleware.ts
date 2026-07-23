import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const LOCALES = ['pt', 'en'];
const DEFAULT_LOCALE = 'pt';

function getLocaleFromRequest(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const referer = request.headers.get('referer') || '';

  if (referer.includes('raphaella_oficial') || referer.includes('amazon')) {
    return 'en';
  }
  if (referer.includes('shopee_do_brasil') || referer.includes('brasil')) {
    return 'pt';
  }

  if (acceptLanguage.startsWith('en')) {
    return 'en';
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const segments = pathname.split('/');
  const maybeLocale = segments[1];

  if (LOCALES.includes(maybeLocale as 'pt' | 'en')) {
    return NextResponse.next();
  }

  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
