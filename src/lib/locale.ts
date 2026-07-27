import {notFound} from 'next/navigation';

export const LOCALES = ['pt', 'en'] as const;
export const DEFAULT_LOCALE = 'pt';

export type Locale = 'pt' | 'en';

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/')[1];
  if (segment === 'en') return 'en';
  if (segment === 'pt') return 'pt';
  return DEFAULT_LOCALE;
}

export function validateLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

