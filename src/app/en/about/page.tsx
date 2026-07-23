import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Atacadinho da Rafa",
  description: "Discover the story behind Atacadinho da Rafa and our mission to find the best deals.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Our story
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Who is behind the finds?
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-2xl">
            Atacadinho da Rafa was born from an obsession to find good, beautiful, and cheap products online — and to share them with you who don't have time to keep searching.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#F4A7B9]">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The origin</h2>
            <p className="text-gray-300 leading-relaxed">
              It all started in 2024, when Rafa — tired of seeing people paying too much for things she found for a fraction of the price — decided to put the best finds in one place.
            </p>
            <p className="text-gray-300 leading-relaxed">
              What was a hobby became a lifelong project. Today, Atacadinho da Rafa is a weekly curation of the best products in fashion, decor, technology, beauty and much more.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our mission</h2>
            <p className="text-gray-300 leading-relaxed">
              We believe everyone deserves access to quality products without spending a fortune. That's why we only share what's really worth it — we test, compare prices, and bring it to you.
            </p>
            <p className="text-gray-300 leading-relaxed">
              No nonsense. No guessing. Just finds we approve.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">How it works</h2>
            <p className="text-gray-300 leading-relaxed">
              We publish content as pins and articles. Every product we recommend has an affiliate link — which means we may receive a commission if you buy through our link. <strong className="text-white">This does not increase the final price for you</strong>, on the contrary: we often get exclusive offers.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We work with the biggest platforms in Brazil: Shopee, Mercado Livre, Amazon and others. All links are verified and updated regularly.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our commitment to you</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>We only recommend products we would use ourselves</li>
              <li>Prices and availability are verified weekly</li>
              <li>We don't sell placements — it's all real curation</li>
              <li>Total transparency about affiliate links</li>
              <li>Respect for your privacy and experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
