"use client";

import { useEffect } from "react";
import { trackViewCategory, trackPageVisit } from "@/lib/pinterest-events";

interface PinterestProductViewProps {
  productName?: string;
  category?: string;
  value?: number;
}

export default function PinterestProductView({
  productName,
  category,
  value,
}: PinterestProductViewProps) {
  useEffect(() => {
    if (category) {
      trackViewCategory(category);
    }
    if (productName) {
      trackPageVisit(`product: ${productName}`);
    }
    if (value && value > 0) {
      trackCustomEvent("viewproduct", { value, product_name: productName, product_category: category });
    }
  }, [productName, category, value]);

  return null;
}

function trackCustomEvent(eventName: string, properties: Record<string, any>) {
  if (typeof window === "undefined" || !window.pintrk) {
    return;
  }

  try {
    window.pintrk.track(eventName, {
      event_id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      ...properties,
    });
  } catch (error) {
    console.error("Pinterest custom event error:", error);
  }
}
