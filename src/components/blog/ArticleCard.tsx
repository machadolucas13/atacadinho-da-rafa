"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Artigo } from "@/types";
import TagBadge from "@/components/ui/TagBadge";
import { ViewCountBadge } from "@/components/common/ViewCountBadge";

interface ArticleCardProps {
  artigo: Artigo;
  featured?: boolean;
}

function isRecent(date: Date | string | undefined): boolean {
  if (!date) return false;
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

export default function ArticleCard({ artigo, featured = false }: ArticleCardProps) {
  const [tracked, setTracked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const statusTags = [];
  if (artigo.destaque) statusTags.push({ label: "HOT", variant: "hot" as const });
  if (isRecent(artigo.publicadoEm)) statusTags.push({ label: "NOVO", variant: "new" as const });

  useEffect(() => {
    if (tracked || typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetch("/api/views/increment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slug: artigo.slug }),
            }).catch(() => {});
            setTracked(true);
            observer.disconnect();
          }
        });
      },
      { root: null, threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [artigo.slug, tracked]);
  const statusTags = [];
  if (artigo.destaque) statusTags.push({ label: "HOT", variant: "hot" as const });
  if (isRecent(artigo.publicadoEm)) statusTags.push({ label: "NOVO", variant: "new" as const });

  return (
    <Link href={`/artigos/${artigo.slug}`} className="group block">
      <div
        ref={ref}
        className={`overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover ${
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

           <div className="absolute inset-x-4 bottom-4 flex items-center justify-between opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex items-center gap-2">
              <span className="badge bg-white/90 backdrop-blur-sm text-[#F4A7B9] shadow-sm">
                   Artigo
              </span>
              {statusTags.map((tag) => (
                <TagBadge key={tag.label} label={tag.label} variant={tag.variant} />
              ))}
            </div>
            <ViewCountBadge slug={artigo.slug} />
          </div>
        </div>
        <div className="p-5">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E11D48]">
            Artigo
          </p>
          <h3
            className={`font-semibold text-white line-clamp-2 ${
              featured ? "text-2xl" : "text-lg"
            }`}
          >
            {artigo.titulo}
          </h3>
          <p className="mt-2 text-sm text-gray-300 line-clamp-2 leading-relaxed">
            {artigo.descricao}
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(artigo.publicadoEm).toLocaleDateString("pt-BR")}
              </span>
            </div>
            {artigo.tempoLeitura && (
              <span className="text-xs text-gray-500">
                {artigo.tempoLeitura} min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

