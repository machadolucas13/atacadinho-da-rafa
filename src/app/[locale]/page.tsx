import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {produtos.filter((p) => p.destaque || p.viral).slice(0, 4).map((produto) => (
              <Link
                key={produto.id}
                href={`/produtos/${produto.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                    <Image
                      src={produto.imagemPrincipal}
                      alt={produto.nome}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#E11D48]">
                      {produto.loja}
                    </p>
                    <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                      {produto.nome}
                    </h3>
                    <span className="mt-1.5 block text-base font-bold text-[#E11D48]">
                      R$ {produto.preco?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
