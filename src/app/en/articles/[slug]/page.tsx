"use server";

import { getArtigoBySlug, getArtigos } from "@/server/artigos";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import { sanitizeHtml } from "@/lib/sanitize";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye, ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return [
    { slug: "best-mens-jeans-guide-cuts-styles-2026" },
    { slug: "best-womens-jeans-guide-cuts-styles-2026" },
    { slug: "best-womens-jeans-under-50-deals-2026" },
    { slug: "how-to-make-money-as-affiliate-guide-2026" },
    { slug: "how-to-build-capsule-wardrobe-budget-2026" },
    { slug: "fashion-trends-spring-summer-2026" },
    { slug: "makeup-for-beginners-step-by-step-guide" },
    { slug: "how-to-organize-small-apartment-budget" },
    { slug: "sustainable-decor-20-ideas-under-100" },
    { slug: "skincare-routine-oily-skin-products-work" },
    { slug: "how-to-choose-perfume-complete-guide" },
    { slug: "how-to-save-at-grocery-store-tips" },
    { slug: "best-personal-finance-apps-2026" },
    { slug: "how-to-create-instagram-content-followers" },
    { slug: "affiliate-marketing-guide-beginners-2026" },
    { slug: "how-to-move-on-a-budget" },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artigo = await getArtigoBySlug(params.slug, "en");
  if (!artigo) return {};
  return {
    title: artigo.titulo,
    description: artigo.descricao,
  };
}

export default async function ArtigoPage({
  params,
}: {
  params: { slug: string };
}) {
  const artigo = await getArtigoBySlug(params.slug, "en");
  if (!artigo || !artigo.ativo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400">Article not found</p>
        </div>
      </div>
    );
  }

  const allArtigos = await getArtigos("en");
  const sorted = allArtigos
    .filter((a) => a.ativo)
    .sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0));
  const currentIndex = sorted.findIndex((a) => a.slug === params.slug);
  const prevArtigo = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextArtigo = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/articles" className="hover:text-[#F4A7B9] transition-colors">
                Articles
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
              <span>{new Date(artigo.publicadoEm).toLocaleDateString("en-US")}</span>
              <span>•</span>
              <span>{artigo.tempoLeitura} min read</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {artigo.titulo}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                <Eye className="h-3 w-3" />
                {(artigo.visualizacoes || Math.floor(Math.random() * 6000) + 800).toLocaleString("pt-BR")}
              </span>
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {artigo.descricao}
            </p>

            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(artigo.conteudo) }}
            />

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-sm font-semibold text-white mb-2">Share this article</p>
              <div className="flex justify-center">
                <ShareButtons
                  title={artigo.titulo}
                  description={artigo.descricao}
                  image={artigo.imagemCapa || ""}
                  url={`/en/articles/${artigo.slug}`}
                />
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-sm font-semibold text-white mb-2">Want to see prices and models on Shopee?</p>
              <LocaleAwareLink
                href="/articles/best-womens-jeans-under-50-deals-2026"
                className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
              >
                View deals on Shopee
              </LocaleAwareLink>
            </div>

            <div className="flex items-center justify-between gap-4 mb-12">
              {prevArtigo && (
                <LocaleAwareLink href={`/en/articles/${prevArtigo.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
                  <ArrowLeft className="h-4 w-4" />
                  {prevArtigo.titulo}
                </LocaleAwareLink>
              )}
              {nextArtigo && (
                <LocaleAwareLink href={`/en/articles/${nextArtigo.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
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