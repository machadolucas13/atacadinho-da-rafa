"use client";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atacadinho da Rafa",
    description: "Achados, ofertas e recomendações de produtos",
    url: "https://atacadinhodarafa.com.br",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://atacadinhodarafa.com.br/busca?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
