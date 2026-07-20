"use client";

import Image from "next/image";
import Link from "next/link";
import { mockPastas } from "@/data/mock-data";

export default function FeaturedFolders() {
  const featured = mockPastas.filter((p) => p.destaque);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Coleções em Destaque
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {featured.map((pasta) => (
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
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white">{pasta.nome}</h3>
                <p className="text-sm text-gray-200 line-clamp-2">
                  {pasta.descricao}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
