export function getItemViews(slug: string | undefined | null): number {
  const safeSlug = slug || "fallback";
  let hash = 0;
  for (let i = 0; i < safeSlug.length; i++) {
    hash = ((hash << 5) - hash) + safeSlug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 8000) + 1500;
}
