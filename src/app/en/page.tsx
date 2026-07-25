import { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import TrendingSection from "@/components/pinterest/TrendingSection";
import CarouselSection from "@/components/pinterest/CarouselSection";
import ProductCarouselSection from "@/components/pinterest/ProductCarouselSection";
import CuponsSection from "@/components/layout/CuponsSection";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { getArtigos } from "@/lib/artigos";
import { getPins } from "@/lib/pins";
import { getProdutos } from "@/lib/produtos";
import { getItemViews } from "@/lib/views";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://atacadinhodarafa.com.br"),
    title: {
      default: "Atacadinho da Rafa - Finds, Deals and Recommendations",
      template: "%s | Atacadinho da Rafa",
    },
    description:
      "Discover the best finds, deals and recommendations. Visual curation of fashion, home, tech and beauty.",
    keywords: [
      "finds",
      "deals",
      "recommendations",
      "products",
      "fashion",
      "home decor",
      "tech",
      "beauty",
      "shopee",
      "savings",
    ],
    alternates: {
      canonical: "/en",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://atacadinhodarafa.com.br/en",
      siteName: "Atacadinho da Rafa",
      title: "Atacadinho da Rafa - Finds, Deals and Recommendations",
      description:
        "Discover the best finds, deals and recommendations. Visual curation of fashion, home, tech and beauty.",
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
      description: "Discover the best finds and deals",
      images: ["https://atacadinhodarafa.com.br/assets/images/og-home.jpg"],
    },
  };
}

export default async function HomePage() {
  const [artigos, pins, produtos] = await Promise.all([
    getArtigos("en"),
    getPins("en"),
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
    href: `/en/pins/${pin.slug}`,
    imagem: pin.imagem,
    titulo: pin.titulo,
    badge: (
      <span className="inline-flex items-center rounded-full bg-[#E11D48]/90 px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        🔥 Featured
      </span>
    ),
  }));

  const postItems = featuredPosts.map((post) => ({
    id: post.slug,
    href: `/en/articles/${post.slug}`,
    imagem: post.imagemCapa || "/images/artigos/default.jpg",
    titulo: post.titulo,
    badge: post.categoria?.nome ? (
      <span className="inline-flex items-center rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm">
        {post.categoria.nome}
      </span>
    ) : undefined,
    meta: post.tempoLeitura ? (
      <span className="text-xs text-gray-400">{post.tempoLeitura} min read</span>
    ) : undefined,
  }));

  return (
    <main className="relative z-10 min-h-screen">
      <section aria-label="Hero">
        <HeroSection />
      </section>

      <ProductCarouselSection produtos={featuredProdutos} viewAllHref="/en/produtos" />

      <CarouselSection
        title="Pins"
        items={pinItems}
        viewAllHref="/en/pins"
        locale="en"
      />

      <CarouselSection
        title="Articles"
        items={postItems}
        viewAllHref="/en/articles"
        locale="en"
      />

      <TrendingSection />

      <CuponsSection />

      <section aria-label="Newsletter">
        <NewsletterForm locale="en" />
      </section>
    </main>
  );
}
