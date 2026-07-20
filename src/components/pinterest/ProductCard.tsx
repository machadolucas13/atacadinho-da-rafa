"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Produto } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  produto: Produto;
  variant?: "default" | "horizontal";
}

export default function ProductCard({ produto, variant = "default" }: ProductCardProps) {
  const discount = produto.precoOriginal
    ? Math.round(((produto.precoOriginal - produto.preco!) / produto.precoOriginal) * 100)
    : 0;

  if (variant === "horizontal") {
    return (
      <Link href={`/produtos/${produto.slug}`} className="group block">
        <div className="flex gap-4 rounded-xl border bg-white p-3 transition-shadow hover:shadow-lg">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={produto.imagemPrincipal}
              alt={produto.nome}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <h3 className="font-medium text-gray-900 line-clamp-2">{produto.nome}</h3>
            <p className="text-sm text-gray-500">{produto.loja}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-lg font-bold text-pink-600">
                R$ {produto.preco?.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  R$ {produto.precoOriginal?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/produtos/${produto.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-white transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={produto.imagemPrincipal}
            alt={produto.nome}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {discount > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}
          {produto.viral && (
            <span className="absolute right-2 top-2 rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">
              🔥 Viral
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-900 line-clamp-2">{produto.nome}</h3>
          <p className="mt-1 text-sm text-gray-500">{produto.loja}</p>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-pink-600">
                R$ {produto.preco?.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  R$ {produto.precoOriginal?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          {produto.avaliacao && (
            <div className="mt-2 flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">
                {produto.avaliacao} ({produto.numAvaliacoes})
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
