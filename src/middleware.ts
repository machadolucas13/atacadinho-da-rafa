import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import { verifySession } from "@/server/admin-session";

const LOCALES = ['pt', 'en'];
const DEFAULT_LOCALE = 'pt';
const ADMIN_PATHS = ['/admin', '/admin/login', '/admin/dashboard', '/admin/novo-post', '/admin/nova-pasta', '/admin/novo-artigo'];

function isAdminPath(pathname: string) {
  return ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

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

  if (isAdminPath(pathname)) {
    const session = request.cookies.get('admin_session')?.value;
    const ADMIN_SECRET = process.env.ADMIN_SECRET;
    if (!ADMIN_SECRET || !verifySession(ADMIN_SECRET, session)) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    if (pathname === '/admin' || pathname === '/admin/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

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
