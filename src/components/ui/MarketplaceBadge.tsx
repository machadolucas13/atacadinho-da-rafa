"use client";

import Image from "next/image";

const MARKETPLACE_LOGOS: Record<string, string> = {
  shopee: "/assets/images/shopeelogo.png",
  amazon: "/assets/images/amazonlogo.png",
  mercadolivre: "/assets/images/mlogo.png",
  shein: "/assets/images/sheinlogo.webp",
  generic: "/assets/images/logo_rafa.png",
  outro: "/assets/images/logo_rafa.png",
};

export default function MarketplaceBadge({ marketplace }: { marketplace?: string }) {
  if (!marketplace) return null;
  const src = MARKETPLACE_LOGOS[marketplace.toLowerCase()] || "/assets/images/logo_rafa.png";
  return (
    <div className="absolute right-2 top-2 z-20 h-7 w-7 overflow-hidden rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
      <Image src={src} alt={marketplace} width={28} height={28} className="h-full w-full object-contain p-0.5" />
    </div>
  );
}
