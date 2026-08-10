"use client";

import { trackAffiliateClick } from "@/lib/pinterest-events";

function parsePrice(value: string) {
  const parsed = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default function PinAffiliateLink({
  nome,
  preco,
  url,
  className,
  children,
}: {
  nome: string;
  preco: string;
  url: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAffiliateClick(nome, "Shopee", parsePrice(preco))}
      className={className}
    >
      {children}
    </a>
  );
}
