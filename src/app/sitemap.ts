import { MetadataRoute } from "next";
import { getArtigos } from "@/lib/artigos";
import { getCategorias } from "@/lib/categorias";
import { getPastas } from "@/lib/pastas";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://atacadinhodarafa.com.br";

  const artigos = await getArtigos();
  const categorias = await getCategorias();
  const pastas = await getPastas();

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/artigos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/busca`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-privacidade`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  categorias.forEach((cat) => {
    urls.push({
      url: `${baseUrl}/categorias/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    });
  });

  artigos.forEach((artigo) => {
    urls.push({
      url: `${baseUrl}/artigos/${artigo.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  pastas.forEach((pasta) => {
    urls.push({
      url: `${baseUrl}/pastas/${pasta.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  return urls;
}
