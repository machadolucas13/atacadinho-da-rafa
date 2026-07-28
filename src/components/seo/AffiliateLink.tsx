"use client";

import { trackAffiliateClick } from "@/lib/pinterest-events";

interface AffiliateLinkProps {
  href: string;
  productName: string;
  marketplace: string;
  value?: number;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function AffiliateLink({
  href,
  productName,
  marketplace,
  value,
  children,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}: AffiliateLinkProps) {
  const handleClick = () => {
    trackAffiliateClick(productName, marketplace, value);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
