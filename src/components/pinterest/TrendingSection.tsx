import Image from "next/image";
import Link from "next/link";
import TrendingCarousel from "./TrendingCarousel";
import { getProdutos } from "@/lib/produtos";
import { getPins } from "@/lib/pins";
import { getArtigos } from "@/lib/artigos";
import { getItemViews } from "@/lib/views";

export default async function TrendingSection({ locale = "pt" }: { locale?: string }) {
  const [produtos, pins, artigos] = await Promise.all([
    getProdutos(),
    getPins(locale),
    getArtigos(locale),
  ]);

  const produtosTrending = produtos
    .filter((p) => p.viral || p.destaque)
    .sort((a, b) => getItemViews(b.slug) - getItemViews(a.slug))
    .slice(0, 4);

  const pinsTrending = pins
    .slice()
    .sort((a, b) => getItemViews(b.slug) - getItemViews(a.slug))
    .slice(0, 4);

  const postsTrending = artigos
    .slice()
    .sort((a, b) => getItemViews(b.slug) - getItemViews(a.slug))
    .slice(0, 4);

  const allTrending = [
    ...produtosTrending.map((p) => ({ ...p, tipo: "produto" as const, href: `/${locale}/produtos/${p.slug}`, imagem: p.imagemPrincipal, titulo: p.nome })),
    ...pinsTrending.map((p) => ({ ...p, tipo: "pin" as const, href: `/${locale}/pins/${p.slug}`, imagem: p.imagem, titulo: p.titulo })),
    ...postsTrending.map((a) => ({ ...a, tipo: "post" as const, href: `/${locale}/artigos/${a.slug}`, imagem: a.imagemCapa, titulo: a.titulo })),
  ];

  return <TrendingCarousel items={allTrending} />;
}

