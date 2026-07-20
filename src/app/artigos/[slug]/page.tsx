import { Metadata } from "next";
import { mockArtigos } from "@/data/mock-data";

interface ArtigoPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return mockArtigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArtigoPageProps): Promise<Metadata> {
  const artigo = mockArtigos.find((a) => a.slug === params.slug);
  if (!artigo) return {};

  return {
    title: `${artigo.titulo} - Atacadinho da Rafa`,
    description: artigo.descricao,
  };
}

export default function ArtigoPage({ params }: ArtigoPageProps) {
  const artigo = mockArtigos.find((a) => a.slug === params.slug);

  if (!artigo) {
    return <div>Artigo não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{artigo.titulo}</h1>
          <p className="mt-4 text-lg text-gray-600">{artigo.descricao}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>
              {new Date(artigo.publicadoEm).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {artigo.tempoLeitura && (
              <span>{artigo.tempoLeitura} min de leitura</span>
            )}
          </div>
        </header>

        {artigo.imagemCapa && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={artigo.imagemCapa}
              alt={artigo.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: artigo.conteudo }} />
        </div>

        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl font-bold text-gray-900">Produtos Relacionados</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {mockProdutos.slice(0, 4).map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
