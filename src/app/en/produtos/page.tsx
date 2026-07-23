import { Metadata } from "next";
import ProductGrid from "@/components/pinterest/ProductGrid";
import { getProdutos } from "@/lib/produtos";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://atacadinhodarafa.com.br"),
    title: {
      default: "All Products - Atacadinho da Rafa",
      template: "%s | Atacadinho da Rafa",
    },
    description:
      "Browse all products from our curation. Fashion, decor, tech, beauty and more.",
    keywords: ["products", "deals", "finds", "fashion", "decor", "tech", "beauty"],
    alternates: {
      canonical: "/en/produtos",
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
              All Products
            </h1>
            <p className="mt-2 text-gray-400">
              Our complete curation of finds
            </p>
          </div>
          <ProductGrid produtos={produtos} />
        </div>
      </section>
    </main>
  );
}
