import { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import TrendingSection from "@/components/pinterest/TrendingSection";
import CarouselSection from "@/components/pinterest/CarouselSection";
import ProductCarouselSection from "@/components/pinterest/ProductCarouselSection";
import CuponsSection from "@/components/layout/CuponsSection";
import NewsletterForm from "@/components/ui/NewsletterForm";
import TagBadge from "@/components/ui/TagBadge";
import AutoSeedCoupons from "@/components/layout/AutoSeedCoupons";
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
    .sort((a, b) => (b.publicadoEm || "").localeCompare(a.publicadoEm || ""))
    .slice(0, 4);

  const featuredPosts = artigos
    .slice()
    .sort((a, b) => {
      const da = typeof a.publicadoEm === "string" ? a.publicadoEm : a.publicadoEm.toISOString();
      const db = typeof b.publicadoEm === "string" ? b.publicadoEm : b.publicadoEm.toISOString();
      return db.localeCompare(da);
    })
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

  function isRecent(date: Date | string | undefined): boolean {
    if (!date) return false;
    const d = typeof date === "string" ? new Date(date) : date;
    const diff = Date.now() - d.getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }

  const postItems = featuredPosts.map((post) => {
    const statusTags = [];
    if (post.destaque) statusTags.push(<TagBadge key="hot" label="HOT" variant="hot" />);
    if (isRecent(post.publicadoEm)) statusTags.push(<TagBadge key="novo" label="NOVO" variant="new" />);

    return {
      id: post.slug,
      href: `/pt/artigos/${post.slug}`,
      imagem: post.imagemCapa || "/images/artigos/default.jpg",
      titulo: post.titulo,
      badge: statusTags.length > 0 ? (
        <div className="flex flex-col gap-1">
          {statusTags}
        </div>
      ) : post.categoria?.nome ? (
        <span className="inline-flex items-center rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm">
          {post.categoria.nome}
        </span>
      ) : undefined,
      meta: post.tempoLeitura ? (
        <span className="text-xs text-gray-400">{post.tempoLeitura} min de leitura</span>
      ) : undefined,
    };
  });

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

      <CuponsSection />

      <AutoSeedCoupons />

      <section aria-label="Newsletter">
        <NewsletterForm locale="pt" />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Atacadinho da Rafa",
            description: "Curadoria de achados especiais: moda, decoração, tecnologia e muito mais.",
            url: "https://atacadinhodarafa.com.br/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://atacadinhodarafa.com.br/pt/busca?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>
  );
}
