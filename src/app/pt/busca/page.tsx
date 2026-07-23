"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import ProductCard from "@/components/pinterest/ProductCard";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";
import { Produto, Artigo, Pasta } from "@/types";

export default function BuscaPage() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<{
    produtos: Produto[];
    artigos: Artigo[];
    pastas: Pasta[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResultados(null);
      return;
    }

    const buscar = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/busca?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResultados(data);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(buscar, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const totalResults =
    (resultados?.produtos.length || 0) +
    (resultados?.artigos.length || 0) +
    (resultados?.pastas.length || 0);

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <h1 className="text-center text-3xl font-bold text-white tracking-tight">
            Busca
          </h1>
          <p className="mt-2 text-center text-gray-400">
            Encontre produtos, pastas e artigos
          </p>

          <div className="mx-auto mt-6 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#F4A7B9]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produtos, artigos, pastas..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-10 text-lg shadow-sm transition-all focus:border-[#F4A7B9] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F4A7B9]/30 text-gray-200 placeholder-gray-500"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setResultados(null); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition-colors hover:text-gray-200 hover:bg-white/10"
                  aria-label="Limpar busca"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {loading && query.trim() && (
          <div className="py-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#F4A7B9] border-t-transparent" />
            <p className="mt-3 text-sm text-gray-400">Buscando...</p>
          </div>
        )}

        {resultados && !loading && (
          <div className="section-reveal space-y-12">
            {totalResults === 0 ? (
              <div className="py-16 text-center">
                <p className="text-gray-400 text-lg">
                  Nenhum resultado encontrado para &quot;{query}&quot;
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Tente buscar por outro termo ou categoria
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                {totalResults} {totalResults === 1 ? "resultado" : "resultados"} para &quot;{query}&quot;
              </p>
            )}

            {resultados.pastas.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold text-white">
                  Pastas e Coleções
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {resultados.pastas.map((pasta) => (
                    <Link
                      key={pasta.id}
                      href={`/pastas/${pasta.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl card-hover">
                        <Image
                          src={pasta.imagemCapa || "/images/pastas/default.jpg"}
                          alt={pasta.nome}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/60" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-base font-bold text-white">{pasta.nome}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {resultados.produtos.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold text-white">
                  Produtos ({resultados.produtos.length})
                </h2>
                <div className="masonry-grid">
                  {resultados.produtos.map((produto) => (
                    <div key={produto.id} className="masonry-item">
                      <ProductCard produto={produto} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resultados.artigos.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold text-white">
                  Artigos ({resultados.artigos.length})
                </h2>
                <div className="masonry-grid">
                  {resultados.artigos.map((artigo) => (
                    <div key={artigo.id} className="masonry-item">
                      <ArtigoPinCard artigo={artigo} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
