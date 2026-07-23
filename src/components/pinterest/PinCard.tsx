"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Pin } from "@/data/pins";
import SaveButton from "@/components/ui/SaveButton";
import ShareButtons from "@/components/social/ShareButtons";

interface PinCardProps {
  pin: Pin;
  locale: string;
}

export default function PinCard({ pin, locale }: PinCardProps) {
  const href = `/${locale}/pins/${pin.slug}`;

  return (
    <Link href={href} className="group block" aria-label={`${pin.titulo} - ${locale === "en" ? "Pin" : "Pin"}`}>
      <article className="card card-hover">
        <div className="card-image aspect-[9/16]">
          <Image
            src={pin.imagem}
            alt={pin.titulo}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <SaveButton item={{ id: pin.id, tipo: "artigo", titulo: pin.titulo, slug: pin.slug, imagemCapa: pin.imagem }} />
            <ShareButtons
              title={pin.titulo}
              description={pin.descricao}
              image={pin.imagem}
              url={href}
            />
          </div>

          {pin.destaque && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                🔥 {locale === "en" ? "Featured" : "Destaque"}
              </span>
            </div>
          )}
        </div>

        <div className="card-content">
          <h3 className="font-bold text-white line-clamp-2 text-[15px] leading-snug group-hover:text-[#F4A7B9] transition-colors">
            {pin.titulo}
          </h3>
          {pin.descricao && (
            <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {pin.descricao}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
