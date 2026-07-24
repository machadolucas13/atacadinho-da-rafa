export function getItemViews(slug: string, baseViews?: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  const deterministic = Math.abs(hash % 8000) + 1500;
  if (typeof window === "undefined") return baseViews ?? deterministic;
  try {
    const key = `views_${slug}`;
    const stored = parseInt(localStorage.getItem(key) || "0", 10);
    if (!stored) {
      localStorage.setItem(key, String(deterministic));
      return deterministic;
    }
    return stored;
  } catch {
    return baseViews ?? deterministic;
  }
}

export function incrementItemViews(slug: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const key = `views_${slug}`;
    const current = parseInt(localStorage.getItem(key) || "0", 10);
    const next = current + 1;
    localStorage.setItem(key, String(next));
    return next;
  } catch {
    return 0;
  }
}
