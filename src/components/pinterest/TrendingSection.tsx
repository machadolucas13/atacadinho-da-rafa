"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { mockProdutos } from "@/data/mock-data";

export default function TrendingSection() {
  const trending = mockProdutos
    .filter((p) => p.viral || p.destaque)
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-900">Tendências</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {trending.map((produto) => (
          <Link
            key={produto.id}
            href={`/produtos/${produto.slug}`}
            className="group"
          >
            <div className="overflow-hidden rounded-xl bg-white transition-shadow hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={produto.imagemPrincipal}
                  alt={produto.nome}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {produto.nome}
                </h3>
                <p className="mt-1 text-lg font-bold text-pink-600">
                  R$ {produto.preco?.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
