import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Atacadinho da Rafa, a curated collection of finds, deals, and tips to help you discover great products.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">About Atacadinho da Rafa</h1>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          Atacadinho da Rafa is a curation and discovery site. Our goal is to cut through
          the noise and highlight what really matters among the endless products available
          online.
        </p>
        <p>
          Here you will find finds in fashion, home decor, technology, beauty, kitchen,
          and accessories — always focused on cost-benefit, usefulness, and quality.
        </p>
        <p>
          We also share practical tips for saving money, organizing your home, self-care,
          and earning extra income as an affiliate. All written in plain language, no fluff.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Who writes this</h2>
        <p>
          I&apos;m Rafa, the creator of Atacadinho da Rafa. I&apos;ve been working with
          product curation and useful content for years, and I built this space to help
          regular people find real deals and make better purchasing decisions — without
          wasting time or money.
        </p>
        <p>
          I believe you can live well while spending less, if you know how to choose.
          That&apos;s why every post here is built with research, testing, and real criteria.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Transparency</h2>
        <p>
          Some links on this site are affiliate links. This means that if you purchase
          through them, we may receive a commission at no extra cost to you. We only
          recommend products and services we believe are useful.
        </p>
        <p>
          See more on our{" "}
          <a className="text-[#F4A7B9] hover:underline" href="/en/disclosure">
            Disclosure
          </a>{" "}
          page.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Contact</h2>
        <p>
          Want to send a suggestion, partnership inquiry, or report something? Reach us
          through the{" "}
          <a className="text-[#F4A7B9] hover:underline" href="/en/contact">
            contact form
          </a>
          .
        </p>
      </div>
    </div>
  );
}
