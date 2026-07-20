"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { mockProdutos, mockArtigos, mockPastas } from "@/data/mock-data";

export default function BuscaPage() {
  const [query, setQuery] = useState("");

  const produtosFiltrados = mockProdutos.filter(
    (p) =>
      p.nome.toLowerCase().includes(query.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const artigosFiltrados = mockArtigos.filter(
    (a) =>
      a.titulo.toLowerCase().includes(query.toLowerCase()) ||
      a.descricao?.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const pastasFiltradas = mockPastas.filter(
    (p) =>
      p.nome.toLowerCase().includes(query.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Busca</h1>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produtos, artigos, pastas..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 focus:border-pink-500 focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {query && (
          <div className="space-y-12">
            {pastasFiltradas.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Pastas e Coleções
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {pastasFiltradas.map((pasta) => (
                    <Link
                      key={pasta.id}
                      href={`/pastas/${pasta.slug}`}
                      className="group"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={pasta.imagemCapa || "/images/pastas/default.jpg"}
                          alt={pasta.nome}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-bold text-white">{pasta.nome}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {produtosFiltrados.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Produtos ({produtosFiltrados.length})
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {produtosFiltrados.map((produto) => (
                    <ProductCard key={produto.id} produto={produto} />
                  ))}
                </div>
              </section>
            )}

            {artigosFiltrados.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Artigos ({artigosFiltrados.length})
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {artigosFiltrados.map((artigo) => (
                    <ArticleCard key={artigo.id} artigo={artigo} />
                  ))}
                </div>
              </section>
            )}

            {produtosFiltrados.length === 0 &&
              artigosFiltrados.length === 0 &&
              pastasFiltradas.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">
                    Nenhum resultado encontrado para &quot;{query}&quot;
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
