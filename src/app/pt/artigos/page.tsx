"use server";

import { getArtigos } from "@/server/artigos";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const artigos = await getArtigos(params.locale);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {artigos.map((artigo) => (
            <ArtigoPinCard key={artigo.id} artigo={artigo} locale="pt" />
          ))}
        </div>
      </div>
    </div>
  );
}
