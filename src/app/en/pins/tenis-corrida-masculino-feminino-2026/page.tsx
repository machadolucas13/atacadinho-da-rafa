"use client";

import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
}

const links: ShopeeLink[] = [
  { nome: "New Balance 530 Women's Original Casual Retro Comfort Gym Walking Everyday Light", preco: "R$ 591,40", url: "https://s.shopee.com.br/3qLjBG86H9" },
  { nome: "Women's New Balance 530 Sporty Casual Breathable Robust Comfortable Original", preco: "R$ 572,91", url: "https://s.shopee.com.br/9KgfjTaZXr" },
  { nome: "New Balance Fresh Foam Arishi V4 Women's Original with Invoice and Warranty", preco: "R$ 345,21", url: "https://s.shopee.com.br/Llr11YRzl" },
  { nome: "Mizuno Space 5 Kids Shoes", preco: "R$ 270", url: "https://s.shopee.com.br/6L34A8VJTY" },
  { nome: "Fila Recovery Women's Beige Light Soft Walking Gym Casual", preco: "R$ 287,96", url: "https://s.shopee.com.br/2qTBzji6XE" },
  { nome: "Fila Progress Lite Women's Beige Walking Original Woman Comfortable Soft Running", preco: "R$ 306", url: "https://s.shopee.com.br/7KvbM3lce0" },
  { nome: "Fila Runner 2K Women's Lifestyle Casual Comfortable", preco: "R$ 368,90", url: "https://s.shopee.com.br/30mcCAubGI" },
  { nome: "Adidas Supernova Comfortglide Women's Running", preco: "R$ 619", url: "https://s.shopee.com.br/8fQywf3JEO" },
  { nome: "New Balance Women's Fresh Foam X 1080v14", preco: "R$ 736", url: "https://s.shopee.com.br/30mcCHSKuu" },
  { nome: "New Balance Fuelcell Rebel V5 Women's - Pink Neo/Pink", preco: "R$ 894", url: "https://s.shopee.com.br/50Xga2wIew" },
  { nome: "Mizuno Wave Creation 26 Women's Original with Invoice and Warranty", preco: "R$ 511,71", url: "https://s.shopee.com.br/9Kgfk4a3y9" },
  { nome: "Olympikus Swift 5 Women's Grey and Pink", preco: "R$ 315", url: "https://s.shopee.com.br/1qaeoLRWiJ" },
  { nome: "Fila Maxxi Lite Women's Walking Running Gym Training Academy Comfortable and Soft", preco: "R$ 277", url: "https://s.shopee.com.br/190d12lth" },
  { nome: "Adidas Latin Run 3.0 Women's", preco: "R$ 374", url: "https://s.shopee.com.br/1qaeoQK91n" },
  { nome: "Women's Gym Shoes for Bodybuilding Functional Training Walking Running Daily Use", preco: "R$ 49", url: "https://s.shopee.com.br/2BDVD8Z0sq" },
  { nome: "Women's Sporty Gym Shoes Walking Light Comfortable Everyday Training", preco: "R$ 69,99", url: "https://s.shopee.com.br/9zwMXZza4G" },
  { nome: "Women's Sporty Academy Walking Light Comfortable Everyday Training", preco: "R$ 106", url: "https://s.shopee.com.br/3g2Izz0TrF" },
];

export default function PinClient() {
  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/en/pins" className="hover:text-[#F4A7B9] transition-colors">
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
            <p className="text-gray-300 mb-6">
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
                href={links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
              >
                🛒 View deals on Shopee
              </a>
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
