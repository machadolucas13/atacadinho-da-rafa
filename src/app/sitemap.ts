import { MetadataRoute } from "next";
import { getArtigos } from "@/lib/artigos";
import { getCategorias } from "@/lib/categorias";
import { getPastas } from "@/lib/pastas";
import { getPins } from "@/lib/pins";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://v0-atacadinhodarafa.vercel.app";

  const [artigosPt, artigosEn, categorias, pastas, pinsPt] = await Promise.all([
    getArtigos("pt"),
    getArtigos("en"),
    getCategorias(),
    getPastas(),
    getPins("pt"),
  ]);

  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/pt`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/pt/artigos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/pt/busca`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/pt/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/pt/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/pt/politica-privacidade`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/termos-de-uso`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/pt/pinterest`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: `${baseUrl}/pt/pins`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
    { url: `${baseUrl}/pt/produtos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/en/articles`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/en/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${baseUrl}/en/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/en/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/en/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/en/terms-of-use`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/en/pinterest`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: `${baseUrl}/en/pins`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
    { url: `${baseUrl}/en/produtos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
  ];

  categorias.forEach((cat) => {
    urls.push({
      url: `${baseUrl}/pt/categorias/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    });
  });

  artigosPt.forEach((artigo) => {
    urls.push({
      url: `${baseUrl}/pt/artigos/${artigo.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  artigosEn.forEach((artigo) => {
    urls.push({
      url: `${baseUrl}/en/articles/${artigo.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  pinsPt.forEach((pin) => {
    urls.push({
      url: `${baseUrl}/pt/pins/${pin.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    });
  });

  pastas.forEach((pasta) => {
    urls.push({
      url: `${baseUrl}/pt/pastas/${pasta.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  return urls;
}

