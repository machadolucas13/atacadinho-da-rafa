"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categorias } from "@/data/categorias";

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Explore por Categoria
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            href={`/categorias/${categoria.slug}`}
            className="group flex flex-col items-center rounded-xl border bg-white p-4 transition-all hover:shadow-md hover:border-pink-200"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{ backgroundColor: `${categoria.cor}20` }}
            >
              {categoria.icone}
            </div>
            <span className="mt-2 text-center text-sm font-medium text-gray-700 group-hover:text-pink-600">
              {categoria.nome}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
