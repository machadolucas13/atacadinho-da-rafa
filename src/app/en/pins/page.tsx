import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pins - Atacadinho da Rafa",
  description: "Pins about fashion, beauty, decor and finds linking directly to the best offers.",
};

export default async function PinsPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4A7B9]">
              📌 Pins
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Deal pins
            </h1>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              Click and check the best curated finds directly on Shopee.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          <Link
            href={`/${params.locale}/pins/best-womens-jeans-under-50-deals-2026`}
            className="group block"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover">
              <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
                <img
                  src="/posts/calcas-jeans-femininas-economicas-2026.png"
                  alt="Best Women's Jeans Under R$50"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                    🔥 Featured
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white line-clamp-2">
                    Best Women's Jeans Under R$50
                  </h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    20 models that lift and shape: wide leg, flare, cargo, skinny and more.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href={`/${params.locale}/pins/tenis-corrida-masculino-feminino-2026`}
            className="group block"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover">
              <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
                <img
                  src="/images/pin2.png"
                  alt="Men's and Women's Running Shoes"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                    🔥 Featured
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white line-clamp-2">
                    Men's and Women's Running Shoes: best models to train in style
                  </h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    Selected running shoes for men and women that combine comfort, performance and style.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}