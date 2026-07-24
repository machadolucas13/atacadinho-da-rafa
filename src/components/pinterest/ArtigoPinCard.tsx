"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Eye } from "lucide-react";
import { Artigo } from "@/types";
import SaveButton from "@/components/ui/SaveButton";

interface ArtigoPinCardProps {
  artigo: Artigo;
  locale?: string;
}

export default function ArtigoPinCard({ artigo, locale = artigo.locale }: ArtigoPinCardProps) {
  const href = locale === "en"
    ? `/en/articles/${artigo.slug}`
    : `/pt/artigos/${artigo.slug}`;

  const visualizacoes = artigo.visualizacoes || Math.floor(Math.random() * 6000) + 800;

  return (
    <Link href={href} className="group block" aria-label={`${artigo.titulo} - ${locale === "en" ? "Article" : "Artigo"}`}>
      <article className="card card-hover">
        <div className="card-image aspect-video">
          <Image
            src={artigo.imagemCapa || "/images/artigos/default.jpg"}
            alt={artigo.titulo}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-x-3 bottom-3 hidden items-center justify-between translate-y-3 transition-all duration-300 group-hover:flex group-hover:translate-y-0 md:flex md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
             <SaveButton item={{ id: artigo.slug, tipo: "artigo", titulo: artigo.titulo, slug: artigo.slug, imagemCapa: artigo.imagemCapa || "" }} />
          </div>

          {artigo.destaque && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F4A261] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                <Star className="h-3 w-3" />
                {locale === "en" ? "Featured" : "Destaque"}
              </span>
            </div>
          )}

          <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:opacity-100 md:group-hover:opacity-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
              <Eye className="h-3 w-3" />
              {visualizacoes.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="card-content">
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F4A7B9] border border-[#E11D48]/20">
              {artigo.categoria?.nome || (locale === "en" ? "Article" : "Artigo")}
            </span>
            {artigo.tempoLeitura && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {artigo.tempoLeitura} {locale === "en" ? "min read" : "min de leitura"}
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
                {artigo.autor?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{artigo.autor || "Atacadinho da Rafa"}</p>
                <p className="text-[10px] text-gray-500">
                  {new Date(artigo.publicadoEm).toLocaleDateString(locale === "en" ? "en-US" : "pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <SaveButton item={{ id: artigo.slug, tipo: "artigo", titulo: artigo.titulo, slug: artigo.slug, imagemCapa: artigo.imagemCapa || "" }} />
          </div>
        </div>
      </article>
    </Link>
  );
}
