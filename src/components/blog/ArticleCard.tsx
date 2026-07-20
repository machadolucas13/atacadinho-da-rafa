"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { Artigo } from "@/types";

interface ArticleCardProps {
  artigo: Artigo;
  featured?: boolean;
}

export default function ArticleCard({ artigo, featured = false }: ArticleCardProps) {
  return (
    <Link href={`/artigos/${artigo.slug}`} className="group block">
      <div
        className={`overflow-hidden rounded-xl bg-white transition-shadow hover:shadow-lg ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-video" : "aspect-[16/9]"
          }`}
        >
          <Image
            src={artigo.imagemCapa || "/images/artigos/default.jpg"}
            alt={artigo.titulo}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3
            className={`font-semibold text-gray-900 line-clamp-2 ${
              featured ? "text-xl" : "text-lg"
            }`}
          >
            {artigo.titulo}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {artigo.descricao}
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(artigo.publicadoEm).toLocaleDateString("pt-BR")}
              </span>
            </div>
            {artigo.tempoLeitura && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{artigo.tempoLeitura} min de leitura</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
