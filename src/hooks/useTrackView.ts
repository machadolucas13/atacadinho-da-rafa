"use client";

import { useEffect } from "react";

export function useTrackView(slug: string | undefined | null) {
  useEffect(() => {
    if (!slug || typeof window === "undefined") return;

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetch("/api/views/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        signal: controller.signal,
      }).catch(() => {});
    }, 1000);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [slug]);
}
