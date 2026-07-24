"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sorted = [...items].sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0));

  const itemsPerView = () => {
    if (typeof window === "undefined") return 6;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 4;
    return 6;
  };

  const maxIndex = Math.max(0, sorted.length - itemsPerView());

  const scroll = (direction: "prev" | "next") => {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    setCurrentIndex(Math.max(0, Math.min(newIndex, maxIndex)));
  };

  const visibleItems = sorted.slice(currentIndex, currentIndex + itemsPerView());

  return (
    <section className="relative">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
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
          <button
            onClick={() => scroll("prev")}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 disabled:opacity-30"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-2 transition-all duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView())}%)` }}
            >
              {sorted.map((item) => (
                <Link
                  key={`${item.tipo}-${item.slug || item.id}`}
                  href={item.href}
                  className="group block flex-shrink-0"
                  style={{ width: `${100 / itemsPerView()}%` }}
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
          </div>

          <button
            onClick={() => scroll("next")}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 disabled:opacity-30"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
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
