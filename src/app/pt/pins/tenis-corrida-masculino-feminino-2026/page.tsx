import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye, Sparkles, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { getPinBySlug, getPins } from "@/lib/pins";
import { getItemViews } from "@/lib/views";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
}

export default async function PinClient({ params }: { params: { slug: string } }) {
  const pin = await getPinBySlug(params.slug, "pt");
  const visualizacoes = getItemViews(pin?.slug || params.slug);
  const links: ShopeeLink[] = [
    { nome: "Tênis New Balance 530 Feminino Original Casual Retrô Conforto Academia Caminhada Dia a Dia Leve", preco: "591,40", url: "https://s.shopee.com.br/3qLjBG86H9" },
    { nome: "Tênis Feminino New Balance 530 Esportivo Casual Respirável Solado Robusto Confortável Original", preco: "572,91", url: "https://s.shopee.com.br/9KgfjTaZXr" },
    { nome: "Tênis Fila Recovery Feminino Bege Leve Macio Caminhada Academia Casual", preco: "287,96", url: "https://s.shopee.com.br/2qTBzji6XE" },
    { nome: "Tênis Fila Progress Lite Feminino Bege Caminhada Original Mulher Confortável Macio Corrida", preco: "306", url: "https://s.shopee.com.br/7KvbM3lce0" },
    { nome: "Tenis Fila Runner 2K Feminino Lifestyle Casual Confortavel", preco: "368,90", url: "https://s.shopee.com.br/30mcCAubGI" },
    { nome: "Tênis Adidas Supernova Comfortglide Feminino Corrida", preco: "619", url: "https://s.shopee.com.br/8fQywf3JEO" },
    { nome: "Tênis New Balance Feminino Fresh Foam X 1080v14", preco: "736", url: "https://s.shopee.com.br/30mcCHSKuu" },
    { nome: "Tênis New Balance Fuelcell Rebel V5 Feminino - Rosa Neo/Rosa", preco: "894", url: "https://s.shopee.com.br/50Xga2wIew" },
    { nome: "Tênis Mizuno Wave Creation 26 Feminino Original com Nota Fiscal e Garantia", preco: "511,71", url: "https://s.shopee.com.br/9Kgfk4a3y9" },
    { nome: "Tênis Olympikus Swift 5 Feminino Cinza e Rosa", preco: "315", url: "https://s.shopee.com.br/1qaeoLRWiJ" },
    { nome: "Tenis Fila Maxxi Lite Feminino Caminhada Corrida Treinos Academia Confortável e Macio", preco: "277", url: "https://s.shopee.com.br/190d12lth" },
    { nome: "Tênis Adidas Latin Run 3.0 Feminino", preco: "374", url: "https://s.shopee.com.br/1qaeoQK91n" },
    { nome: "Tênis Feminino de Academia para Musculação Treino Funcional Caminhada Corrida e Uso Diário", preco: "49", url: "https://s.shopee.com.br/2BDVD8Z0sq" },
    { nome: "Tênis Feminino Esportivo Axion Estiloso Moderno Treino Academia Corrida Caminhada", preco: "69,99", url: "https://s.shopee.com.br/9zwMXZza4G" },
    { nome: "Tênis Feminino Esportivo Academia Caminhada Leve Confortável Dia a Dia Treino", preco: "106", url: "https://s.shopee.com.br/3g2Izz0TrF" },
  ];
  const shareUrl = `/pt/pins/${params.slug}`;
  const allPins = await getPins("pt");
  const safeAllPins = Array.isArray(allPins) ? allPins : [];
  const currentIndex = safeAllPins.findIndex((p) => p.slug === params.slug);
  const prevPin = currentIndex > 0 ? safeAllPins[currentIndex - 1] : null;
  const nextPin = currentIndex < safeAllPins.length - 1 ? safeAllPins[currentIndex + 1] : null;

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
              <span className="text-gray-500">Tênis de Corrida</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src="/images/pin2.png"
                alt="Tênis de Corrida Masculino e Feminino"
                width={800}
                height={450}
                className="w-full max-w-2xl mx-auto h-auto object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                <Eye className="h-3 w-3" />
                {visualizacoes.toLocaleString("pt-BR")}
              </span>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Selecionamos tênis de corrida masculinos e femininos que unem conforto, performance e estilo. 
              Tem opção para iniciantes e para quem já treina há anos. Clique e confira os preços na Shopee!
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href="/pt/artigos/rotina-treino-feminino-perder-peso-dicas-2026"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                💪 Dicas de treino para mulheres
              </LocaleAwareLink>
              <LocaleAwareLink
                href="/pt/categorias/calcados"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                👟 Calçados
              </LocaleAwareLink>
              <a
                href={links[0]?.url || "https://s.shopee.com.br/3qLjBG86H9"}
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
                title="Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo"
                description="Selecionamos tênis de corrida masculinos e femininos que combinam conforto, performance e estilo."
                image="/images/pin2.png"
                url={shareUrl}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-5 w-5 text-[#F4A7B9]" />
                <h2 className="text-lg font-bold text-white">Ofertas selecionadas</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {links.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#F4A7B9] hover:bg-white/10"
                  >
                    <span className="text-sm font-semibold text-white line-clamp-1">{item.nome}</span>
                    <span className="text-sm font-bold text-[#FFD700] whitespace-nowrap ml-3">R$ {item.preco}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-[#F4A7B9]" />
                <h3 className="text-lg font-bold text-white">Posts que combinam</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/pt/artigos/rotina-treino-feminino-perder-peso-dicas-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Treino feminino para perder peso</h4>
                  <p className="mt-1 text-xs text-gray-400">Dicas de exercícios, alimentação e motivação para chegar ao shape dos sonhos.</p>
                </Link>
                <Link href="/pt/artigos/melhores-calcas-jeans-feminino-guia-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Guia de calças jeans femininas 2026</h4>
                  <p className="mt-1 text-xs text-gray-400">Os cortes e modelos que vão bombar este ano, do wide leg ao flare.</p>
                </Link>
                <Link href="/pt/categorias/calcados" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Os melhores tênis de corrida 2026</h4>
                  <p className="mt-1 text-xs text-gray-400">Comparativo completo dos modelos mais confortáveis e com melhor custo-benefício.</p>
                </Link>
                <Link href="/pt/artigos/como-economizar-supermercado-dicas" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Economize e corra mais</h4>
                  <p className="mt-1 text-xs text-gray-400">Dicas práticas para equilibrar orçamento e qualidade nos seus treinos.</p>
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
