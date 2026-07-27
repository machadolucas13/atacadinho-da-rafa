"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { Pin } from "@/data/pins";
import SaveButton from "@/components/ui/SaveButton";
import TagBadge from "@/components/ui/TagBadge";
import { getItemViews } from "@/lib/views";

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
  const visualizacoes = getItemViews(pin.slug);
  const localeForNumber = locale === "en" ? "en-US" : "pt-BR";

  const statusTags = [];
  if (pin.destaque) statusTags.push({ label: "HOT", variant: "hot" as const });
  if (isRecent(pin.publicadoEm)) statusTags.push({ label: "NOVO", variant: "new" as const });

  return (
    <article
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

          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {statusTags.map((tag) => (
              <TagBadge key={tag.label} label={tag.label} variant={tag.variant} />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 hidden items-center justify-center gap-2 bg-black/60 p-3 opacity-0 transition-all duration-300 group-hover:flex group-hover:opacity-100 md:flex md:opacity-0 md:group-hover:opacity-100">
             <SaveButton item={{ id: pin.id, tipo: "artigo", titulo: pin.titulo, slug: pin.slug, imagemCapa: pin.imagem }} />
          </div>

          <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:opacity-100 md:group-hover:opacity-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
              <Eye className="h-3 w-3" />
              {visualizacoes.toLocaleString(localeForNumber)}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3">
          <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-[#F4A7B9]">
            {pin.titulo}
          </h3>
          {pin.descricao && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-400">{pin.descricao}</p>
          )}
        </div>
      </div>
    </article>
  );
}

