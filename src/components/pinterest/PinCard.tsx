"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Heart, Share2, ShoppingBag, Sparkles, Tag, TrendingUp, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Pin } from "@/data/pins";
import SaveButton from "@/components/ui/SaveButton";
import TagBadge from "@/components/ui/TagBadge";
import ViewCountBadge from "@/components/common/ViewCountBadge";
import AffiliateLink from "@/components/seo/AffiliateLink";

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
  const [tracked, setTracked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const statusTags = [];
  if (pin.destaque) statusTags.push({ label: "🔥 HOT", variant: "hot" as const });
  if (isRecent(pin.publicadoEm)) statusTags.push({ label: "✨ NOVO", variant: "new" as const });
  if (pin.tags) {
    pin.tags.forEach((tag) => {
      if (tag !== "Destaque" && tag !== "Tendência" && tag !== "Novo") {
        statusTags.push({ label: tag.toUpperCase(), variant: "default" as const });
      }
    });
  }

  const minPrice = pin.links?.length ? pin.links[0].preco : null;
  const productCount = pin.links?.length || 0;

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

  return (
    <article
      ref={ref}
      onClick={() => router.push(href)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block cursor-pointer h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-500 hover:shadow-card-hover hover:border-[#F4A7B9]/30 hover:-translate-y-2">
        {/* Image Section */}
        <div className="card-image relative aspect-[3/4] w-full overflow-hidden bg-black">
          <Image
            src={pin.imagem}
            alt={pin.titulo}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

          {/* Status Tags */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {statusTags.slice(0, 3).map((tag) => (
              <TagBadge key={tag.label} label={tag.label} variant={tag.variant} />
            ))}
          </div>

          {/* Top Right Icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
            >
              <Heart className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
            >
              <Share2 className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute inset-x-0 bottom-0 p-4 transform transition-transform duration-500 group-hover:translate-y-0">
            {/* Product Count & Price */}
            <div className="mb-2 flex items-center gap-2">
              {minPrice && (
                <div className="inline-flex items-center gap-1 rounded-full bg-[#E11D48] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <ShoppingBag className="h-3 w-3" />
                  {minPrice}
                </div>
              )}
              {productCount > 0 && (
                <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Tag className="h-3 w-3" />
                  {productCount} ofertas
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between">
              <div className="flex-1" />
              <SaveButton
                item={{
                  id: pin.id,
                  tipo: "artigo",
                  titulo: pin.titulo,
                  slug: pin.slug,
                  imagemCapa: pin.imagem,
                }}
                className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4">
          {/* Category */}
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
            <TrendingUp className="h-3 w-3" />
            <span className="capitalize">{pin.categoriaId.replace(/-/g, " ")}</span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-base font-bold text-white leading-tight mb-2 group-hover:text-[#F4A7B9] transition-colors">
            {pin.titulo}
          </h3>

          {/* Description */}
          {pin.descricao && (
            <p className="line-clamp-2 text-xs text-gray-400 leading-relaxed mb-3">
              {pin.descricao}
            </p>
          )}

          {/* Usage Tip */}
          {pin.dicaUso && (
            <div className="mb-3 rounded-xl border border-[#F4A7B9]/20 bg-[#F4A7B9]/5 p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-[#F4A7B9] mt-0.5 shrink-0" />
                <p className="line-clamp-2 text-xs text-[#F4A7B9] leading-relaxed">
                  {pin.dicaUso}
                </p>
              </div>
            </div>
          )}

          {/* Product Image Preview */}
          {pin.imagemPrincipal && (
            <div className="mb-3 relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img
                src={pin.imagemPrincipal}
                alt={pin.links?.[0]?.nome || "Produto"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-white backdrop-blur-sm">
                <ShoppingBag className="h-3 w-3" />
                Produto em destaque
              </div>
            </div>
          )}

          {/* Links Preview */}
          {pin.links && pin.links.length > 0 && (
            <div className="mt-auto space-y-2">
              {pin.links.slice(0, 2).map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-2.5 transition-all hover:border-[#F4A7B9]/20 hover:bg-white/10"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{link.nome}</p>
                    <p className="text-xs text-[#F4A7B9] font-bold">{link.preco}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                </div>
              ))}
              {pin.links.length > 2 && (
                <div className="text-center pt-1">
                  <span className="text-xs text-gray-400">
                    +{pin.links.length - 2} mais ofertas
                  </span>
                </div>
              )}
            </div>
          )}

          {/* View Count */}
          <div className="mt-3 flex items-center justify-between">
            <ViewCountBadge slug={pin.slug} locale={locale} />
          </div>
        </div>
      </div>
    </article>
  );
}
