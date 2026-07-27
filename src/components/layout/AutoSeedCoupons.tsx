"use client";

import { useEffect } from "react";

export default function AutoSeedCoupons() {
  useEffect(() => {
    let timeout: number | undefined;
    let mounted = true;

    const seed = async () => {
      try {
        const res = await fetch("/api/cupons/seed", { method: "POST" });
        if (!mounted) return;
        if (res.ok) {
          console.log("Cupons seed ok");
        } else {
          console.warn("Cupons seed failed", await res.text());
        }
      } catch (e) {
        if (!mounted) return;
        console.error("Auto-seed cupons falhou", e);
      }
    };

    const run = () => {
      if (typeof window === "undefined") return;
      const last = Number(window.localStorage.getItem("coupons-seeded") || 0);
      const now = Date.now();
      if (now - last > 1000 * 60 * 30) {
        seed().finally(() => {
          if (mounted) window.localStorage.setItem("coupons-seeded", String(now));
        });
      }
    };

    timeout = window.setTimeout(run, 2000);
    const interval = window.setInterval(run, 1000 * 60 * 30);

    return () => {
      mounted = false;
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return null;
}

