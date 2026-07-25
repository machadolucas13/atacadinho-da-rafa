import { Metadata } from "next";
import Link from "next/link";
import { getPins } from "@/lib/pins";

export const metadata: Metadata = {
  title: "Pins - Atacadinho da Rafa",
  description: "Pins about fashion, beauty, decor and finds linking directly to the best offers.",
};

export default async function PinsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "en" ? "en" : "pt";
  const pins = await getPins(locale);

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F4A7B9]">
              📌 Pins
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Deal Pins
            </h1>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              Click and check the best curated finds directly on Shopee.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {pins.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-10 text-center">
            <p className="mt-2 text-xs text-gray-400">Coming soon: more pins here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
            {pins.map((pin) => (
              <Link key={pin.id} href={`/${locale}/pins/${pin.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 card-hover">
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
                    <img
                      src={pin.imagem}
                      alt={pin.titulo}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E11D48]/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        🔥 Featured
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-white line-clamp-2">
                        {pin.titulo}
                      </h3>
                      <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                        {pin.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
