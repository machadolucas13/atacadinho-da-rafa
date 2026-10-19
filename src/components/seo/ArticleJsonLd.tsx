"use client";

import { Artigo } from "@/types";

export function ArticleJsonLd({ artigo }: { artigo: Artigo }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.descricao,
    image: artigo.imagemCapa || "/assets/images/logo_rafa.png",
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
                      url: "/assets/images/logo_rafa.png",
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

