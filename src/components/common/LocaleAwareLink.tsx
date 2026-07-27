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
  "/pins": "/pins",
  "/produtos": "/products",
  "/categorias": "/categories",
  "/pinterest": "/pinterest",
};

const EN_TO_PT_ROUTES: Record<string, string> = {};

for (const [pt, en] of Object.entries(PT_TO_EN_ROUTES)) {
  EN_TO_PT_ROUTES[en] = pt;
}

function normalizeHref(href: string) {
  return href.split("#")[0].split("?")[0];
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

  const cleanHref = normalizeHref(href);

  const isPTRoute = Object.prototype.hasOwnProperty.call(PT_TO_EN_ROUTES, cleanHref) || Object.keys(PT_TO_EN_ROUTES).some((route) => cleanHref === route || cleanHref.startsWith(route + "/"));
  const isENRoute = Object.prototype.hasOwnProperty.call(EN_TO_PT_ROUTES, cleanHref) || Object.keys(EN_TO_PT_ROUTES).some((route) => cleanHref === route || cleanHref.startsWith(route + "/"));

  if (isPTRoute) {
    const baseRoute = Object.keys(PT_TO_EN_ROUTES).find((route) => cleanHref === route || cleanHref.startsWith(route + "/"));
    if (baseRoute) {
      const targetRoute = locale === "en" ? PT_TO_EN_ROUTES[baseRoute] : baseRoute;
      const suffix = href.slice(normalizeHref(href).length);
      resolvedHref = localePrefix + (cleanHref === baseRoute ? targetRoute : targetRoute + suffix);
    }
  } else if (isENRoute) {
    const baseRoute = Object.keys(EN_TO_PT_ROUTES).find((route) => cleanHref === route || cleanHref.startsWith(route + "/"));
    if (baseRoute) {
      const targetRoute = locale === "pt" ? EN_TO_PT_ROUTES[baseRoute] : baseRoute;
      const suffix = href.slice(normalizeHref(href).length);
      resolvedHref = localePrefix + (cleanHref === baseRoute ? targetRoute : targetRoute + suffix);
    }
  }

  if (!href.startsWith("/")) {
    resolvedHref = href;
  } else if (!resolvedHref.startsWith(`/${locale}`) && !resolvedHref.startsWith("http")) {
    resolvedHref = `/${locale}${resolvedHref}`;
  }

  return (
    <Link href={resolvedHref} {...props}>
      {children}
    </Link>
  );
}

