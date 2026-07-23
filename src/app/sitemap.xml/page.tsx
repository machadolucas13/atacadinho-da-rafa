import { Metadata } from "next";
import { allArtigos } from "content-collections";

export const metadata: Metadata = {
  title: "Sitemap - Atacadinho da Rafa",
  description: "Sitemap do site Atacadinho da Rafa",
};

export default function Sitemap() {
  const baseUrl = "https://atacadinhodarafa.vercel.app";
  const articles = allArtigos.map((artigo) => ({
    url: `${baseUrl}/pt/artigos/${artigo.slug}`,
    lastModified: artigo.publicadoEm || new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const pins = [
    { url: `${baseUrl}/pt/pins/calcaspromocaocalcas-jeans-femininas-economicas-2026`, lastModified: new Date().toISOString(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/pt/pins/tenis-corrida-masculino-feminino-2026`, lastModified: new Date().toISOString(), changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  const urls = [
    { url: baseUrl, lastModified: new Date().toISOString(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/pt/artigos`, lastModified: new Date().toISOString(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/pt/pins`, lastModified: new Date().toISOString(), changeFrequency: "daily" as const, priority: 0.9 },
    ...articles,
    ...pins,
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Sitemap</h1>
      <pre className="text-xs overflow-auto">
        {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastModified}</lastmod>
    <changefreq>${u.changeFrequency}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`}
      </pre>
    </div>
  );
}
