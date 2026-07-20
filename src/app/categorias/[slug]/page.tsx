import { Metadata } from "next";
import ProductGrid from "@/components/pinterest/ProductGrid";
import { categorias, mockProdutos } from "@/data/mock-data";

interface CategoriaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categorias.map((categoria) => ({
    slug: categoria.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoriaPageProps): Promise<Metadata> {
  const categoria = categorias.find((c) => c.slug === params.slug);
  if (!categoria) return {};

  return {
    title: `${categoria.nome} - Atacadinho da Rafa`,
    description: categoria.descricao,
  };
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  const categoria = categorias.find((c) => c.slug === params.slug);
  const produtosCategoria = mockProdutos.filter(
    (p) => p.categoriaId === categoria?.id
  );

  if (!categoria) {
    return <div>Categoria não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{categoria.nome}</h1>
          <p className="mt-2 text-gray-600">{categoria.descricao}</p>
        </div>
      </div>
      <ProductGrid produtos={produtosCategoria} />
    </div>
  );
}
