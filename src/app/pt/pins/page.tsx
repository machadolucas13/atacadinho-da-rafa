import { Metadata } from "next";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export const metadata: Metadata = {
  title: "Pins - Atacadinho da Rafa",
  description: "Pins de moda, beleza, decoração e achados com direto para as melhores ofertas.",
};

export default async function PinsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "en" ? "en" : "pt";
  const isPt = locale === "pt";

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4A7B9]">
              📌 {isPt ? "Pins" : "Pins"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {isPt ? "Pins de achados" : "Deal pins"}
            </h1>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              {isPt
                ? "Clique e confira direto na Shopee os melhores achados selecionados."
                : "Click and check the best curated finds directly on Shopee."}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href={`/${locale}/pins/calcaspromocaocalcas-jeans-femininas-economicas-2026`}
            className="group block"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover">
              <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
                <img
                  src="/posts/calcas-jeans-femininas-economicas-2026.png"
                  alt="Calças Jeans Femininas a partir de R$ 24,90"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                    🔥 Destaque
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white line-clamp-2">
                    Calças Jeans Femininas a partir de R$ 24,90
                  </h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    20 modelos que empinam o bumbum: wide leg, flare, cargo, skinny e mais.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href={`/${locale}/pins/tenis-corrida-masculino-feminino-2026`}
            className="group block"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover">
              <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
                <img
                  src="/images/pin2.png"
                  alt="Tênis de Corrida Masculino e Feminino"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                    🔥 Destaque
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white line-clamp-2">
                    Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo
                  </h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    Selecionamos tênis de corrida masculinos e femininos que combinam conforto, Performance e estilo. Tem opções para iniciantes e também para quem já corre há anos.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
