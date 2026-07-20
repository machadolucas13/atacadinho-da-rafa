import { Metadata } from "next";
import ArticleCard from "@/components/blog/ArticleCard";
import { mockArtigos } from "@/data/mock-data";

export const metadata: Metadata = {
  title: "Blog - Atacadinho da Rafa",
  description: "Artigos, dicas e recomendações de produtos",
};

export default function ArtigosPage() {
  const artigosDestaque = mockArtigos.filter((a) => a.destaque);
  const outrosArtigos = mockArtigos.filter((a) => !a.destaque);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="mt-2 text-gray-600">
            Dicas, recomendações e achados incríveis
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {artigosDestaque.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Artigos em Destaque
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {artigosDestaque.map((artigo) => (
                <ArticleCard key={artigo.id} artigo={artigo} featured />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Todos os Artigos
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockArtigos.map((artigo) => (
              <ArticleCard key={artigo.id} artigo={artigo} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
