import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import { getCategorias } from "@/lib/categorias";

export default async function CategorySection() {
  const categorias = await getCategorias();

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isPt ? "Explore por Categoria" : "Explore by Category"}
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            {isPt ? "Toque para descobrir coleções especiais" : "Tap to discover special collections"}
          </p>
        </div>
        <LocaleAwareLink
          href="/pins"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
        >
          📌 {isPt ? "Ver todos os pins" : "See all pins"}
        </LocaleAwareLink>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            href={`/categorias/${categoria.slug}`}
            className="group relative aspect-square overflow-hidden rounded-3xl shadow-soft card-hover"
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                background: `linear-gradient(160deg, ${categoria.cor || "#f43f5e"}22 0%, ${categoria.cor || "#f43f5e"}44 40%, ${categoria.cor || "#f43f5e"}66 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/60" />

            <div className="relative z-10 flex h-full flex-col justify-end p-4">
              <span className="mb-2 text-4xl drop-shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {categoria.icone}
              </span>
              <span className="text-base font-bold text-white drop-shadow-sm">
                {categoria.nome}
              </span>
              <span className="mt-0.5 text-[11px] font-medium text-white/80 line-clamp-1">
                {categoria.descricao}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
