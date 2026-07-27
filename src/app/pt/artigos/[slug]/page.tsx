"use server";

import { getArtigoBySlug, getArtigos } from "@/server/artigos";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import { sanitizeHtml } from "@/lib/sanitize";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye, ArrowLeft, ArrowRight } from "lucide-react";
import { getItemViews } from "@/lib/views";
import ViewCountBadge from "@/components/common/ViewCountBadge";
import ProductCard from "@/components/pinterest/ProductCard";
import { getProdutos } from "@/lib/produtos";

export async function generateStaticParams() {
  return [
    { slug: "melhores-calcas-jeans-masculino-guia-2026" },
    { slug: "melhores-calcas-jeans-feminino-guia-2026" },
    { slug: "como-ganhar-dinheiro-como-afiliado-guia-2026" },
    { slug: "como-montar-guarda-roupa-capsula-gastando-poco-2026" },
    { slug: "tendencias-moda-primavera-verao-2026" },
    { slug: "maquiagem-para-iniciantes-guia-passo-a-passo" },
    { slug: "como-organizar-apartamento-pequeno-com-pouco-dinheiro" },
    { slug: "decoracao-sustentavel-20-ideias-ate-100-reais" },
    { slug: "rotina-skincare-pele-oleosa-produtos-funcionam" },
    { slug: "como-escolher-perfume-guia-completo" },
    { slug: "como-economizar-supermercado-dicas" },
    { slug: "melhores-apps-financas-pessoais-2026" },
    { slug: "como-criar-conteudo-instagram-seguidores" },
    { slug: "guia-marketing-afiliados-iniciantes-2026" },
    { slug: "como-fazer-mudanca-gastando-pouco" },
    { slug: "rotina-treino-feminino-perder-peso-dicas-2026" },
    { slug: "gadgets-para-quarto-2026" },
    { slug: "organizar-quarto-tecnologia-guia" },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artigo = await getArtigoBySlug(params.slug, "pt");
  if (!artigo) return {};
  const baseUrl = "https://atacadinhodarafa.vercel.app";
  const url = `${baseUrl}/pt/artigos/${artigo.slug}`;
  const image = artigo.imagemCapa ? `${baseUrl}${artigo.imagemCapa}` : `${baseUrl}/assets/images/og-default.jpg`;
  return {
    title: `${artigo.titulo} - Atacadinho da Rafa`,
    description: artigo.descricao,
    keywords: [...(artigo.tags || []), "artigo", "dicas", "achados", "Atacadinho da Rafa"],
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: "Atacadinho da Rafa",
      title: artigo.titulo,
      description: artigo.descricao,
      images: [{ url: image, width: 1200, height: 630, alt: artigo.titulo }],
    },
    twitter: { card: "summary_large_image", title: artigo.titulo, description: artigo.descricao, images: [image] },
    alternates: { canonical: url },
  };
}

export default async function ArtigoPage({
  params,
}: {
  params: { slug: string };
}) {
  const artigo = await getArtigoBySlug(params.slug, "pt");
  if (!artigo || !artigo.ativo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400">Artigo não encontrado</p>
        </div>
      </div>
    );
  }

  const allArtigos = await getArtigos("pt");
  const sorted = allArtigos
    .filter((a) => a.ativo)
    .sort((a, b) => getItemViews(b.slug) - getItemViews(a.slug));
  const currentIndex = sorted.findIndex((a) => a.slug === params.slug);
  const prevArtigo = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextArtigo = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  const produtosRelacionados = await getProdutos();
  const relacionadosFiltrados = produtosRelacionados
    .filter((p) => p.ativo && p.categoriaId === artigo.categoria?.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/artigos" className="hover:text-[#F4A7B9] transition-colors">
                Artigos
              </LocaleAwareLink>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">{artigo.slug}</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src={artigo.imagemCapa}
                alt={artigo.titulo}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
              <span>{new Date(artigo.publicadoEm).toLocaleDateString("pt-BR")}</span>
              <span>•</span>
              <span>{artigo.tempoLeitura} min de leitura</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {artigo.titulo}
              </h1>
              <ViewCountBadge slug={artigo.slug} />
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {artigo.descricao}
            </p>

            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(artigo.conteudo) }}
            />

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Compartilhar</h2>
              <ShareButtons
                title={artigo.titulo}
                description={artigo.descricao}
                image={artigo.imagemCapa || ""}
                url={`https://atacadinhodarafa.vercel.app/pt/artigos/${artigo.slug}`}
              />
            </div>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: artigo.titulo,
                  description: artigo.descricao,
                  image: artigo.imagemCapa ? `https://atacadinhodarafa.vercel.app${artigo.imagemCapa}` : undefined,
                  datePublished: artigo.publicadoEm,
                  author: {
                    "@type": "Organization",
                    name: "Atacadinho da Rafa",
                  },
                  publisher: {
                    "@type": "Organization",
                    name: "Atacadinho da Rafa",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://atacadinhodarafa.vercel.app/assets/images/logo_rafa.png",
                    },
                  },
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
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://atacadinhodarafa.vercel.app/" },
                    { "@type": "ListItem", position: 2, name: "Artigos", item: "https://atacadinhodarafa.vercel.app/pt/artigos" },
                    { "@type": "ListItem", position: 3, name: artigo.titulo, item: `https://atacadinhodarafa.vercel.app/pt/artigos/${artigo.slug}` },
                  ],
                }),
              }}
            />

            {relacionadosFiltrados.length > 0 && (
              <section className="mx-auto max-w-3xl py-12">
                <h2 className="mb-6 text-2xl font-bold text-white tracking-tight">Produtos relacionados</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {relacionadosFiltrados.map((produto) => (
                    <ProductCard key={produto.id} produto={produto} />
                  ))}
                </div>
              </section>
            )}

            <div className="flex items-center justify-between gap-4 mb-12">
              {prevArtigo && (
                <LocaleAwareLink href={`/pt/artigos/${prevArtigo.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
                  <ArrowLeft className="h-4 w-4" />
                  {prevArtigo.titulo}
                </LocaleAwareLink>
              )}
              {nextArtigo && (
                <LocaleAwareLink href={`/pt/artigos/${nextArtigo.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
                  {nextArtigo.titulo}
                  <ArrowRight className="h-4 w-4" />
                </LocaleAwareLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
