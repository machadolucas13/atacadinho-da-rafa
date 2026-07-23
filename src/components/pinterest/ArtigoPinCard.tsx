"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Bookmark, Share2, Clock, Star } from "lucide-react";
import { Artigo } from "@/types";
import ShareButtons from "@/components/social/ShareButtons";
import SaveButton from "@/components/ui/SaveButton";

interface ArtigoPinCardProps {
  artigo: Artigo;
  locale?: string;
}

export default function ArtigoPinCard({ artigo, locale = artigo.locale }: ArtigoPinCardProps) {
  const href = locale === "en"
    ? `/en/articles/${artigo.slug}`
    : `/pt/artigos/${artigo.slug}`;

  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover">
        <div className="relative aspect-video overflow-hidden bg-black/20">
          <Image
            src={artigo.imagemCapa || "/images/artigos/default.jpg"}
            alt={artigo.titulo}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            priority={artigo.destaque}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <SaveButton item={{ id: artigo.slug, tipo: "artigo", titulo: artigo.titulo, slug: artigo.slug, imagemCapa: artigo.imagemCapa || "" }} />
            <ShareButtons
              title={artigo.titulo}
              description={artigo.descricao}
              image={artigo.imagemCapa || ""}
              url={href}
            />
          </div>

          {artigo.destaque && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F4A261] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                <Star className="h-3 w-3" />
                {locale === "en" ? "Featured" : "Destaque"}
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F4A7B9] border border-[#E11D48]/20">
              <Star className="h-3 w-3" />
              {locale === "en" ? "Article" : "Artigo"}
            </span>
            {artigo.tempoLeitura && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {artigo.tempoLeitura} {locale === "en" ? "min" : "min"}
              </span>
            )}
          </div>

          <h3 className="font-bold text-white line-clamp-2 text-lg leading-snug group-hover:text-[#F4A7B9] transition-colors">
            {artigo.titulo}
          </h3>

          {artigo.descricao && (
            <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {artigo.descricao}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#E11D48] to-[#F4A7B9] text-xs font-bold text-white">
                AR
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Atacadinho da Rafa</p>
                <p className="text-[10px] text-gray-500">
                  {new Date(artigo.publicadoEm).toLocaleDateString(locale === "en" ? "en-US" : "pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Heart className="h-3.5 w-3.5" />
              <span>{locale === "en" ? "Save" : "Salvar"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
