"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Pin } from "@/data/pins";
import SaveButton from "@/components/ui/SaveButton";
import TagBadge from "@/components/ui/TagBadge";
import ViewCountBadge from "@/components/common/ViewCountBadge";

interface PinCardProps {
  pin: Pin;
  locale: string;
}

function isRecent(date: string | undefined): boolean {
  if (!date) return false;
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

export default function PinCard({ pin, locale }: PinCardProps) {
  const router = useRouter();
  const href = `/${locale}/pins/${pin.slug}`;
  const localeForNumber = locale === "en" ? "en-US" : "pt-BR";
  const [tracked, setTracked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const statusTags = [];

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
              body: JSON.stringify({ slug: pin.slug }),
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
  }, [pin.slug, tracked]);
  if (pin.destaque) statusTags.push({ label: "HOT", variant: "hot" as const });
  if (isRecent(pin.publicadoEm)) statusTags.push({ label: "NOVO", variant: "new" as const });

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
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
         <div className="card-image relative aspect-[9/16] w-full">
           <Image
             src={pin.imagem}
             alt={pin.titulo}
             fill
             sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
             className="object-cover transition-transform duration-500 group-hover:scale-105"
           />
           {pin.imagemPrincipal && (
             <div className="absolute bottom-2 left-2 right-2 h-16 overflow-hidden rounded-lg border border-white/20 bg-black/40">
               <img
                 src={pin.imagemPrincipal}
                 alt={pin.links?.[0]?.nome || "Produto"}
                 className="h-full w-full object-cover"
                 loading="lazy"
               />
             </div>
           )}

          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {statusTags.map((tag) => (
              <TagBadge key={tag.label} label={tag.label} variant={tag.variant} />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 hidden items-center justify-center gap-2 bg-black/60 p-3 opacity-0 transition-all duration-300 group-hover:flex group-hover:opacity-100 md:flex md:opacity-0 md:group-hover:opacity-100">
             <SaveButton item={{ id: pin.id, tipo: "artigo", titulo: pin.titulo, slug: pin.slug, imagemCapa: pin.imagem }} />
          </div>

          <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:opacity-100 md:group-hover:opacity-100">
            <ViewCountBadge slug={pin.slug} locale={locale} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3">
          <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-[#F4A7B9]">
            {pin.titulo}
          </h3>
          {pin.descricao && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-400">{pin.descricao}</p>
          )}
          {pin.dicaUso && (
            <p className="mt-2 line-clamp-2 text-xs text-[#F4A7B9]">{pin.dicaUso}</p>
          )}
          {pin.links && pin.links.length > 0 && (
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-300">
              <span className="font-semibold">A partir de</span>
              <span className="text-[#F4A7B9] font-bold">{pin.links[0].preco}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

