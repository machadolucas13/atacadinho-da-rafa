import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Flame } from "lucide-react";
import { getProdutos } from "@/lib/produtos";

export default async function TrendingSection() {
  const produtos = await getProdutos();
  const trending = produtos
    .filter((p) => p.viral || p.destaque)
    .slice(0, 8);

  return (
    <section className="relative">
      <div className="mb-5 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
        </span>
        <h2 className="text-lg font-bold text-white tracking-tight">
          Bombando agora
        </h2>
        <Flame className="h-4 w-4 text-[#F67C6F]" />
      </div>

      {trending.length > 0 ? (
        <div className="masonry-grid">
          {trending.map((produto) => (
            <Link
              key={produto.id}
              href={`/produtos/${produto.slug}`}
              className="masonry-item group block"
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 hover:shadow-card-hover hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <Image
                    src={produto.imagemPrincipal}
                    alt={produto.nome}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#E11D48]">
                    {produto.loja}
                  </p>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                    {produto.nome}
                  </h3>
                  <span className="mt-1.5 block text-base font-bold text-[#E11D48]">
                    R$ {produto.preco?.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 py-12 text-center">
          <TrendingUp className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-400">Em breve: os achados mais quentes aqui.</p>
        </div>
      )}
    </section>
  );
}
