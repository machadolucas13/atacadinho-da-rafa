"use client";

import { useState, useEffect, useCallback } from "react";

const countCache = new Map<string, number>();

export function useViewCount(slug: string | undefined | null) {
  const [views, setViews] = useState<number>(() => {
    if (!slug) return 0;
    return countCache.get(slug) ?? 0;
  });
  const [loading, setLoading] = useState(!slug || !countCache.has(slug));

  useEffect(() => {
    if (!slug) return;
    if (countCache.has(slug)) {
      setViews(countCache.get(slug)!);
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetch(`/api/views/increment?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        const v = typeof data?.views === "number" ? data.views : 0;
        countCache.set(slug, v);
        setViews(v);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const increment = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch("/api/views/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (typeof data?.views === "number") {
        countCache.set(slug, data.views);
        setViews(data.views);
      }
    } catch {
      // ignore
    }
  }, [slug]);

  return { views, loading, increment };
}
