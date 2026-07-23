"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Share2 } from "lucide-react";
import { Pin } from "@/data/pins";

interface PinCardProps {
  pin: Pin;
  locale: string;
}

export default function PinCard({ pin, locale }: PinCardProps) {
  const href = `/${locale}/pins/${pin.slug}`;

  const fallbackImage = "/images/artigos/default.jpg";

  return (
    <Link href={href} className="group block" aria-label={pin.titulo}>
      <div className="card card-hover flex h-full flex-col">
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-black/20">
          <Image
            src={pin.imagem}
            alt={pin.titulo}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImage) target.src = fallbackImage;
            }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute left-2 top-2">
            <span className="inline-flex items-center rounded-full bg-[#E11D48]/90 px-2 py-1 text-[10px] font-bold text-white shadow-lg">
              🔥 {locale === "en" ? "Featured" : "Destaque"}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Bookmark className="h-4 w-4 text-white" />
            <Share2 className="h-4 w-4 text-white" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3">
          <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-[#F4A7B9]">
            {pin.titulo}
          </h3>
          {pin.descricao && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-400">
              {pin.descricao}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
