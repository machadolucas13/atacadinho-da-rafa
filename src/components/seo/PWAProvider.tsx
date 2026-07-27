"use client";

import { useEffect } from "react";
import InstallPrompt from "@/components/pwa/InstallPrompt";

export default function PWAProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const swUrl = "/sw.js";
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(swUrl, { scope: "/" })
        .then((reg) => {
          console.log("SW registered:", reg.scope);
        })
        .catch((err) => {
          console.error("SW registration failed:", err);
        });
    }
  }, []);

  return <InstallPrompt />;
}

