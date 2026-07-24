"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ChevronLeft, Trash2, ExternalLink } from "lucide-react";

type Item = {
  id: string;
  tipo: "artigo" | "produto";
  titulo: string;
  imagemCapa?: string;
  slug: string;
  adicionadoEm: number;
};

export default function FavoritosClient() {
  const [favoritos, setFavoritos] = useState<Item[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("favoritos");
      const data: Item[] = stored ? JSON.parse(stored) : [];
      setFavoritos(data);
    } catch {
      setFavoritos([]);
    }
  }, []);

  const remover = (id: string, tipo: string, slug: string) => {
    const novo = favoritos.filter((f) => !(f.id === id && f.tipo === tipo && f.slug === slug));
    localStorage.setItem("favoritos", JSON.stringify(novo));
    setFavoritos(novo);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-[#F4A7B9] transition-colors">
        <ChevronLeft className="h-4 w-4" />
        Voltar para home
      </Link>

      <div className="mt-8 text-center">
        <Bookmark className="mx-auto h-12 w-12 text-[#F4A7B9]" />
        <h1 className="mt-4 text-3xl font-bold text-white">Meus favoritos</h1>
        <p className="mt-2 text-gray-400">Clique em &quot;Salvar&quot; nos posts e produtos para adicionar aqui.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!mounted ? (
          <p className="col-span-full text-center text-gray-400">Carregando...</p>
        ) : favoritos.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">Nenhum favorito salvo ainda.</p>
        ) : (
          favoritos.map((item) => (
            <div key={`${item.tipo}-${item.slug}-${item.id}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft flex gap-4">
              {item.imagemCapa && (
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                  <img src={item.imagemCapa} alt={item.titulo} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{item.titulo}</p>
                <p className="mt-1 text-[10px] text-gray-500 uppercase tracking-wider">{item.tipo}</p>
                <p className="mt-1 text-[10px] text-gray-500">{new Date(item.adicionadoEm).toLocaleDateString("pt-BR")}</p>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <Link href={`/${item.tipo === 'artigo' ? 'artigos' : 'produtos'}/${item.slug}`} className="text-xs text-[#F4A7B9] hover:underline inline-flex items-center gap-1">
                    Abrir <ExternalLink className="h-3 w-3" />
                  </Link>
                  <button onClick={() => remover(item.id, item.tipo, item.slug)} className="text-xs text-red-400 hover:text-red-300 inline-flex items-center gap-1">
                    <Trash2 className="h-3 w-3" /> Remover
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
