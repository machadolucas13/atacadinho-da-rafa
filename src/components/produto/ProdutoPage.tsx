"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, ExternalLink } from "lucide-react";
import { Produto } from "@/types";
import ProductCard from "@/components/pinterest/ProductCard";

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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
            <Image
              src={produto.imagemPrincipal}
              alt={produto.nome}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                -{discount}%
              </span>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">{produto.nome}</h1>
            <p className="mt-2 text-gray-600">{produto.descricao}</p>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-bold text-pink-600">
                R$ {produto.preco?.toFixed(2)}
              </span>
              {produto.precoOriginal && (
                <span className="text-xl text-gray-400 line-through">
                  R$ {produto.precoOriginal.toFixed(2)}
                </span>
              )}
            </div>

            {produto.avaliacao && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(produto.avaliacao!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {produto.avaliacao} ({produto.numAvaliacoes} avaliações)
                </span>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <a
                href={produto.linkAfiliado}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-pink-700"
              >
                <ShoppingBag className="h-5 w-5" />
                Ver Oferta na {produto.loja}
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="text-center text-sm text-gray-500">
                Clique para ver a oferta atualizada na {produto.loja}
              </p>
            </div>

            <div className="mt-8 rounded-xl border bg-white p-6">
              <h3 className="font-semibold text-gray-900">Informações</h3>
              <dl className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Loja</dt>
                  <dd className="font-medium">{produto.loja}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Categoria</dt>
                  <dd className="font-medium">{produto.categoria.nome}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Disponibilidade</dt>
                  <dd className="font-medium text-green-600">Em estoque</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {relacionados.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
