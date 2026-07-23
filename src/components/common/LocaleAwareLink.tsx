"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const PT_TO_EN_ROUTES: Record<string, string> = {
  "/sobre": "/about",
  "/contato": "/contact",
  "/politica-privacidade": "/privacy-policy",
  "/termos-de-uso": "/terms-of-use",
  "/favoritos": "/favorites",
  "/busca": "/search",
  "/artigos": "/articles",
};

const EN_TO_PT_ROUTES: Record<string, string> = {};

for (const [pt, en] of Object.entries(PT_TO_EN_ROUTES)) {
  EN_TO_PT_ROUTES[en] = pt;
}

export default function LocaleAwareLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] === "en" ? "en" : "pt";

  const localePrefix = `/${locale}`;
  let resolvedHref = href;

  const isPTRoute = Object.prototype.hasOwnProperty.call(PT_TO_EN_ROUTES, href) || Object.keys(PT_TO_EN_ROUTES).some((route) => href.startsWith(route + "/"));
  const isENRoute = Object.prototype.hasOwnProperty.call(EN_TO_PT_ROUTES, href) || Object.keys(EN_TO_PT_ROUTES).some((route) => href.startsWith(route + "/"));

  if (isPTRoute) {
    const baseRoute = Object.keys(PT_TO_EN_ROUTES).find((route) => href === route || href.startsWith(route + "/"));
    if (baseRoute) {
      const targetRoute = locale === "en" ? PT_TO_EN_ROUTES[baseRoute] : baseRoute;
      resolvedHref = localePrefix + (href === baseRoute ? targetRoute : targetRoute + href.slice(baseRoute.length));
    }
  } else if (isENRoute) {
    const baseRoute = Object.keys(EN_TO_PT_ROUTES).find((route) => href === route || href.startsWith(route + "/"));
    if (baseRoute) {
      const targetRoute = locale === "pt" ? EN_TO_PT_ROUTES[baseRoute] : baseRoute;
      resolvedHref = localePrefix + (href === baseRoute ? targetRoute : targetRoute + href.slice(baseRoute.length));
    }
  }

  return (
    <Link href={resolvedHref} {...props}>
      {children}
    </Link>
  );
}
