import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye, Sparkles, ArrowLeft, ArrowRight, Tag, TrendingUp } from "lucide-react";
import { getPinBySlug, getPins } from "@/lib/pins";
import { getItemViews } from "@/lib/views";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
}

export default async function PinClient({ params }: { params: { slug: string } }) {
  const pin = await getPinBySlug(params.slug, "pt");
  const links: ShopeeLink[] = pin?.links || [];
  const shareUrl = pin?.slug ? `/pt/pins/${pin.slug}` : "/pt/pins";
  const visualizacoes = getItemViews(pin?.slug || params.slug);
  const allPins = await getPins("pt");
  const currentIndex = allPins.findIndex((p) => p.slug === params.slug);
  const prevPin = currentIndex > 0 ? allPins[currentIndex - 1] : null;
  const nextPin = currentIndex < allPins.length - 1 ? allPins[currentIndex + 1] : null;

  if (!pin) {
    return (
      <div className="relative min-h-screen">
        <div className="relative z-10 pt-28 pb-12">
          <div className="relative mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-white">Pin não encontrado</h1>
              <p className="mt-3 text-gray-400">Este pin não existe ou foi removido.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 pt-20 md:pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/pins" className="hover:text-[#F4A7B9] transition-colors">
                Pins
              </LocaleAwareLink>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">Calças Jeans Femininas</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src="/posts/calcas-jeans-femininas-economicas-2026.png"
                alt="Calças Jeans Femininas a partir de R$ 24,90"
                width={1080}
                height={1920}
                className="w-full max-w-md mx-auto h-auto object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Calças Jeans Femininas a partir de R$ 24,90
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                <Eye className="h-3 w-3" />
                {visualizacoes.toLocaleString("pt-BR")}
              </span>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Selecionamos 20 modelos de calças jeans femininas que realmente fazem diferença no dia a dia. 
              Tem opções para todo estilo: do casual ao sofisticado, com preços que cabem no bolso e qualidade 
              que você vai sentir no primeiro uso. Aqui você encontra desde brechós até lançamentos da Shopee.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href="/pt/categorias/moda-feminina"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                👗 Moda Feminina
              </LocaleAwareLink>
              <a
                href={links[0]?.url || "https://s.shopee.com.br/4qEG7HYQVJ"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
              >
                🛒 Ver ofertas na Shopee
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Compartilhar</h2>
              <ShareButtons
                title="Calças Jeans Femininas a partir de R$ 24,90"
                description="20 modelos que empinam o bumbum: wide leg, flare, cargo, skinny e mais."
                image="/posts/calcas-jeans-femininas-economicas-2026.png"
                url={shareUrl}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {links.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#F4A7B9] hover:bg-white/10"
                >
                  <span className="text-sm font-semibold text-white line-clamp-1">{item.nome}</span>
                  <span className="text-sm font-bold text-[#FFD700] whitespace-nowrap ml-3">{item.preco}</span>
                </a>
              ))}
            </div>

            <div className="mt-12 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-[#F4A7B9]" />
                <h3 className="text-lg font-bold text-white">Posts que combinam</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/pt/artigos/melhores-calcas-jeans-feminino-guia-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Guia de calças jeans femininas 2026</h4>
                  <p className="mt-1 text-xs text-gray-400">Descubra os cortes que estão em alta e como escolher o modelo ideal para seu corpo.</p>
                </Link>
                <Link href="/pt/artigos/como-montar-guarda-roupa-capsula-gastando-poco-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Guarda-roupa cápsula econômico</h4>
                  <p className="mt-1 text-xs text-gray-400">Monte um closet completo gastando pouco, com peças-chave que não saem de moda.</p>
                </Link>
                <Link href="/pt/artigos/tendencias-moda-primavera-verao-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Tendências primavera/verão 2026</h4>
                  <p className="mt-1 text-xs text-gray-400">As cores, cortes e tecidos que vão dominar a estação mais quente do ano.</p>
                </Link>
                <Link href="/pt/artigos/rotina-treino-feminino-perder-peso-dicas-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Treino feminino para emagrecer</h4>
                  <p className="mt-1 text-xs text-gray-400">Dicas de exercícios, alimentação e motivação para chegar ao shape dos sonhos.</p>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-8">
              {prevPin ? (
                <LocaleAwareLink href={`/pt/pins/${prevPin.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
                  <ArrowLeft className="h-4 w-4" />
                  {prevPin.titulo}
                </LocaleAwareLink>
              ) : (
                <div />
              )}
              {nextPin ? (
                <LocaleAwareLink href={`/pt/pins/${nextPin.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
                  {nextPin.titulo}
                  <ArrowRight className="h-4 w-4" />
                </LocaleAwareLink>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}