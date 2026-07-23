import { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import ProductGrid from "@/components/pinterest/ProductGrid";
import CategorySection from "@/components/pinterest/CategorySection";
import TrendingSection from "@/components/pinterest/TrendingSection";
import { getProdutos } from "@/lib/produtos";
import { getArtigos } from "@/lib/artigos";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export const metadata: Metadata = {
  title: {
    default: "Atacadinho da Rafa - Descobertas, Achados e Ofertas",
    template: "%s | Atacadinho da Rafa",
  },
  description:
    "Descubra os melhores achados, ofertas e recomendações de produtos. Curadoria visual de moda, decoração, tecnologia e beleza para você economizar e descobrir produtos incríveis.",
  keywords: [
    "achados",
    "ofertas",
    "descobertas",
    "produtos",
    "moda feminina",
    "decoracao",
    "tecnologia",
    "cozinha",
    "beleza",
    "acessorios",
    "shopee",
    "brechó",
    "economia",
  ],
};

export default async function HomePage({ params }: { params: { locale: string } }) {
  const [produtos, artigos] = await Promise.all([
    getProdutos(),
    getArtigos(params.locale),
  ]);

  const ultimosPosts = artigos.slice(0, 6);
  const isPt = params.locale === "pt";

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="relative">
        <CategorySection />

        <ProductGrid
          produtos={produtos}
          titulo="✨ Achados em destaque"
          subtitle={isPt ? "Os melhores produtos selecionados para você" : "The best curated products for you"}
        />

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E11D48]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#F4A7B9] border border-[#E11D48]/20">
                  📌 Pin em destaque
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Calças Jeans Femininas a partir de R$ 24,90
                </h2>
                <p className="mt-2 text-gray-300 text-sm md:text-base">
                  20 modelos que empinam o bumbum: wide leg, flare, cargo, skinny e mais.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <LocaleAwareLink
                    href={`/${params.locale}/pins/calcaspromocaocalcas-jeans-femininas-economicas-2026`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
                  >
                    Ver pin
                  </LocaleAwareLink>
                  <LocaleAwareLink
                    href={`/${params.locale}/categorias/moda-feminina`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
                  >
                    👗 Moda Feminina
                  </LocaleAwareLink>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
                <img
                  src="/posts/calcas-jeans-femininas-economicas-2026.png"
                  alt="Calças Jeans Femininas a partir de R$ 24,90"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="inspiracao" className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {isPt ? "✨ Inspiração" : "✨ Inspiration"}
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                {isPt ? "Dicas, ideias e inspirações em imagens" : "Tips, ideas and visual inspiration"}
              </p>
            </div>
            <LocaleAwareLink
              href="/artigos"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
            >
              {isPt ? "Ver todos →" : "See all →"}
            </LocaleAwareLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ultimosPosts.map((artigo) => (
              <ArtigoPinCard key={artigo.id} artigo={artigo} locale={params.locale} />
            ))}
          </div>
        </div>

        <TrendingSection />

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#E11D48]/10 via-[#F4A7B9]/5 to-transparent p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isPt ? "Não perca nenhum achado" : "Don't miss any find"}
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {isPt
                ? "Receba semanalmente os melhores produtos, dicas e ofertas diretamente no seu e-mail."
                : "Get weekly best products, tips and deals straight to your email."}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={isPt ? "Seu melhor e-mail" : "Your best email"}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:border-[#F4A7B9] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F4A7B9]/30"
              />
              <button
                type="submit"
                className="rounded-2xl bg-[#E11D48] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
              >
                {isPt ? "Quero receber" : "Subscribe"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
