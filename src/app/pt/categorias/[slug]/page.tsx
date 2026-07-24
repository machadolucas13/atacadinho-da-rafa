import { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/pinterest/ProductGrid";
import PinCard from "@/components/pinterest/PinCard";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";
import { getCategorias } from "@/lib/categorias";
import { getProdutos } from "@/lib/produtos";
import { getPins } from "@/lib/pins";
import { getArtigos } from "@/server/artigos";

interface CategoriaPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((categoria) => ({ slug: categoria.slug }));
}

export async function generateMetadata({ params }: CategoriaPageProps): Promise<Metadata> {
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
      url: `https://atacadinhodarafa.com.br/categorias/${params.slug}`,
      siteName: "Atacadinho da Rafa",
      title: `${categoria.nome} - Atacadinho da Rafa`,
      description: categoria.descricao || `Descubra os melhores ${categoria.nome.toLowerCase()} na nossa curadoria.`,
      images: [
        {
          url: "https://atacadinhodarafa.com.br/assets/images/og-home.jpg",
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
      images: ["https://atacadinhodarafa.com.br/assets/images/og-home.jpg"],
    },
    alternates: {
      canonical: `https://atacadinhodarafa.com.br/categorias/${params.slug}`,
    },
  };
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const categorias = await getCategorias();
  const categoria = categorias.find((c) => c.slug === params.slug);
  const [produtos, pins, artigos] = await Promise.all([
    getProdutos(),
    getPins("pt"),
    getArtigos("pt"),
  ]);

  const produtosCategoria = produtos.filter((p) => p.categoriaId === categoria?.id);
  const pinsCategoria = pins.filter((p) => p.categoriaId === categoria?.id);
  const artigosCategoria = artigos.filter((a) => a.categoriaId === categoria?.id);

  if (!categoria) {
    return <div>Categoria não encontrada</div>;
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://atacadinhodarafa.com.br/" },
      { "@type": "ListItem", position: 2, name: categoria.nome, item: `https://atacadinhodarafa.com.br/categorias/${params.slug}` },
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
                {produtosCategoria.length + pinsCategoria.length + artigosCategoria.length} {produtosCategoria.length + pinsCategoria.length + artigosCategoria.length === 1 ? "achado" : "achados"}
              </span>
            </div>
          </div>

          {produtosCategoria.length > 0 && (
            <ProductGrid produtos={produtosCategoria} titulo={`Produtos em ${categoria.nome}`} limite={5} />
          )}

          {pinsCategoria.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Pins</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pinsCategoria.map((pin) => (
                  <div key={pin.id}>
                    <PinCard pin={pin} locale="pt" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {artigosCategoria.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artigosCategoria.map((artigo) => (
                  <ArtigoPinCard key={artigo.id} artigo={artigo} locale="pt" />
                ))}
              </div>
            </section>
          )}

          {produtosCategoria.length === 0 && pinsCategoria.length === 0 && artigosCategoria.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum achado encontrado nesta categoria ainda.</p>
              <p className="text-gray-500 text-sm mt-2">Volte em breve, novidades chegando!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
