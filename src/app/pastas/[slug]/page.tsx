import { Metadata } from "next";
import ProductGrid from "@/components/pinterest/ProductGrid";
import { mockPastas } from "@/data/mock-data";

interface PastaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return mockPastas.map((pasta) => ({
    slug: pasta.slug,
  }));
}

export async function generateMetadata({
  params,
}: PastaPageProps): Promise<Metadata> {
  const pasta = mockPastas.find((p) => p.slug === params.slug);
  if (!pasta) return {};

  return {
    title: `${pasta.nome} - Coleção - Atacadinho da Rafa`,
    description: pasta.descricao,
  };
}

export default function PastaPage({ params }: PastaPageProps) {
  const pasta = mockPastas.find((p) => p.slug === params.slug);

  if (!pasta) {
    return <div>Pasta não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{pasta.nome}</h1>
          <p className="mt-2 text-gray-600">{pasta.descricao}</p>
        </div>
      </div>
      <ProductGrid produtos={mockProdutos} />
    </div>
  );
}
