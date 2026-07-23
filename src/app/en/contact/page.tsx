import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Atacadinho da Rafa",
  description: "Get in touch with Atacadinho da Rafa. Questions, suggestions, partnerships or feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Talk to us
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contact
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-2xl">
            Questions, suggestions, partnerships or feedback? We're here to listen to you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Email</h2>
            <p className="mt-2 text-gray-300">
              For questions, suggestions or partnerships, send an email to:
            </p>
            <a
              href="mailto:contato@atacadinhodarafa.com.br"
              className="mt-4 inline-flex items-center gap-2 text-[#F4A7B9] font-medium hover:text-white transition-colors"
            >
              contato@atacadinhodarafa.com.br
            </a>
            <p className="mt-4 text-sm text-gray-400">
              We respond within 48 business hours.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Social media</h2>
            <p className="mt-2 text-gray-300">
              Follow our daily finds on Instagram:
            </p>
            <a
              href="https://instagram.com/atacadinhodarafa"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[#F4A7B9] font-medium hover:text-white transition-colors"
            >
              @atacadinhodarafa
            </a>
            <p className="mt-4 text-sm text-gray-400">
              Stories, reels and exclusive promotions every day.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white">Partnerships</h2>
          <p className="mt-2 text-gray-300">
            If you represent a brand, store or platform and want to propose a partnership, contact us by email above with the subject "Partnership". We love meeting new brands and bringing the best products to our community.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white">Product suggestions</h2>
          <p className="mt-2 text-gray-300">
            Have a product you love and want us to test? Send it to us! We love receiving recommendations from the community. If the product is approved in our curation, it will appear here on the site.
          </p>
        </div>
      </div>
    </div>
  );
}
