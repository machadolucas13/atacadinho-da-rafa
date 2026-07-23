import { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import CategorySection from "@/components/pinterest/CategorySection";
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
  const artigos = await getArtigos("pt");
  const pins = await getPins("pt");

  const featuredPins = pins.filter((p) => p.destaque);
  const morePins = pins;
  const posts = artigos.slice(0, 6);

  return (
    <main className="min-h-screen">
      <HomeJsonLd locale="pt" pins={pins} />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/pt" }]} />

      <section aria-label="Hero">
        <HeroSection />
      </section>

      <section id="categorias" aria-label="Categorias">
        <CategorySection />
      </section>

      <section className="py-12 md:py-16" aria-label="Pins em destaque">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Pins em destaque
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list">
            {featuredPins.map((pin) => (
              <div key={pin.id} role="listitem">
                <PinCard key={pin.id} pin={pin} locale="pt" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16" aria-label="Mais pins">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Mais Pins
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list">
            {morePins.map((pin) => (
              <div key={pin.id} role="listitem">
                <PinCard key={pin.id} pin={pin} locale="pt" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16" aria-label="Posts">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Posts</h2>
            <p className="mt-1 text-sm text-gray-400">Conteúdo educativo e dicas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {posts.map((artigo) => (
              <div key={artigo.id} role="listitem">
                <ArtigoPinCard key={artigo.id} artigo={artigo} locale="pt" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Newsletter">
        <NewsletterForm locale="pt" />
      </section>
    </main>
  );
}
