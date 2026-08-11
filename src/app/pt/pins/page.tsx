import { Metadata } from "next";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import TrendingSection from "@/components/pinterest/TrendingSection";
import PinCard from "@/components/pinterest/PinCard";
import { getPins } from "@/lib/pins";

export const metadata: Metadata = {
  title: "Pins - Atacadinho da Rafa",
  description: "Pins de moda, beleza, decoração e achados com direto para as melhores ofertas.",
};

export default async function PinsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "en" ? "en" : "pt";
  const isPt = locale === "pt";
  const pins = await getPins(locale);

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4A7B9]">
              📌 {isPt ? "Pins" : "Pins"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {isPt ? "Pins" : "Deal Pins"}
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
        {pins.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-10 text-center">
            <p className="mt-2 text-xs text-gray-400">{isPt ? "Em breve: mais pins aqui." : "Coming soon: more pins here."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
            {pins.map((pin) => (
              <PinCard key={pin.id} pin={pin} locale={locale} />
            ))}
          </div>
        )}
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <TrendingSection />
        </div>
      </section>
    </div>
  );
}

