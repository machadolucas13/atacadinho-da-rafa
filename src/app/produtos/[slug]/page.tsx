export const revalidate = 60;

import { Metadata } from "next";
import ProdutoPage from "@/components/produto/ProdutoPage";
import { getProdutos } from "@/lib/produtos";

interface ProdutoDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const produtos = await getProdutos();
  return produtos.map((produto) => ({
    slug: produto.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProdutoDetailPageProps): Promise<Metadata> {
  const produtos = await getProdutos();
  const produto = produtos.find((p) => p.slug === params.slug);
  if (!produto) return {};

  const baseUrl = "https://atacadinhodarafa.com.br";
  const url = `${baseUrl}/produtos/${produto.slug}`;
  const image = produto.imagemPrincipal ? `${baseUrl}${produto.imagemPrincipal}` : `${baseUrl}/assets/images/og-default.jpg`;

  return {
    title: `${produto.nome} - Atacadinho da Rafa`,
    description: produto.descricaoCurta || produto.descricao || `Confira ${produto.nome} na nossa curadoria.`,
    keywords: [produto.nome.toLowerCase(), produto.loja.toLowerCase(), "produto", "oferta", "Atacadinho da Rafa", ...(produto.tags || [])],
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: "Atacadinho da Rafa",
      title: `${produto.nome} - Atacadinho da Rafa`,
      description: produto.descricaoCurta || produto.descricao || `Confira ${produto.nome} na nossa curadoria.`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: produto.nome,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${produto.nome} - Atacadinho da Rafa`,
      description: produto.descricaoCurta || produto.descricao || `Confira ${produto.nome} na nossa curadoria.`,
      images: [image],
    },
    alternates: { canonical: url },
  };
}

export default async function ProdutoDetailPage({ params }: ProdutoDetailPageProps) {
  const produtos = await getProdutos();
  const produto = produtos.find((p) => p.slug === params.slug);
  const relacionados = produtos
    .filter((p) => p.categoriaId === produto?.categoriaId && p.id !== produto?.id)
    .slice(0, 5);

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://atacadinhodarafa.com.br/" },
      { "@type": "ListItem", position: 2, name: produto.categoria?.nome || "Produtos", item: `https://atacadinhodarafa.com.br/categorias/${produto.categoria?.slug || ""}` },
      { "@type": "ListItem", position: 3, name: produto.nome, item: `https://atacadinhodarafa.com.br/produtos/${params.slug}` },
    ],
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    description: produto.descricaoCurta || produto.descricao,
    image: produto.imagemPrincipal,
    brand: {
      "@type": "Brand",
      name: produto.loja,
    },
    offers: {
      "@type": "Offer",
      price: produto.preco,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: produto.linkAfiliado,
      ...(produto.precoOriginal && produto.precoOriginal > produto.preco
        ? {
            priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          }
        : {}),
    },
    ...(produto.avaliacao
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: produto.avaliacao,
            reviewCount: produto.numAvaliacoes,
          },
        }
      : {}),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Onde comprar ${produto.nome}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Você pode comprar ${produto.nome} na ${produto.loja} através do nosso link de oferta.`,
        },
      },
      {
        "@type": "Question",
        name: "O preço está atualizado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Os preços podem variar. Clique em 'Ver Oferta' para conferir o valor atualizado na loja parceira.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <ProdutoPage produto={produto} relacionados={relacionados} />
    </>
  );
}
