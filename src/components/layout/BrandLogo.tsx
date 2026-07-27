"use client";

import Image from "next/image";
import React from "react";

interface BrandLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

const LOGO_PATH = "/assets/images/logo_rafa.png";

export default function BrandLogo({ size = 36, showText = true, className = "" }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Image
          src={LOGO_PATH}
          alt="Atacadinho da Rafa"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-[18px] font-bold leading-tight tracking-tight text-white">
            Atacadinho da Rafa
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-[#F4A7B9]">
            achados especiais
          </span>
        </div>
      )}
    </div>
  );
}

