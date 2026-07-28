"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, ShoppingBag } from "lucide-react";
import { getItemViews } from "@/lib/views";
import { Produto } from "@/types";
import AffiliateLink from "@/components/seo/AffiliateLink";

interface ProductCarouselSectionProps {
  produtos: Produto[];
  viewAllHref: string;
  locale?: string;
}

function MarketplaceBadge({ loja }: { loja: string }) {
  const lower = loja.toLowerCase();
  if (lower.includes("shopee")) {
    return (
      <span className="inline-flex items-center rounded-lg bg-[#ee4d2d] px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        Shopee
      </span>
    );
  }
  if (lower.includes("amazon")) {
    return (
      <span className="inline-flex items-center rounded-lg bg-[#232f3e] px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        Amazon
      </span>
    );
  }
  if (lower.includes("mercado livre") || lower.includes("mercadolivre")) {
    return (
      <span className="inline-flex items-center rounded-lg bg-[#fff159] px-2 py-1 text-[10px] font-bold text-gray-900 shadow-lg">
        Mercado Livre
      </span>
    );
  }
  if (lower.includes("shein")) {
    return (
      <span className="inline-flex items-center rounded-lg bg-[#000] px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        SHEIN
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-gray-900 shadow-lg">
      {loja}
    </span>
  );
}

export default function ProductCarouselSection({
  produtos,
  viewAllHref,
  locale = "pt",
}: ProductCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  const discount = (precoOriginal?: number, preco?: number) => {
    if (!precoOriginal || !preco) return 0;
    return Math.round(((precoOriginal - preco) / precoOriginal) * 100);
  };

  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Produtos
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        <div className="relative">
          {produtos.length > 0 ? (
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
                className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-4 sm:px-8 md:px-12"
              >
                {produtos.map((produto) => {
                  const disc = discount(produto.precoOriginal, produto.preco);
                  return (
                    <AffiliateLink
                      key={produto.id}
                      href={produto.linkAfiliado}
                      productName={produto.nome}
                      marketplace={produto.loja}
                      value={produto.preco}
                      className="snap-start flex-shrink-0 group block w-[60vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] xl:w-[18vw] min-w-[180px]"
                    >
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                        <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                          <Image
                            src={produto.imagemPrincipal}
                            alt={produto.nome}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                          <div className="absolute left-3 top-3">
                            <MarketplaceBadge loja={produto.loja} />
                          </div>
                          {disc > 0 && (
                            <div className="absolute right-3 top-3">
                              <span className="inline-flex items-center rounded-full bg-[#F43F5E] px-2 py-1 text-[11px] font-bold text-white shadow-lg">
                                -{disc}%
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/50 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all group-hover:bg-[#E11D48] group-hover:border-[#E11D48]">
                              Ver Oferta <ShoppingBag className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="line-clamp-2 text-sm font-semibold text-white leading-snug">
                            {produto.nome}
                          </h3>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-base font-bold text-[#F4A7B9]">
                              R$ {produto.preco?.toFixed(2)}
                            </span>
                            {produto.precoOriginal && produto.precoOriginal > (produto.preco || 0) && (
                              <span className="text-xs text-gray-500 line-through font-medium">
                                R$ {produto.precoOriginal.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AffiliateLink>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-10 text-center">
              <p className="mt-2 text-xs text-gray-400">Em breve: ofertas selecionadas aqui.</p>
            </div>
          )}

          {produtos.length > 0 && (
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

