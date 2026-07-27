export const revalidate = 60;

import { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/pinterest/ProductGrid";
import { getCategorias } from "@/lib/categorias";
import { getProdutos } from "@/lib/produtos";

interface CategoriaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((categoria) => ({
    slug: categoria.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoriaPageProps): Promise<Metadata> {
  const categorias = await getCategorias();
  const categoria = categorias.find((c) => c.slug === params.slug);
  if (!categoria) return {};

  return {
    title: `${categoria.nome} - Atacadinho da Rafa`,
    description: categoria.descricao || `Descubra os melhores ${categoria.nome.toLowerCase()} na nossa curadoria.`,
    keywords: [categoria.nome.toLowerCase(), "achados", "ofertas", "produtos", "Atacadinho da Rafa"],
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `https://atacadinhodarafa.vercel.app/categorias/${params.slug}`,
      siteName: "Atacadinho da Rafa",
      title: `${categoria.nome} - Atacadinho da Rafa`,
      description: categoria.descricao || `Descubra os melhores ${categoria.nome.toLowerCase()} na nossa curadoria.`,
      images: [
        {
          url: "https://atacadinhodarafa.vercel.app/assets/images/og-home.jpg",
          width: 1200,
          height: 630,
          alt: categoria.nome,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoria.nome} - Atacadinho da Rafa`,
      description: categoria.descricao || `Descubra os melhores ${categoria.nome.toLowerCase()} na nossa curadoria.`,
      images: ["https://atacadinhodarafa.vercel.app/assets/images/og-home.jpg"],
    },
    alternates: {
      canonical: `https://atacadinhodarafa.vercel.app/categorias/${params.slug}`,
    },
  };
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const categorias = await getCategorias();
  const categoria = categorias.find((c) => c.slug === params.slug);
  const produtos = await getProdutos();
  const produtosCategoria = produtos.filter((p) => p.categoriaId === categoria?.id);

  if (!categoria) {
    return <div>Categoria não encontrada</div>;
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://atacadinhodarafa.vercel.app/" },
      { "@type": "ListItem", position: 2, name: categoria.nome, item: `https://atacadinhodarafa.vercel.app/categorias/${params.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(160deg, ${categoria.cor || "#f43f5e"}15 0%, ${categoria.cor || "#f43f5e"}30 40%, transparent 80%)`,
          }}
        />

        <div className="mx-auto max-w-7xl px-4 pt-28 pb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#F4A7B9] transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{categoria.nome}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{categoria.icone}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {categoria.nome}
                </h1>
                {categoria.descricao && (
                  <p className="mt-1 text-gray-400">{categoria.descricao}</p>
                )}
              </div>
            </div>
            <div className="md:ml-auto">
              <span className="badge bg-white/10 border border-white/10 text-gray-300 shadow-sm">
                {produtosCategoria.length} {produtosCategoria.length === 1 ? "achado" : "achados"}
              </span>
            </div>
          </div>

          <ProductGrid produtos={produtosCategoria} titulo={categoria.nome} />
        </div>
      </div>
    </>
  );
}
