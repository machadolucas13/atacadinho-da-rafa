"use client";

import { usePathname } from "next/navigation";
import { Sparkles, TrendingUp } from "lucide-react";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export default function HeroSection() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] === "en" ? "en" : "pt";
  const isPt = locale === "pt";

  return (
    <section className="relative overflow-hidden pt-28 pb-6 md:pt-32 md:pb-10">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4A7B9] shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {isPt ? "Curadoria de achados especiais" : "Curated special finds"}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            {isPt ? "Achados que você" : "Finds you'll"}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#E11D48] via-[#F67C6F] to-[#F4A261] bg-clip-text text-transparent">
                {isPt ? "vai amar" : "love"}
              </span>
            </span>
          </h1>

          <p className="mt-4 text-base text-gray-300 md:text-lg leading-relaxed max-w-xl mx-auto">
            {isPt
              ? "Moda, decoração, cozinha e tecnologia: separamos os melhores produtos para você descobrir e comprar com segurança."
              : "Fashion, decor, kitchen and tech: we pick the best products for you to discover and buy safely."}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <LocaleAwareLink href="#categorias" className="btn-primary">
              <TrendingUp className="h-4 w-4" />
              {isPt ? "Explorar achados" : "Explore finds"}
            </LocaleAwareLink>
            <LocaleAwareLink href="/artigos" className="btn-ghost">
              {isPt ? "Ler artigos" : "Articles"}
            </LocaleAwareLink>
          </div>
        </div>
      </div>
    </section>
  );
}

