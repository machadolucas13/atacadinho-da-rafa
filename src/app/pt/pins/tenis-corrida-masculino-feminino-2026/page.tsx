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
  { nome: "Tênis New Balance 530 Feminino Original Casual Retrô Conforto Academia Caminhada Dia a Dia Leve", preco: "R$ 591,40", url: "https://s.shopee.com.br/3qLjBG86H9" },
  { nome: "Tênis Feminino New Balance 530 Esportivo Casual Respirável Solado Robusto Confortável Original", preco: "R$ 572,91", url: "https://s.shopee.com.br/9KgfjTaZXr" },
  { nome: "Tênis New Balance Fresh Foam Arishi V4 Feminino Original com Nota Fiscal e Garantia", preco: "R$ 345,21", url: "https://s.shopee.com.br/Llr11YRzl" },
  { nome: "Tenis Mizuno Space 5 Menina", preco: "R$ 270", url: "https://s.shopee.com.br/6L34A8VJTY" },
  { nome: "Tênis Fila Recovery Feminino Bege Leve Macio Caminhada Academia Casual", preco: "R$ 287,96", url: "https://s.shopee.com.br/2qTBzji6XE" },
  { nome: "Tênis Fila Progress Lite Feminino Bege Caminhada Original Mulher Confortável Macio Corrida", preco: "R$ 306", url: "https://s.shopee.com.br/7KvbM3lce0" },
  { nome: "Tenis Fila Runner 2K Feminino Lifestyle Casual Confortavel", preco: "R$ 368,90", url: "https://s.shopee.com.br/30mcCAubGI" },
  { nome: "Tênis Adidas Supernova Comfortglide Feminino Corrida", preco: "R$ 619", url: "https://s.shopee.com.br/8fQywf3JEO" },
  { nome: "Tênis New Balance Feminino Fresh Foam X 1080v14", preco: "R$ 736", url: "https://s.shopee.com.br/30mcCHSKuu" },
  { nome: "Tênis New Balance Fuelcell Rebel V5 Feminino - Rosa Neo/Rosa", preco: "R$ 894", url: "https://s.shopee.com.br/50Xga2wIew" },
  { nome: "Tênis Mizuno Wave Creation 26 Feminino Original com Nota Fiscal e Garantia", preco: "R$ 511,71", url: "https://s.shopee.com.br/9Kgfk4a3y9" },
  { nome: "Tênis Olympikus Swift 5 Feminino Cinza e Rosa", preco: "R$ 315", url: "https://s.shopee.com.br/1qaeoLRWiJ" },
  { nome: "Tenis Fila Maxxi Lite Feminino Caminhada Corrida Treinos Academia Confortável e Macio", preco: "R$ 277", url: "https://s.shopee.com.br/190d12lth" },
  { nome: "Tênis Adidas Latin Run 3.0 Feminino", preco: "R$ 374", url: "https://s.shopee.com.br/1qaeoQK91n" },
  { nome: "Tênis Feminino de Academia para Musculação Treino Funcional Caminhada Corrida e Uso Diário", preco: "R$ 49", url: "https://s.shopee.com.br/2BDVD8Z0sq" },
  { nome: "Tênis Feminino Esportivo Axion Estiloso Moderno Treino Academia Corrida Caminhada", preco: "R$ 69,99", url: "https://s.shopee.com.br/9zwMXZza4G" },
  { nome: "Tênis Feminino Esportivo Academia Caminhada Leve Confortável Dia a Dia Treino", preco: "R$ 106", url: "https://s.shopee.com.br/3g2Izz0TrF" },
];

export default function PinClient() {
  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/pt/pins" className="hover:text-[#F4A7B9] transition-colors">
                Pins
              </LocaleAwareLink>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">Tênis de Corrida</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src="/images/pin2.png"
                alt="Tênis de Corrida Masculino e Feminino"
                width={1200}
                height={675}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo
            </h1>
            <p className="text-gray-300 mb-6">
              Selecionamos tênis de corrida masculinos e femininos que combinam conforto, Performance e estilo. Tem opções para iniciantes e também para quem já corre há anos. Clica abaixo e confere os preços na Shopee!
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href="/pt/artigos/rotina-treino-feminino-perder-peso-dicas-2026"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                💪 Dicas de treino para mulheres
              </LocaleAwareLink>
              <LocaleAwareLink
                href="/pt/categorias/calcados"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                👟 Calçados
              </LocaleAwareLink>
              <a
                href={links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
              >
                🛒 Ver ofertas na Shopee
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
