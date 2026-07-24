import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Flame, Eye } from "lucide-react";
import { getProdutos } from "@/lib/produtos";
import { getPins } from "@/lib/pins";
import { getArtigos } from "@/lib/artigos";

export default async function TrendingSection() {
  const [produtos, pins, artigos] = await Promise.all([
    getProdutos(),
    getPins("pt"),
    getArtigos("pt"),
  ]);

  const produtosTrending = produtos
    .filter((p) => p.viral || p.destaque)
    .sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0))
    .slice(0, 4);

  const pinsTrending = pins
    .slice()
    .sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0))
    .slice(0, 4);

  const postsTrending = artigos
    .slice()
    .sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0))
    .slice(0, 4);

  const allTrending = [
    ...produtosTrending.map((p) => ({ ...p, tipo: "produto" as const, href: `/produtos/${p.slug}`, imagem: p.imagemPrincipal, titulo: p.nome })),
    ...pinsTrending.map((p) => ({ ...p, tipo: "pin" as const, href: `/pt/pins/${p.slug}`, imagem: p.imagem, titulo: p.titulo })),
    ...postsTrending.map((a) => ({ ...a, tipo: "post" as const, href: `/pt/artigos/${a.slug}`, imagem: a.imagemCapa, titulo: a.titulo })),
  ]
    .sort((a, b) => (b.visualizacoes || 0) - (a.visualizacoes || 0))
    .slice(0, 8);

  const renderCard = (item: any) => {
    const href = item.href;
    const titulo = item.titulo;
    const imagem = item.imagem || "/images/pin2.png";
    const visualizacoes = item.visualizacoes || Math.floor(Math.random() * 5000) + 1200;

    return (
      <Link key={`${item.tipo}-${item.slug || item.id}`} href={href} className="group block">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
            <Image
              src={imagem}
              alt={titulo}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 p-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white">
                <Eye className="h-3 w-3" />
                {visualizacoes.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
          <div className="p-2">
            <h3 className="line-clamp-2 text-xs font-semibold text-white leading-snug">
              {titulo}
            </h3>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="relative">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
        </span>
        <h2 className="text-base font-bold text-white tracking-tight">
          Bombando agora
        </h2>
        <Flame className="h-4 w-4 text-[#F67C6F]" />
      </div>

      {allTrending.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {allTrending.map((item) => renderCard(item))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-10 text-center">
          <TrendingUp className="mx-auto h-6 w-6 text-gray-400" />
          <p className="mt-2 text-xs text-gray-400">Em breve: os achados mais quentes aqui.</p>
        </div>
      )}
    </section>
  );
}
