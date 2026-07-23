import { Pin } from "@/data/pins";

export async function getPins(locale?: string): Promise<Pin[]> {
  const { pins } = await import("@/data/pins");
  if (locale) {
    return pins.filter((p) => p.locale === locale);
  }
  return pins;
}

export async function getPinBySlug(slug: string, locale: string): Promise<Pin | undefined> {
  const all = await getPins(locale);
  return all.find((p) => p.slug === slug);
}
