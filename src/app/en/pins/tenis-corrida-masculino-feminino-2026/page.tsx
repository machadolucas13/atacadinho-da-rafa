import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { getPinBySlug, getPins } from "@/lib/pins";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
}

export default async function PinClient({ params }: { params: { slug: string } }) {
  const pin = await getPinBySlug(params.slug, "en");
  const links: ShopeeLink[] = pin?.links || [];
  const shareUrl = `/en/pins/${params.slug}`;
  const allPins = await getPins("en");
  const currentIndex = allPins.findIndex((p) => p.slug === params.slug);
  const prevPin = currentIndex > 0 ? allPins[currentIndex - 1] : null;
  const nextPin = currentIndex < allPins.length - 1 ? allPins[currentIndex + 1] : null;
  const visualizacoes = pin?.visualizacoes ?? Math.floor(Math.random() * 8000) + 1500;

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
              <span className="text-gray-500">Running Shoes</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src="/images/pin2.png"
                alt="Men's and Women's Running Shoes"
                width={800}
                height={450}
                className="w-full max-w-2xl mx-auto h-auto object-contain"
                priority
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Men's and Women's Running Shoes: best models to train in style
            </h1>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Selected running shoes for men and women that combine comfort, performance and style. There are options for beginners and also for those who have been running for years. Click below and check the prices on Shopee!
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href="/en/articles/workout-routine-for-women-to-lose-weight-tips-2026"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                💪 Workout tips for women
              </LocaleAwareLink>
              <LocaleAwareLink
                href="/en/categories/calcados"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                👟 Shoes
              </LocaleAwareLink>
              <a
                href={links[0]?.url || "https://s.shopee.com.br/3qLjBG86H9"}
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
                title="Men's and Women's Running Shoes: best models to train in style"
                description="Selected running shoes for men and women that combine comfort, performance and style."
                image="/images/pin2.png"
                url={shareUrl}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {links.map((item) => (
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
                <Link href="/en/articles/best-womens-jeans-under-50-deals-2026" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Best women's jeans under R$50</h4>
                  <p className="mt-1 text-xs text-gray-400">Curated styles that lift and shape, from wide leg to flare.</p>
                </Link>
                <Link href="/en/categories/calcados" className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4A7B9] hover:bg-white/10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4A7B9]">Best running shoes 2026</h4>
                  <p className="mt-1 text-xs text-gray-400">Full comparison of the most comfortable models with the best cost-benefit.</p>
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
