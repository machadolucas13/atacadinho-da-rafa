import { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import CategorySection from "@/components/pinterest/CategorySection";
import TrendingSection from "@/components/pinterest/TrendingSection";
import { getArtigos } from "@/lib/artigos";
import { getPins } from "@/lib/pins";
import PinCard from "@/components/pinterest/PinCard";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";
import NewsletterForm from "@/components/ui/NewsletterForm";
import HomeJsonLd from "@/components/seo/HomeJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

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
  const [artigos, pins] = await Promise.all([
    getArtigos("en"),
    getPins("en"),
  ]);

  const posts = artigos.slice(0, 6);

  return (
    <main className="min-h-screen">
      <HomeJsonLd locale="en" pins={pins} />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/en" }]} />

      <section aria-label="Hero">
        <HeroSection />
      </section>

      <section id="categorias" aria-label="Categories">
        <CategorySection />
      </section>

      <section className="py-12 md:py-16" aria-label="Pins">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Pins
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pins.map((pin) => (
              <div key={pin.id}>
                <PinCard pin={pin} locale="en" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16" aria-label="Articles">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Articles</h2>
            <p className="mt-1 text-sm text-gray-400">Educational content and tips</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((artigo) => (
              <ArtigoPinCard key={artigo.id} artigo={artigo} locale="en" />
            ))}
          </div>
        </div>
      </section>

      <TrendingSection />

      <section aria-label="Newsletter">
        <NewsletterForm locale="en" />
      </section>
    </main>
  );
}
