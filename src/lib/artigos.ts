import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { Artigo } from "@/types";
import { getSlugForLocale } from "./post-slugs";

function getPostsDir(locale: string) {
  if (locale === "en") {
    return path.join(process.cwd(), "src", "data", "posts", "en");
  }
  return path.join(process.cwd(), "src", "data", "posts");
}

function getAllPostFiles(locale: string) {
  const postsDir = getPostsDir(locale);
  try {
    return fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
  } catch {
    return [];
  }
}

function parsePostFile(filename: string, locale: string): Artigo | null {
  const postsDir = getPostsDir(locale);
  const filePath = path.join(postsDir, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const baseSlug = filename.replace(/\.md$/, "");
  const slug = getSlugForLocale(baseSlug, locale);

  return {
    id: slug,
    slug,
    titulo: data.titulo || data.title || slug,
    descricao: data.descricao || data.description || "",
    imagemCapa: data.imagemCapa || `/posts/${baseSlug}.png`,
    imagens: data.imagens || [],
    categoriaId: data.categoriaId || "",
    categoria: data.categoria || ({ id: "", nome: "", slug: "", icone: "" } as any),
    destaque: data.destaque || data.featured || false,
    visualizacoes: data.visualizacoes || 0,
    cliques: 0,
    conversoes: 0,
    ativo: true,
    tempoLeitura: data.tempoLeitura || data.readTime || Math.max(3, Math.round(content.split(" ").length / 200)),
    publicadoEm: data.publicadoEm || data.date || new Date().toISOString(),
    tags: data.tags || [],
    conteudo: marked(content) as any as string,
    autor: data.autor || "Atacadinho da Rafa",
    locale,
  };
}

export async function getArtigos(locale: string = "pt"): Promise< Artigo[]> {
  const files = getAllPostFiles(locale);
  return files.map((file) => parsePostFile(file, locale)).filter((a): a is Artigo => a !== null);
}

export async function getArtigoBySlug(slug: string, locale: string = "pt"): Promise<Artigo | undefined> {
  const artigos = await getArtigos(locale);
  return artigos.find((a) => a.slug === slug);
}
