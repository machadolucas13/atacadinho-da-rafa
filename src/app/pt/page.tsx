import { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import TrendingSection from "@/components/pinterest/TrendingSection";
import CarouselSection from "@/components/pinterest/CarouselSection";
import ProductCarouselSection from "@/components/pinterest/ProductCarouselSection";
import { getArtigos } from "@/lib/artigos";
import { getPins } from "@/lib/pins";
import { getProdutos } from "@/lib/produtos";
import { getItemViews } from "@/lib/views";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://atacadinhodarafa.com.br"),
    title: {
      default: "Atacadinho da Rafa - Descobertas, Achados e Ofertas",
      template: "%s | Atacadinho da Rafa",
    },
    description:
      "Descubra os melhores achados, ofertas e recomendações de produtos. Curadoria visual de moda, decoração, tecnologia e beleza.",
    keywords: [
      "achados",
      "ofertas",
      "descobertas",
      "produtos",
      "moda feminina",
      "decoracao",
      "tecnologia",
      "cozinha",
      "beleza",
      "acessorios",
      "shopee",
      "brechó",
      "economia",
    ],
    alternates: {
      canonical: "/pt",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "https://atacadinhodarafa.com.br/pt",
      siteName: "Atacadinho da Rafa",
      title: "Atacadinho da Rafa - Descobertas, Achados e Ofertas",
      description:
        "Descubra os melhores achados, ofertas e recomendações. Curadoria visual de moda, decoração, tecnologia e beleza.",
      images: [
        {
          url: "https://atacadinhodarafa.com.br/assets/images/og-home.jpg",
          width: 1200,
          height: 630,
          alt: "Atacadinho da Rafa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Atacadinho da Rafa",
      description: "Descubra os melhores achados e ofertas",
      images: ["https://atacadinhodarafa.com.br/assets/images/og-home.jpg"],
    },
  };
}

export default async function HomePage() {
  const [artigos, pins, produtos] = await Promise.all([
    getArtigos("pt"),
    getPins("pt"),
    getProdutos(),
  ]);

  const featuredProdutos = produtos
    .filter((p) => p.ativo && p.destaque)
    .slice(0, 4);

  const featuredPins = pins
    .slice()
    .sort((a, b) => getItemViews(b.slug) - getItemViews(a.slug))
    .slice(0, 4);

  const featuredPosts = artigos
    .slice()
    .sort((a, b) => getItemViews(b.slug) - getItemViews(a.slug))
    .slice(0, 4);

  const pinItems = featuredPins.map((pin) => ({
    id: pin.id,
    href: `/pt/pins/${pin.slug}`,
    imagem: pin.imagem,
    titulo: pin.titulo,
    badge: (
      <span className="inline-flex items-center rounded-full bg-[#E11D48]/90 px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        🔥 Destaque
      </span>
    ),
  }));

  const postItems = featuredPosts.map((post) => ({
    id: post.slug,
    href: `/pt/artigos/${post.slug}`,
    imagem: post.imagemCapa || "/images/artigos/default.jpg",
    titulo: post.titulo,
    badge: post.categoria?.nome ? (
      <span className="inline-flex items-center rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm">
        {post.categoria.nome}
      </span>
    ) : undefined,
    meta: post.tempoLeitura ? (
      <span className="text-xs text-gray-400">{post.tempoLeitura} min de leitura</span>
    ) : undefined,
  }));

  return (
    <main className="relative z-10 min-h-screen">
      <section aria-label="Hero">
        <HeroSection />
      </section>

      <ProductCarouselSection produtos={featuredProdutos} viewAllHref="/pt/produtos" />

      <CarouselSection
        title="Pins"
        items={pinItems}
        viewAllHref="/pt/pins"
      />

      <CarouselSection
        title="Posts"
        items={postItems}
        viewAllHref="/pt/artigos"
      />

      <TrendingSection />

      <section aria-label="Newsletter">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">Newsletter em breve.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
