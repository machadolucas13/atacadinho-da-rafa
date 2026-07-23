export const revalidate = 60;

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/pinterest/ProductCard";
import ShareButtons from "@/components/social/ShareButtons";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import { getArtigos } from "@/lib/artigos";
import { getProdutos } from "@/lib/produtos";
import { sanitizeHtml } from "@/lib/sanitize";

interface ArtigoPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArtigoPageProps): Promise<Metadata> {
  const artigos = await getArtigos();
  const artigo = artigos.find((a) => a.slug === params.slug);
  if (!artigo) return {};

  return {
    title: `${artigo.titulo} - Atacadinho da Rafa`,
    description: artigo.descricao,
    keywords: [...(artigo.tags || []), "artigo", "dicas", "achados", "Atacadinho da Rafa"],
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: `https://atacadinhodarafa.com.br/artigos/${params.slug}`,
      siteName: "Atacadinho da Rafa",
      title: artigo.titulo,
      description: artigo.descricao,
      images: [
        {
          url: artigo.imagemCapa || "https://atacadinhodarafa.com.br/assets/images/og-default.jpg",
          width: 1200,
          height: 630,
          alt: artigo.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: artigo.titulo,
      description: artigo.descricao,
      images: [artigo.imagemCapa || "https://atacadinhodarafa.com.br/assets/images/og-default.jpg"],
    },
    alternates: {
      canonical: `https://atacadinhodarafa.com.br/artigos/${params.slug}`,
    },
  };
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const artigos = await getArtigos();
  const artigo = artigos.find((a) => a.slug === params.slug);

  if (!artigo) {
    return <div>Artigo não encontrado</div>;
  }

  const produtos = await getProdutos();
  const relacionados = produtos.slice(0, 4);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://atacadinhodarafa.com.br/" },
      { "@type": "ListItem", position: 2, name: "Artigos", item: "https://atacadinhodarafa.com.br/artigos" },
      { "@type": "ListItem", position: 3, name: artigo.titulo, item: `https://atacadinhodarafa.com.br/artigos/${params.slug}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.descricao,
    image: artigo.imagemCapa || "https://atacadinhodarafa.com.br/assets/images/og-default.jpg",
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
        url: "https://atacadinhodarafa.com.br/assets/images/logo.png",
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Onde encontro os melhores achados?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No Atacadinho da Rafa você encontra curadoria especial de moda, decoração, tecnologia e muito mais.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="relative">
        <div className="mx-auto max-w-4xl px-4 pt-28 pb-8">
          <LocaleAwareLink
            href="/artigos"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-[#F4A7B9] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para o blog
          </LocaleAwareLink>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="badge bg-[#E11D48]/10 text-[#F4A7B9] border border-[#E11D48]/20">
                ✨ Artigo
              </span>
              <span className="badge bg-white/5 border border-white/10 text-gray-300">
                <Clock className="h-3 w-3 mr-1" />
                {artigo.tempoLeitura || "5"} min de leitura
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {artigo.titulo}
            </h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              {artigo.descricao}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {new Date(artigo.publicadoEm).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {artigo.imagemCapa && (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl shadow-card">
              <Image
                src={artigo.imagemCapa}
                alt={artigo.titulo}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-card">
            <div
              className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-plus-jakarta-sans)] prose-a:text-[#F4A7B9] prose-p:text-gray-300 prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(artigo.conteudo) }}
            />
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center gap-3">
            <span className="badge bg-white/5 border border-white/10 text-gray-300 shadow-sm cursor-pointer hover:border-[#F4A7B9] transition-colors">
              <Heart className="h-3 w-3" /> Curtir
            </span>
            <ShareButtons
              title={artigo.titulo}
              description={artigo.descricao}
              image={artigo.imagemCapa || ""}
              url={`/artigos/${params.slug}`}
            />
          </div>

          {relacionados.length > 0 && (
            <section className="mx-auto max-w-4xl py-12">
              <h2 className="mb-6 text-2xl font-bold text-white tracking-tight">
                Você também vai gostar
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {relacionados.map((produto) => (
                  <ProductCard key={produto.id} produto={produto} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
