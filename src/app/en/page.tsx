import { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import CategorySection from "@/components/pinterest/CategorySection";
import { getArtigos } from "@/lib/artigos";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import NewsletterForm from "@/components/ui/NewsletterForm";
import InstallPrompt from "@/components/pwa/InstallPrompt";

export const metadata: Metadata = {
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
};

export default async function HomePage() {
  const artigos = await getArtigos("en");

  const featured = artigos.filter((a) => a.destaque).slice(0, 3);
  const trending = artigos.filter((a) => !a.destaque).slice(0, 3);

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="relative">
        <CategorySection />

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              ✨ Featured finds
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              The best curated picks for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featured.length ? featured : artigos.slice(0, 3)).map((artigo) => (
              <ArtigoPinCard key={artigo.id} artigo={artigo} locale="en" />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              🔥 Trending now
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(trending.length ? trending : artigos.slice(3, 6)).map((artigo) => (
              <ArtigoPinCard key={artigo.id} artigo={artigo} locale="en" />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E11D48]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#F4A7B9] border border-[#E11D48]/20">
                  📌 Featured pin
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Women&apos;s Jeans from R$ 24,90
                </h2>
                <p className="mt-2 text-gray-300 text-sm md:text-base">
                  20 models that lift and shape: wide leg, flare, cargo, skinny and more.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <LocaleAwareLink
                    href="/en/pins/best-womens-jeans-under-50-deals-2026"
                    className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
                  >
                    View pin
                  </LocaleAwareLink>
                  <LocaleAwareLink
                    href="/en/categories/womens-fashion"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
                  >
                    👗 Women&apos;s Fashion
                  </LocaleAwareLink>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
                <img
                  src="/posts/calcas-jeans-femininas-economicas-2026.png"
                  alt="Women's Jeans from R$ 24,90"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <NewsletterForm locale="en" />
      </div>

      <footer className="relative z-10 border-t border-white/10 bg-[#0a0a14]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Atacadinho da Rafa. All rights reserved.
        </div>
      </footer>

      <InstallPrompt />
    </div>
  );
}
