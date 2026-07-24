import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import ShareButtons from "@/components/social/ShareButtons";
import { Eye } from "lucide-react";

interface ShopeeLink {
  nome: string;
  preco: string;
  url: string;
}

const links: ShopeeLink[] = [
  { nome: "Calça Jeans Bazar Brechó Usada", preco: "R$ 24,90", url: "https://s.shopee.com.br/4qEG7HYQVJ" },
  { nome: "Wide Leg Levanta Bumbum", preco: "R$ 29,90", url: "https://s.shopee.com.br/5fnN74lkgj" },
  { nome: "Cintura Alta com Lycra", preco: "R$ 36,90", url: "https://s.shopee.com.br/1Vxo9SwHGb" },
  { nome: "Preta Grafite Empina Bumbum", preco: "R$ 36,90", url: "https://s.shopee.com.br/4AyZKPbq6n" },
  { nome: "Jogger com Elástico", preco: "R$ 39,99", url: "https://s.shopee.com.br/8AUi5ohfoR" },
  { nome: "Flare Grafite Tendência", preco: "R$ 41,99", url: "https://s.shopee.com.br/LlqlV9Kxg" },
  { nome: "Preta com Lycra Empina Bumbum", preco: "R$ 44,99", url: "https://s.shopee.com.br/6VMU6mioLv" },
  { nome: "Flare Modeladora Levanta Bumbum", preco: "R$ 47,90", url: "https://s.shopee.com.br/9pcw59yz77" },
  { nome: "Cargo Grafite Super Tendência", preco: "R$ 48,59", url: "https://s.shopee.com.br/50XgKK36x0" },
];

export default function PinClient() {
  const shareUrl = "/pt/pins/calcaspromocaocalcas-jeans-femininas-economicas-2026";
  const visualizacoes = Math.floor(Math.random() * 8000) + 1500;

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
              <span className="text-gray-500">Calças Jeans Femininas</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <Image
                src="/posts/calcas-jeans-femininas-economicas-2026.png"
                alt="Calças Jeans Femininas a partir de R$ 24,90"
                width={1080}
                height={1920}
                className="w-full max-w-md mx-auto h-auto object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Calças Jeans Femininas a partir de R$ 24,90
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                <Eye className="h-3 w-3" />
                {visualizacoes.toLocaleString("pt-BR")}
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              20 modelos que empinam o bumbum: wide leg, flare, cargo, skinny e mais. Clica abaixo e confere os preços na Shopee!
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <LocaleAwareLink
                href="/pt/categorias/moda-feminina"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
              >
                👗 Moda Feminina
              </LocaleAwareLink>
              <a
                href="https://s.shopee.com.br/4qEG7HYQVJ"
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
                title="Calças Jeans Femininas a partir de R$ 24,90"
                description="20 modelos que empinam o bumbum: wide leg, flare, cargo, skinny e mais."
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
