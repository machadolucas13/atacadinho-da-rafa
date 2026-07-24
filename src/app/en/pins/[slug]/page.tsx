import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { getPins } from "@/lib/pins";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
}

const links: ShopeeLink[] = [
  { nome: "Used Women's Jeans from Thrift Store", preco: "R$ 24,90", url: "https://s.shopee.com.br/4qEG7HYQVJ" },
  { nome: "Wide Leg Women's Jeans Butt Lifter", preco: "R$ 29,90", url: "https://s.shopee.com.br/5fnN74lkgj" },
  { nome: "Women's Jeans High Waist with Lycra", preco: "R$ 36,90", url: "https://s.shopee.com.br/1Vxo9SwHGb" },
  { nome: "Women's Black Graphite Jeans High Waist", preco: "R$ 36,90", url: "https://s.shopee.com.br/4AyZKPbq6n" },
  { nome: "Women's Jogger Jeans with Elastic", preco: "R$ 39,99", url: "https://s.shopee.com.br/8AUi5ohfoR" },
  { nome: "Flare Graphite Women's Jeans Butt Lifter", preco: "R$ 41,99", url: "https://s.shopee.com.br/LlqlV9Kxg" },
];

export default async function PinClient({ params }: { params: { slug: string } }) {
  const allPins = await getPins("en");
  const currentIndex = allPins.findIndex((p) => p.slug === params.slug);
  const prevPin = currentIndex > 0 ? allPins[currentIndex - 1] : null;
  const nextPin = currentIndex < allPins.length - 1 ? allPins[currentIndex + 1] : null;
  const shareUrl = `/en/pins/${params.slug}`;

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/pins" className="hover:text-[#F4A7B9] transition-colors">
                Pins
              </LocaleAwareLink>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">Best Women's Jeans</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src="/posts/calcas-jeans-femininas-economicas-2026.png"
                alt="Best Women's Jeans Under R$50"
                width={1080}
                height={1920}
                className="w-full max-w-md mx-auto h-auto object-contain"
                priority
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Best Women's Jeans Under R$50
            </h1>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              20 models that lift and shape: wide leg, flare, cargo, skinny and more. Click below and check the prices on Shopee!
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href="/en/categories/moda-feminina"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                👗 Women's Fashion
              </LocaleAwareLink>
              <a
                href="https://s.shopee.com.br/4qEG7HYQVJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
              >
                🛒 View deals on Shopee
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Share</h2>
              <ShareButtons
                title="Best Women's Jeans Under R$50"
                description="20 models that lift and shape: wide leg, flare, cargo, skinny and more."
                image="/posts/calcas-jeans-femininas-economicas-2026.png"
                url={shareUrl}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {links.slice(0, 6).map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#F4A7B9] hover:bg-white/10"
                >
                  <span className="text-sm font-semibold text-white line-clamp-1">{item.nome}</span>
                  <span className="text-sm font-bold text-[#FFD700] whitespace-nowrap ml-3">{item.preco}</span>
                </a>
              ))}
            </div>

            <div className="mt-12 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-[#F4A7B9]" />
                <h3 className="text-lg font-bold text-white">Posts that combine</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/en/articles/best-womens-jeans-guide-cuts-styles-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Jeans guide for women 2026</h4>
                  <p className="mt-1 text-xs text-gray-400">Discover the cuts that are trending and how to choose the ideal model for your body.</p>
                </Link>
                <Link href="/en/articles/how-to-build-capsule-wardrobe-budget-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Budget capsule wardrobe</h4>
                  <p className="mt-1 text-xs text-gray-400">Build a complete closet spending little, with timeless key pieces.</p>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-8">
              {prevPin ? (
                <LocaleAwareLink href={`/en/pins/${prevPin.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
                  <ArrowLeft className="h-4 w-4" />
                  {prevPin.titulo}
                </LocaleAwareLink>
              ) : (
                <div />
              )}
              {nextPin ? (
                <LocaleAwareLink href={`/en/pins/${nextPin.slug}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#F4A7B9] hover:text-[#F4A7B9]">
                  {nextPin.titulo}
                  <ArrowRight className="h-4 w-4" />
                </LocaleAwareLink>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
