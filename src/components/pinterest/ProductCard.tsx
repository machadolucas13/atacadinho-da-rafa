"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingBag, Tag } from "lucide-react";
import { Produto } from "@/types";
import { cn } from "@/lib/utils";
import ShareButtons from "@/components/social/ShareButtons";
import SaveButton from "@/components/ui/SaveButton";
import TagBadge from "@/components/ui/TagBadge";
import MarketplaceBadge from "@/components/ui/MarketplaceBadge";

interface ProductCardProps {
  produto: Produto;
  variant?: "default" | "horizontal";
}

export default function ProductCard({ produto, variant = "default" }: ProductCardProps) {
  const router = useRouter();
  const discount = produto.precoOriginal
    ? Math.round(((produto.precoOriginal - produto.preco!) / produto.precoOriginal) * 100)
    : 0;

  if (variant === "horizontal") {
    return (
      <article
        onClick={() => router.push(`/produtos/${produto.slug}`)}
        className="group block cursor-pointer"
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") router.push(`/produtos/${produto.slug}`);
        }}
      >
        <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:border-[#F4A7B9]/40">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
            <Image
              src={produto.imagemPrincipal}
              alt={produto.nome}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute left-1 top-1">
              <MarketplaceBadge marketplace={produto.marketplace || produto.loja} />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <h3 className="font-semibold text-white line-clamp-2 text-[15px]">
              {produto.nome}
            </h3>
            <p className="text-xs text-gray-400 font-medium">{produto.loja}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-lg font-bold text-[#E11D48]">
                R$ {produto.preco?.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-gray-500 line-through font-medium">
                  R$ {produto.precoOriginal?.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="badge bg-[#F43F5E] text-white">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 transition-all group-hover:bg-[#E11D48] group-hover:text-white group-hover:border-[#E11D48]">
              Ver oferta <ShoppingBag className="h-3 w-3" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => router.push(`/produtos/${produto.slug}`)}
      className="group block cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(`/produtos/${produto.slug}`);
      }}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover">
        <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
          <Image
            src={produto.imagemPrincipal}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-[#F43F5E] px-3 py-1 text-[11px] font-bold text-white shadow-lg tracking-wide">
              -{discount}%
            </span>
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {produto.destaque && <TagBadge label="HOT" variant="hot" />}
            {produto.viral && <TagBadge label="Viral" variant="fire" />}
          </div>

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between transition-all duration-300 md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <SaveButton item={{ id: produto.slug, tipo: "produto", titulo: produto.nome, slug: produto.slug, imagemCapa: produto.imagemPrincipal }} />
            <ShareButtons
              title={produto.nome}
              description={produto.descricao || `${produto.nome} por R$ ${produto.preco?.toFixed(2)} na ${produto.loja}`}
              image={produto.imagemPrincipal}
              url={`/produtos/${produto.slug}`}
            />
          </div>

          <div className="absolute left-3 top-3">
            <MarketplaceBadge marketplace={produto.marketplace || produto.loja} />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-white hover:scale-110 group-hover:opacity-100"
            aria-label="Curtir"
          >
            <Heart className="h-4 w-4 text-[#E11D48]" />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#F4A7B9]">
            {produto.loja}
          </p>
          <h3 className="font-semibold text-white line-clamp-2 text-[15px]">
            {produto.nome}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#E11D48]">
                R$ {produto.preco?.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-gray-500 line-through font-medium">
                  R$ {produto.precoOriginal?.toFixed(2)}
                </span>
              )}
            </div>
            {produto.avaliacao && (
              <div className="flex items-center gap-1 rounded-full bg-[#FEF3C7]/20 px-2 py-0.5">
                <Star className="h-3 w-3 fill-[#F4A261] text-[#F4A261]" />
                <span className="text-[11px] font-bold text-[#F4A261]">
                  {produto.avaliacao}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
