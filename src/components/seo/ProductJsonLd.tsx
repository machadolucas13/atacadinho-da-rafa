"use client";

import { Produto } from "@/types";

export function ProductJsonLd({ produto }: { produto: Produto }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    description: produto.descricaoCurta || produto.descricao,
    image: produto.imagemPrincipal,
    offers: {
      "@type": "Offer",
      price: produto.preco,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: produto.linkAfiliado,
    },
    aggregateRating: produto.avaliacao
      ? {
          "@type": "AggregateRating",
          ratingValue: produto.avaliacao,
          reviewCount: produto.numAvaliacoes,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

