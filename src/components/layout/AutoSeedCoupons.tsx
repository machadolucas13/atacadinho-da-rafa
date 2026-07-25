"use client";

import { useEffect } from "react";

export default function AutoSeedCoupons() {
  useEffect(() => {
    const alreadyRan = sessionStorage.getItem("coupons-seeded");
    if (alreadyRan) return;

    const timer = setTimeout(async () => {
      try {
        await fetch("/api/cupons/seed", { method: "POST" });
        sessionStorage.setItem("coupons-seeded", "true");
      } catch (e) {
        console.error("Auto-seed cupons falhou", e);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
