"use client";

import { Artigo } from "@/types";

export function ArticleJsonLd({ artigo }: { artigo: Artigo }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.descricao,
    image: artigo.imagemCapa || "https://atacadinhodarafa.com.br/images/og-default.jpg",
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
        url: "https://atacadinhodarafa.com.br/images/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
