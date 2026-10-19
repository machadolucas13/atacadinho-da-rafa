"use client";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atacadinho da Rafa",
    description: "Achados, ofertas e recomendações de produtos",
    url: "https://v0-atacadinhodarafa.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://v0-atacadinhodarafa.vercel.app/busca?q={search_term_string}",
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

