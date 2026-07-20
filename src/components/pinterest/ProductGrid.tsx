"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Produto } from "@/types";

interface ProductGridProps {
  produtos?: Produto[];
  titulo?: string;
  limite?: number;
}

export default function ProductGrid({
  produtos,
  titulo,
  limite = 20,
}: ProductGridProps) {
  const [displayedProdutos, setDisplayedProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produtos) {
      setDisplayedProdutos(produtos.slice(0, limite));
    }
  }, [produtos, limite]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedProdutos((prev) => [
        ...prev,
        ...(produtos || []).slice(prev.length, prev.length + 10),
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {titulo && (
        <h2 className="mb-6 text-2xl font-bold text-gray-900">{titulo}</h2>
      )}
      <div className="masonry-grid">
        {displayedProdutos.map((produto) => (
          <div key={produto.id} className="masonry-item">
            <ProductCard produto={produto} />
          </div>
        ))}
      </div>
      {displayedProdutos.length < (produtos?.length || 0) && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-full bg-pink-600 px-8 py-3 text-white transition-colors hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}
    </section>
  );
}
