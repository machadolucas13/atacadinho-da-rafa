"use client";

import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";

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
  { nome: "Women's Black Jeans with Lycra Butt Lifter", preco: "R$ 44,99", url: "https://s.shopee.com.br/6VMU6mioLv" },
  { nome: "Flare Women's Jeans High Waist Modeling", preco: "R$ 47,90", url: "https://s.shopee.com.br/9pcw59yz77" },
  { nome: "Cargo Graphite Women's Jeans Butt Lifter", preco: "R$ 48,59", url: "https://s.shopee.com.br/50XgKK36x0" },
];

export default function PinClient() {
  const shareUrl = "/en/pins/best-womens-jeans-under-50-deals-2026";

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
            <p className="text-gray-300 mb-6">
              20 models that lift and shape: wide leg, flare, cargo, skinny and more. Click below and check the prices on Shopee!
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href="/en/categories/moda-feminina"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                👗Women's Fashion
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
