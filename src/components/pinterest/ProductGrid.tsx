"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { Produto } from "@/types";

interface ProductGridProps {
  produtos?: Produto[];
  titulo?: string;
  subtitle?: string;
  limite?: number;
}

export default function ProductGrid({
  produtos,
  titulo,
  subtitle,
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
    }, 800);
  };

  const hasMore = displayedProdutos.length < (produtos?.length || 0);

  return (
    <section className="section-reveal">
      {(titulo || subtitle) && (
        <div className="mb-6 text-center">
          {titulo && (
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {titulo}
            </h2>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
      )}
      <div className="masonry-grid">
        {displayedProdutos.map((produto) => (
          <div key={produto.id} className="masonry-item">
            <ProductCard produto={produto} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn-ghost"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                Carregar mais
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

