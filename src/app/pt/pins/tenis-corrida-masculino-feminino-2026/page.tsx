"use client";

import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye } from "lucide-react";
import { pins } from "@/data/pins";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
}

export default function PinClient() {
  const pin = pins.find((p) => p.slug === "tenis-corrida-masculino-feminino-2026");
  const links: ShopeeLink[] = pin?.links || [];
  const shareUrl = "/pt/pins/tenis-corrida-masculino-feminino-2026";
  const visualizacoes = Math.floor(Math.random() * 8000) + 1500;

  return (
    <div className="min-h-screen">
      <div className="pt-20 md:pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/pins" className="hover:text-[#F4A7B9] transition-colors">
                Pins
              </LocaleAwareLink>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">Tênis de Corrida</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src="/images/pin2.png"
                alt="Tênis de Corrida Masculino e Feminino"
                width={800}
                height={450}
                className="w-full max-w-2xl mx-auto h-auto object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                <Eye className="h-3 w-3" />
                {visualizacoes.toLocaleString("pt-BR")}
              </span>
            </div>
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
                href={links[0]?.url || "https://s.shopee.com.br/3qLjBG86H9"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25"
              >
                🛒 Ver ofertas na Shopee
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Compartilhar</h2>
              <ShareButtons
                title="Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo"
                description="Selecionamos tênis de corrida masculinos e femininos que combinam conforto, performance e estilo."
                image="/images/pin2.png"
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
