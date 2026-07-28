"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    pintrk?: {
      queue: any[];
      load: (tagId: string, options?: any) => void;
      page: () => void;
      track: (event: string, properties?: any) => void;
    };
  }
}

export type PinterestEvent =
  | "checkout"
  | "addtocart"
  | "pagevisit"
  | "signup"
  | "watchvideo"
  | "lead"
  | "search"
  | "viewcategory"
  | string;

export interface PinterestEventProperties {
  event_id?: string;
  value?: number;
  order_quantity?: number;
  currency?: string;
  property?: string;
  lead_type?: string;
  video_title?: string;
  search_query?: string;
  product_category?: string;
  [key: string]: any;
}

export function trackPinterestEvent(
  event: PinterestEvent,
  properties: PinterestEventProperties = {}
) {
  if (typeof window === "undefined" || !window.pintrk) {
    return;
  }

  try {
    window.pintrk.track(event, properties);
  } catch (error) {
    console.error("Pinterest tracking error:", error);
  }
}

export function trackPageVisit(pageName?: string) {
  trackPinterestEvent("pagevisit", {
    event_id: generateEventId(),
    property: pageName || window.location.pathname,
  });
}

export function trackCheckout(value: number, currency = "BRL", orderQuantity = 1) {
  trackPinterestEvent("checkout", {
    event_id: generateEventId(),
    value,
    order_quantity: orderQuantity,
    currency,
  });
}

export function trackAddToCart(value: number, currency = "BRL", orderQuantity = 1) {
  trackPinterestEvent("addtocart", {
    event_id: generateEventId(),
    value,
    order_quantity: orderQuantity,
    currency,
  });
}

export function trackSearch(query: string) {
  trackPinterestEvent("search", {
    event_id: generateEventId(),
    search_query: query,
  });
}

export function trackSignup(leadType = "newsletter") {
  trackPinterestEvent("signup", {
    event_id: generateEventId(),
    lead_type: leadType,
  });
}

export function trackLead(leadType = "contact") {
  trackPinterestEvent("lead", {
    event_id: generateEventId(),
    lead_type: leadType,
  });
}

export function trackViewCategory(category: string) {
  trackPinterestEvent("viewcategory", {
    event_id: generateEventId(),
    product_category: category,
  });
}

export function trackCustomEvent(eventName: string, properties: PinterestEventProperties = {}) {
  trackPinterestEvent(eventName, {
    event_id: generateEventId(),
    ...properties,
  });
}

export function trackAffiliateClick(productName: string, marketplace: string, value?: number) {
  trackCustomEvent("click", {
    product_name: productName,
    product_category: marketplace,
    value,
    destination: marketplace,
  });
}

function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
