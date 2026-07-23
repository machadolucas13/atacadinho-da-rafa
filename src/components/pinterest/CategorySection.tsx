import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import { getCategorias } from "@/lib/categorias";

export default async function CategorySection() {
  const categorias = await getCategorias();

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Explore por Categoria
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Toque para descobrir coleções especiais
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            href={`/categorias/${categoria.slug}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 hover:shadow-card-hover hover:-translate-y-1"
          >
            <div className="relative z-10 flex h-full flex-col justify-center items-center p-4 text-center">
              <span className="mb-2 text-3xl">{categoria.icone}</span>
              <span className="text-sm font-bold text-white">{categoria.nome}</span>
              <span className="mt-0.5 text-[11px] font-medium text-gray-400 line-clamp-1">
                {categoria.descricao}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
