export const revalidate = 60;

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/pinterest/ProductGrid";
import { getPastas } from "@/lib/pastas";
import { getProdutos } from "@/lib/produtos";
import { getBaseUrl } from "@/lib/base-url";

interface PastaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const pastas = await getPastas();
  return pastas.map((pasta) => ({
    slug: pasta.slug,
  }));
}

export async function generateMetadata({
  params,
}: PastaPageProps): Promise<Metadata> {
  const pastas = await getPastas();
  const pasta = pastas.find((p) => p.slug === params.slug);
  if (!pasta) return {};

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/pt/pastas/${params.slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: `${pasta.nome} - Coleção - Atacadinho da Rafa`,
    description: pasta.descricao || `Coleção especial ${pasta.nome} no Atacadinho da Rafa.`,
    keywords: [pasta.nome.toLowerCase(), "colecao", "pasta", "achados", "Atacadinho da Rafa"],
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: "Atacadinho da Rafa",
      title: `${pasta.nome} - Coleção - Atacadinho da Rafa`,
      description: pasta.descricao || `Coleção especial ${pasta.nome} no Atacadinho da Rafa.`,
      images: [
        {
          url: pasta.imagemCapa ? `${baseUrl}${pasta.imagemCapa}` : `${baseUrl}/assets/images/logo_rafa.png`,
          width: 1200,
          height: 630,
          alt: pasta.nome,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pasta.nome} - Coleção - Atacadinho da Rafa`,
      description: pasta.descricao || `Coleção especial ${pasta.nome} no Atacadinho da Rafa.`,
      images: [pasta.imagemCapa ? `${baseUrl}${pasta.imagemCapa}` : `${baseUrl}/assets/images/logo_rafa.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PastaPage({ params }: PastaPageProps) {
  const pastas = await getPastas();
  const pasta = pastas.find((p) => p.slug === params.slug);
  const baseUrl = getBaseUrl();

  if (!pasta) {
    return <div>Pasta não encontrada</div>;
  }

  const produtos = await getProdutos();
  const produtosPasta = produtos.filter((p) => p.categoriaId === pasta?.categoria?.id);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/pt` },
      { "@type": "ListItem", position: 2, name: pasta.categoria?.nome || "Categoria", item: `${baseUrl}/pt/categorias/${pasta.categoria?.slug || ""}` },
      { "@type": "ListItem", position: 3, name: pasta.nome, item: `${baseUrl}/pt/pastas/${params.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="relative min-h-screen">
        {pasta.imagemCapa && (
          <div className="absolute inset-0 -z-10 h-[420px] overflow-hidden">
            <Image
              src={pasta.imagemCapa}
              alt={pasta.nome}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a14]" />
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 pt-28 pb-8">
          {!pasta.imagemCapa && (
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/pt" className="hover:text-[#F4A7B9] transition-colors">Home</Link>
              <span className="text-gray-600">/</span>
              <Link href={`/pt/categorias/${pasta.categoria.slug}`} className="hover:text-[#F4A7B9] transition-colors">
                {pasta.categoria.nome}
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white font-medium">{pasta.nome}</span>
            </nav>
          )}

          <div className="py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
              {pasta.nome}
            </h1>
            {pasta.descricao && (
              <p className="mt-3 text-lg text-gray-300 max-w-2xl">
                {pasta.descricao}
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16">
          <ProductGrid produtos={produtosPasta} titulo="Achados da coleção" locale="pt" />
        </div>
      </div>
    </>
  );
}
