"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getItemViews } from "@/lib/views";

interface CarouselItem {
  id: string;
  href: string;
  imagem: string;
  titulo: string;
  badge?: React.ReactNode;
  meta?: React.ReactNode;
}

interface CarouselSectionProps {
  title: string;
  items: CarouselItem[];
  viewAllHref: string;
  locale?: string;
}

export default function CarouselSection({
  title,
  items,
  viewAllHref,
  locale = "pt",
}: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [pauseAuto, setPauseAuto] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const tolerance = 8;
    setCanScrollPrev(el.scrollLeft > tolerance);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
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

  useEffect(() => {
    if (items.length <= 1 || pauseAuto) return;
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.getBoundingClientRect().width || el.clientWidth / 4;
    const gap = 16;
    const amount = cardWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;
    let current = el.scrollLeft;
    const interval = setInterval(() => {
      current += amount;
      if (current >= maxScroll) current = 0;
      el.scrollTo({ left: current, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length, pauseAuto]);

  const scroll = useCallback((direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.getBoundingClientRect().width || el.clientWidth / 4;
    const gap = 16;
    const amount = cardWidth + gap;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

         <div className="relative" onMouseEnter={() => setPauseAuto(true)} onMouseLeave={() => setPauseAuto(false)}>
          {items.length > 0 ? (
            <>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scroll("prev")}
                  disabled={!canScrollPrev}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-25 border border-white/10 shadow-lg"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("next")}
                  disabled={!canScrollNext}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-25 border border-white/10 shadow-lg"
                  aria-label="Próximo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                </div>

               <div
                 ref={scrollRef}
                 className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-4 sm:px-8 md:px-12 scrollbar-thin"
               >
                 {items.map((item) => (
                   <Link
                     key={item.id}
                     href={item.href}
                     className="snap-start flex-shrink-0 group block w-[60vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] xl:w-[18vw] min-w-[180px]"
                   >
                     <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                       <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                         <Image
                           src={item.imagem}
                           alt={item.titulo}
                           fill
                           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                           className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                         />
                         {item.badge && (
                           <div className="absolute left-3 top-3">
                             {item.badge}
                           </div>
                         )}
                         <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white">
                             <Eye className="h-3 w-3" />
                             {getItemViews(item.id).toLocaleString(locale === "en" ? "en-US" : "pt-BR")}
                           </span>
                         </div>
                       </div>
                       <div className="p-3">
                         <h3 className="line-clamp-2 text-sm font-semibold text-white leading-snug">
                           {item.titulo}
                         </h3>
                         {item.meta && (
                           <div className="mt-2">{item.meta}</div>
                         )}
                       </div>
                     </div>
                   </Link>
                 ))}
               </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-10 text-center">
              <p className="mt-2 text-xs text-gray-400">Em breve: mais itens aqui.</p>
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-5 text-center">
              <Link
                href={viewAllHref}
                className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold"
              >
                Ver Mais
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
