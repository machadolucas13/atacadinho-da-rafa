"use client";

import { Pin } from "@/data/pins";

interface HomeJsonLdProps {
  locale: string;
  pins: Pin[];
}

export default function HomeJsonLd({ locale, pins }: HomeJsonLdProps) {
  const baseUrl = "https://v0-atacadinhodarafa.vercel.app";
  const url = locale === "en" ? `${baseUrl}/en` : `${baseUrl}/pt`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atacadinho da Rafa",
    description:
      locale === "en"
        ? "Discover the best finds, deals and recommendations."
        : "Descubra os melhores achados, ofertas e recomendações.",
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/busca?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pins.map((pin, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${url}/pins/${pin.slug}`,
      name: pin.titulo,
      image: `${baseUrl}${pin.imagem}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}

