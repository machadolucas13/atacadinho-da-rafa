import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye, Sparkles, ArrowLeft, ArrowRight, Tag, TrendingUp, ShoppingBag } from "lucide-react";
import { Metadata } from "next";
import { getPinBySlug, getPins } from "@/lib/pins";
import ViewCountBadge from "@/components/common/ViewCountBadge";
import PinAffiliateLink from "@/components/pinterest/PinAffiliateLink";
import { getBaseUrl } from "@/lib/base-url";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
  dica?: string;
}

export async function generateStaticParams() {
  const pins = await getPins("pt");
  return pins.map((pin) => ({ slug: pin.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const pin = await getPinBySlug(params.slug, "pt");
  if (!pin) return {};
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/pt/pins/${pin.slug}`;
  const image = pin.imagem ? `${baseUrl}${pin.imagem}` : `${baseUrl}/assets/images/logo_rafa.png`;
  return {
    title: `${pin.titulo} - Atacadinho da Rafa`,
    description: pin.descricao,
    keywords: pin.tags?.join(", ") || "brinquedos, pelúcias, mercado livre, 11.11, descontos, cupons, ofertas, presentes",
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: "Atacadinho da Rafa",
      title: pin.titulo,
      description: pin.descricao,
      images: [{ url: image, width: 1200, height: 630, alt: pin.titulo }],
    },
    twitter: { card: "summary_large_image", title: pin.titulo, description: pin.descricao, images: [image] },
    alternates: { canonical: url },
  };
}

export default async function PinClient({ params }: { params: { slug: string } }) {
  const pin = await getPinBySlug(params.slug, "pt");
  const baseUrl = getBaseUrl();
  const links: ShopeeLink[] = pin?.links || [];
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

  const breadcrumbTitle = pin.titulo.length > 30 ? pin.titulo.slice(0, 28) + '…' : pin.titulo;

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
              <span className="text-gray-500">{breadcrumbTitle}</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src={pin.imagem}
                alt={pin.titulo}
                width={1080}
                height={1920}
                className="w-full max-w-md mx-auto h-auto object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {pin.titulo}
              </h1>
              <ViewCountBadge slug={pin.slug} />
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {pin.descricao}
            </p>
            {pin.dicaUso && (
              <div className="rounded-2xl border border-[#F4A7B9]/30 bg-[#F4A7B9]/10 p-5 mb-6">
                <p className="text-sm font-semibold text-[#F4A7B9] mb-1">💡 Dica de uso</p>
                <p className="text-gray-200 leading-relaxed">{pin.dicaUso}</p>
              </div>
            )}
            {pin.imagemPrincipal && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={pin.imagemPrincipal}
                  alt={links[0]?.nome || "Produto"}
                  className="w-full max-w-sm mx-auto h-auto object-contain"
                />
              </div>
            )}
             {links.length > 0 && (
               <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8">
                 <div className="flex items-center gap-2 mb-5">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E11D48]/10">
                     <ShoppingBag className="h-4 w-4 text-[#E11D48]" />
                   </div>
                   <h2 className="text-lg font-bold text-white">Ofertas selecionadas</h2>
                   <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                     {links.length} {links.length === 1 ? 'oferta' : 'ofertas'}
                   </span>
                 </div>
                 <div className="grid gap-3">
                    {links.map((link, index) => (
                      <div key={link.url} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-[#F4A7B9]/30 hover:bg-white/10 hover:shadow-lg hover:shadow-[#F4A7B9]/5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2.5">
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4A7B9]/10 text-[10px] font-bold text-[#F4A7B9]">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white leading-tight group-hover:text-[#F4A7B9] transition-colors">
                                  {link.nome}
                                </p>
                                <div className="mt-1.5 flex items-center gap-2">
                                  <span className="text-lg font-bold text-[#E11D48]">{link.preco}</span>
<span className="text-[10px] text-gray-500 uppercase tracking-wide">no Mercado Livre</span>
                                </div>
                                {link.dica && (
                                  <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-[#F4A7B9]/5 p-2.5">
                                    <Sparkles className="h-3.5 w-3.5 text-[#F4A7B9] mt-0.5 shrink-0" />
                                    <p className="text-xs text-gray-300 leading-relaxed">{link.dica}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <PinAffiliateLink
                            nome={link.nome}
                            preco={link.preco}
                            url={link.url}
                            className="shrink-0 rounded-xl bg-[#E11D48] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
                          >
                            🛒 Ver oferta
                          </PinAffiliateLink>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             )}

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href={`/pt/categorias/${pin.categoriaId}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                <Tag className="h-4 w-4" />
                {pin.categoriaId.replace(/-/g, ' ')}
              </LocaleAwareLink>
              {links[0] && (
                <PinAffiliateLink
                  nome={links[0].nome}
                  preco={links[0].preco}
                  url={links[0].url}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
                >
                  🛒 Ver ofertas no Mercado Livre
                </PinAffiliateLink>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Compartilhar</h2>
              <div className="flex flex-wrap items-center gap-3">
                <ShareButtons
                  title={pin.titulo}
                  description={pin.descricao}
                  image={pin.imagem}
                  url={`${baseUrl}/pt/pins/${pin.slug}`}
                />
              </div>
            </div>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ImageObject",
                  contentUrl: `${baseUrl}${pin.imagem}`,
                  description: pin.descricao,
                  name: pin.titulo,
                }),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
                    { "@type": "ListItem", position: 2, name: "Pins", item: `${baseUrl}/pt/pins` },
                    { "@type": "ListItem", position: 3, name: pin.titulo, item: `${baseUrl}/pt/pins/${pin.slug}` },
                  ],
                }),
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {links.map((item) => (
                <PinAffiliateLink
                  key={item.url}
                  nome={item.nome}
                  preco={item.preco}
                  url={item.url}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#F4A7B9] hover:bg-white/10"
                >
                  <span className="text-sm font-semibold text-white line-clamp-1">{item.nome}</span>
                  <span className="text-sm font-bold text-[#FFD700] whitespace-nowrap ml-3">{item.preco}</span>
                </PinAffiliateLink>
              ))}
            </div>

            <div className="mt-12 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-[#F4A7B9]" />
                <h3 className="text-lg font-bold text-white">Posts que combinam</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/pt/artigos/como-organizar-festinha-aniversario-sozinha" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Como organizar uma festinha sozinha</h4>
                  <p className="mt-1 text-xs text-gray-400">Guia completo para mães: do orçamento à decoração, sem stress.</p>
                </Link>
                <Link href="/pt/artigos/diy-lembrancinhas-aniversario-faca-voce-mesmo" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">DIY lembrancinhas para aniversário</h4>
                  <p className="mt-1 text-xs text-gray-400">Ideias criativas e baratas para fazer em casa e surpreender.</p>
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
