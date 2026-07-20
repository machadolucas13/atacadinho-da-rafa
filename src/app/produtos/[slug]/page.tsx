import { Metadata } from "next";
import ProdutoPage from "@/components/produto/ProdutoPage";
import { mockProdutos } from "@/data/mock-data";

interface ProdutoDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return mockProdutos.map((produto) => ({
    slug: produto.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProdutoDetailPageProps): Promise<Metadata> {
  const produto = mockProdutos.find((p) => p.slug === params.slug);
  if (!produto) return {};

  return {
    title: `${produto.nome} - Atacadinho da Rafa`,
    description: produto.descricaoCurta || produto.descricao,
  };
}

export default function ProdutoDetailPage({ params }: ProdutoDetailPageProps) {
  const produto = mockProdutos.find((p) => p.slug === params.slug);
  const relacionados = mockProdutos
    .filter((p) => p.categoriaId === produto?.categoriaId && p.id !== produto?.id)
    .slice(0, 5);

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  return <ProdutoPage produto={produto} relacionados={relacionados} />;
}
