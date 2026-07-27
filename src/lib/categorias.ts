import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { Categoria } from "@/types";
import { categorias as categoriasLocais } from "@/data/categorias";

function normalizeCategoria(docId: string, data: any): Categoria {
  return {
    id: data.slug || docId,
    nome: data.nome || docId,
    slug: data.slug || docId,
    descricao: data.descricao || "",
    icone: data.icone || "",
    cor: data.cor || "#f43f5e",
    imagem: data.imagem || "",
    ordem: data.ordem ?? 0,
    ativo: data.ativo ?? true,
  };
}

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const snapshot = await getDocs(collection(db, "categorias"));
    if (snapshot.empty) {
      return categoriasLocais.map((c) => ({
        ...c,
        id: c.slug,
      }));
    }
    return snapshot.docs.map((doc) => normalizeCategoria(doc.id, doc.data()));
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return categoriasLocais.map((c) => ({
      ...c,
      id: c.slug,
    }));
  }
}

export async function getCategoriasUncached(): Promise<Categoria[]> {
  return getCategorias();
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | undefined> {
  try {
    const categorias = await getCategorias();
    return categorias.find((c) => c.slug === slug);
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return undefined;
  }
}

export async function getCategoriaIdBySlug(slug: string): Promise<string | undefined> {
  const categoria = await getCategoriaBySlug(slug);
  return categoria?.id;
}

