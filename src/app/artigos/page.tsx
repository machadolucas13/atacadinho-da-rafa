export const revalidate = 60;

import { Metadata } from "next";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";
import { getArtigos } from "@/lib/artigos";

export const metadata: Metadata = {
  title: {
    default: "Blog de Achados e Dicas - Moda, Decoração, Beleza | Atacadinho da Rafa",
    template: "%s | Atacadinho da Rafa",
  },
  description: "Artigos, dicas e recomendações de produtos para você economizar e descobrir achados incríveis em moda, decoração, tecnologia e beleza. Conteúdo prático e direto para brasileiras.",
  keywords: ["blog", "artigos", "dicas", "produtos", "achados", "moda feminina", "decoração", "tecnologia", "beleza", "aesthetic", "Pinterest", "2026", "Atacadinho da Rafa"],
  authors: [{ name: "Atacadinho da Rafa" }],
  creator: "Atacadinho da Rafa",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://atacadinhodarafa.vercel.app/artigos",
    siteName: "Atacadinho da Rafa",
    title: "Blog de Achados e Dicas - Moda, Decoração, Beleza | Atacadinho da Rafa",
    description: "Artigos, dicas e recomendações de produtos para você economizar e descobrir achados incríveis. Conteúdo prático para brasileiras.",
    images: [
      {
        url: "https://atacadinhodarafa.vercel.app/assets/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Atacadinho da Rafa - Achados e Dicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Achados e Dicas | Atacadinho da Rafa",
    description: "Artigos, dicas e recomendações de produtos para você economizar. Moda, decoração, tecnologia e beleza.",
    images: ["https://atacadinhodarafa.vercel.app/assets/images/og-home.jpg"],
  },
  alternates: {
    canonical: "https://atacadinhodarafa.vercel.app/artigos",
  },
};

export default async function ArtigosPage() {
  const artigos = await getArtigos();

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4A7B9]">
              ✨ Blog & Dicas
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Conteúdo que inspira
            </h1>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              Dicas, recomendações e achados incríveis para você descobrir mais.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artigos.map((artigo) => (
            <ArtigoPinCard key={artigo.id} artigo={artigo} />
          ))}
        </div>
      </div>
    </div>
  );
}

