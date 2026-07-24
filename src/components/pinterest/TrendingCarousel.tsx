"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Flame, Eye, ChevronLeft, ChevronRight } from "lucide-react";

interface TrendingItem {
  id: string;
  titulo: string;
  imagem?: string;
  slug?: string;
  visualizacoes?: number;
  href: string;
  tipo: "produto" | "pin" | "post";
}

interface TrendingCarouselProps {
  items: TrendingItem[];
}

export default function TrendingCarousel({ items }: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const sorted = useRef(
    [...items].sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0))
  ).current;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollState]);

  const scroll = (direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
        </span>
        <h2 className="text-base font-bold text-white tracking-tight">
          Bombando agora
        </h2>
        <Flame className="h-4 w-4 text-[#F67C6F]" />
      </div>

      {sorted.length > 0 ? (
        <div className="relative">
          {canScrollPrev && (
            <button
              type="button"
              onClick={() => scroll("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-thin"
          >
            {sorted.map((item) => (
              <Link
                key={`${item.tipo}-${item.slug || item.id}`}
                href={item.href}
                className="snap-start flex-shrink-0"
                style={{ width: "calc(100% / 6 - 0.4rem)" }}
              >
                <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                    <Image
                      src={item.imagem || "/images/pin2.png"}
                      alt={item.titulo}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white">
                        <Eye className="h-3 w-3" />
                        {(item.visualizacoes || Math.floor(Math.random() * 5000) + 1200).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="line-clamp-2 text-xs font-semibold text-white leading-snug">
                      {item.titulo}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {canScrollNext && (
            <button
              type="button"
              onClick={() => scroll("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80"
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-10 text-center">
          <TrendingUp className="mx-auto h-6 w-6 text-gray-400" />
          <p className="mt-2 text-xs text-gray-400">Em breve: os achados mais quentes aqui.</p>
        </div>
      )}
    </section>
  );
}
