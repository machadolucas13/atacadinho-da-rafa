"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Clock, Tag, Flame } from "lucide-react";

interface Cupom {
  id: string;
  marketplace: string;
  marketplaceColor: string;
  codigo: string;
  descricao: string;
  validade?: string;
  link: string;
  atualizadoEm?: string;
}

const cuponsDemo: Cupom[] = [
  {
    id: "shopee-1",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "FREEGRÁTIS10",
    descricao: "Frete grátis em pedidos acima de R$ 29",
    validade: "2026-08-31",
    link: "https://shopee.com.br",
    atualizadoEm: "2026-07-24T21:30:00-03:00",
  },
  {
    id: "amazon-1",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    codigo: "ECONOMIZE20",
    descricao: "20% OFF em smartphones selecionados",
    validade: "2026-08-15",
    link: "https://amazon.com.br",
    atualizadoEm: "2026-07-24T20:15:00-03:00",
  },
  {
    id: "ml-1",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    codigo: "OFERTAML10",
    descricao: "R$ 10 OFF em compras acima de R$ 50",
    validade: "2026-08-20",
    link: "https://mercadolivre.com.br",
    atualizadoEm: "2026-07-24T19:45:00-03:00",
  },
  {
    id: "shein-1",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    codigo: "MODA15",
    descricao: "15% OFF na primeira compra",
    validade: "2026-12-31",
    link: "https://shein.com.br",
    atualizadoEm: "2026-07-24T18:00:00-03:00",
  },
  {
    id: "shopee-2",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "ELETRO25",
    descricao: "25% OFF em eletrodomésticos",
    validade: "2026-08-10",
    link: "https://shopee.com.br",
    atualizadoEm: "2026-07-24T17:20:00-03:00",
  },
];

function tempoRelativo(iso?: string) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const minutos = Math.floor(diff / 60000);
  if (minutos < 1) return "agora mesmo";
  if (minutos < 60) return `há ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas}h`;
  const dias = Math.floor(horas / 24);
  return `há ${dias}d`;
}

export default function CuponsSection() {
  const [copiado, setCopiado] = useState<string | null>(null);

  const copiar = async (codigo: string) => {
    await navigator.clipboard.writeText(codigo);
    setCopiado(codigo);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <section className="py-8 md:py-12" aria-label="Cupons do Dia">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            <span className="inline-flex items-center gap-2">
              <Flame className="h-5 w-5 text-[#F67C6F]" />
              Cupons do Dia
            </span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {cuponsDemo.map((cupom) => (
            <div
              key={cupom.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-white"
                  style={{ backgroundColor: cupom.marketplaceColor }}
                >
                  <Tag className="h-3 w-3" />
                  {cupom.marketplace}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
                  <Clock className="h-3 w-3" />
                  {tempoRelativo(cupom.atualizadoEm)}
                </span>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {cupom.descricao}
                </p>
              </div>

              <div className="mt-3 rounded-xl border border-dashed border-white/10 bg-black/20 p-2 text-center">
                <p className="text-[11px] text-gray-400">Código</p>
                <p className="mt-1 text-sm font-bold tracking-wide text-white">
                  {cupom.codigo}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copiar(cupom.codigo)}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-white/10"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiado === cupom.codigo ? "Copiado!" : "Copiar"}
                </button>
                <Link
                  href={cupom.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#E11D48] px-3 py-2 text-xs font-bold text-white transition-all hover:bg-[#be123c]"
                >
                  Ver Ofertas
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {cupom.validade && (
                <p className="mt-2 text-center text-[10px] text-gray-500">
                  Válido até {new Date(cupom.validade).toLocaleDateString("pt-BR")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
