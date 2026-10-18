import { Metadata } from "next";
import ProductGrid from "@/components/pinterest/ProductGrid";
import { getProdutos } from "@/lib/produtos";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://atacadinhodarafa.vercel.app";
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Todos os Produtos - Atacadinho da Rafa",
      template: "%s | Atacadinho da Rafa",
    },
    description:
      "Veja todos os produtos da nossa curadoria. Moda, decoração, tecnologia, beleza e mais.",
    keywords: ["produtos", "ofertas", "achados", "moda", "decoracao", "tecnologia", "beleza"],
    alternates: {
      canonical: `${baseUrl}/pt/produtos`,
    },
  };
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <main className="min-h-screen">
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Todos os Produtos
            </h1>
            <p className="mt-2 text-gray-400">
              Nossa curadoria completa de achados
            </p>
          </div>
          <ProductGrid produtos={produtos} locale="pt" />
        </div>
      </section>
    </main>
  );
}

