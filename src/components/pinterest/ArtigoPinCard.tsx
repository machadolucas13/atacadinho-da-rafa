"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Artigo } from "@/types";
import SaveButton from "@/components/ui/SaveButton";
import TagBadge from "@/components/ui/TagBadge";

interface ArtigoPinCardProps {
  artigo: Artigo;
  locale?: string;
}

const tagVariant: Record<string, "hot" | "fire" | "new" | "vip" | "sale"> = {
  HOT: "hot",
  NOVO: "new",
  DESTAQUE: "hot",
  TENDA: "fire",
};

function isRecent(date: Date | string | undefined): boolean {
  if (!date) return false;
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

export default function ArtigoPinCard({ artigo, locale = artigo.locale }: ArtigoPinCardProps) {
  const router = useRouter();
  const [tracked, setTracked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const href = locale === "en"
    ? `/en/articles/${artigo.slug}`
    : `/pt/artigos/${artigo.slug}`;

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

  return (
    <article
      ref={ref}
      onClick={() => router.push(href)}
      className="group block cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(href);
      }}
    >
      <div className="card card-hover">
        <div className="card-image aspect-[3/4]">
          <Image
            src={artigo.imagemCapa || "/images/artigos/default.jpg"}
            alt={artigo.titulo}
            fill
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {statusTags.map((tag) => (
              <TagBadge key={tag.label} label={tag.label} variant={tag.variant} />
            ))}
          </div>

          <div className="absolute inset-x-3 bottom-3 hidden items-center justify-between translate-y-3 transition-all duration-300 group-hover:flex group-hover:translate-y-0 md:flex md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
             <SaveButton item={{ id: artigo.slug, tipo: "artigo", titulo: artigo.titulo, slug: artigo.slug, imagemCapa: artigo.imagemCapa || "" }} />
          </div>

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

          <div className="mt-4">
            <SaveButton item={{ id: artigo.slug, tipo: "artigo", titulo: artigo.titulo, slug: artigo.slug, imagemCapa: artigo.imagemCapa || "" }} />
          </div>
        </div>
      </div>
    </article>
  );
}

