"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, ExternalLink, ChevronLeft, Heart, Tag } from "lucide-react";
import { Produto } from "@/types";
import ProductCard from "@/components/pinterest/ProductCard";
import ShareButtons from "@/components/social/ShareButtons";

function MarketplaceBadge({ marketplace }: { marketplace: string }) {
  const lower = marketplace.toLowerCase();
  if (lower.includes("shopee")) {
    return (
      <span className="inline-flex items-center gap-1 rounded-lg bg-[#ee4d2d] px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        <Tag className="h-3 w-3" />
        Shopee
      </span>
    );
  }
  if (lower.includes("amazon")) {
    return (
      <span className="inline-flex items-center gap-1 rounded-lg bg-[#232f3e] px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        <Tag className="h-3 w-3" />
        Amazon
      </span>
    );
  }
  if (lower.includes("mercadolivre") || lower.includes("meli")) {
    return (
      <span className="inline-flex items-center gap-1 rounded-lg bg-[#fff159] px-2 py-1 text-[10px] font-bold text-gray-900 shadow-lg">
        <Tag className="h-3 w-3" />
        Mercado Livre
      </span>
    );
  }
  if (lower.includes("shein")) {
    return (
      <span className="inline-flex items-center gap-1 rounded-lg bg-black px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        <Tag className="h-3 w-3" />
        SHEIN
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-gray-900 shadow-lg">
      <Tag className="h-3 w-3" />
      {marketplace}
    </span>
  );
}

interface ProdutoPageProps {
  produto: Produto;
  relacionados: Produto[];
}

export default function ProdutoPage({
  produto,
  relacionados,
}: ProdutoPageProps) {
  const discount = produto.precoOriginal
    ? Math.round(
        ((produto.precoOriginal - produto.preco!) / produto.precoOriginal) * 100
      )
    : 0;

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#E11D48]/10 via-transparent to-[#F4A7B9]/10" />

        <div className="mx-auto max-w-7xl px-4 pt-28 pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-[#F4A7B9] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-card">
              <Image
                src={produto.imagemPrincipal}
                alt={produto.nome}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <span className="badge absolute left-4 top-4 bg-[#F43F5E] text-white shadow-lg">
                  -{discount}%
                </span>
              )}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-end gap-2">
                <span className="badge bg-white/90 backdrop-blur-sm text-[#E11D48] shadow-sm cursor-pointer hover:bg-white transition-colors">
                  <Heart className="h-3 w-3" /> Salvar
                </span>
                <ShareButtons
                  title={produto.nome}
                  description={produto.descricao || `${produto.nome} por R$ ${produto.preco?.toFixed(2)} na ${produto.loja}`}
                  image={produto.imagemPrincipal}
                  url={`/produtos/${produto.slug}`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#F4A7B9]">
                  {produto.loja}
                </p>
                <MarketplaceBadge marketplace={produto.marketplace || produto.loja} />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {produto.nome}
              </h1>

              {produto.avaliacao && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(produto.avaliacao!)
                            ? "fill-[#F4A261] text-[#F4A261]"
                            : "text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {produto.avaliacao} ({produto.numAvaliacoes} avaliações)
                  </span>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-bold text-[#F4A7B9]">
                  R$ {produto.preco?.toFixed(2)}
                </span>
                {produto.precoOriginal && (
                  <span className="text-xl text-gray-500 line-through font-medium">
                    R$ {produto.precoOriginal.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="badge bg-[#F43F5E]/10 text-[#E11D48] border border-[#F43F5E]/20">
                    Economia de R$ {(produto.precoOriginal! - produto.preco!).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={produto.linkAfiliado}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Ver Oferta na {produto.loja}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-center text-xs text-gray-400">
                  Clique para ver a oferta atualizada na {produto.loja}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loja</p>
                  <p className="mt-1 text-sm font-semibold text-white">{produto.loja}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Categoria</p>
                  <p className="mt-1 text-sm font-semibold text-white">{produto.categoria.nome}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Disponibilidade</p>
                  <p className="mt-1 text-sm font-semibold text-green-400">Em estoque</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="mb-6 text-2xl font-bold text-white tracking-tight">
            Você também vai gostar
          </h2>
          <div className="masonry-grid">
            {relacionados.map((produto) => (
              <div key={produto.id} className="masonry-item">
                <ProductCard produto={produto} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

