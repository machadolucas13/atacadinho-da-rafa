"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Clock, Tag, Flame, Check } from "lucide-react";

interface Cupom {
  id: string;
  marketplace: string;
  marketplaceColor: string;
  codigo: string;
  descricao: string;
  validade?: string;
  url: string;
  atualizadoEm?: string;
}

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

const TODOS_CUPONS: Cupom[] = [
  {
    id: "ml-1",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    codigo: "MLBRASIL10",
    descricao: "R$ 10 OFF em compras acima de R$ 50",
    url: "https://www.mercadolivre.com.br",
    validade: "2026-08-31",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "ml-2",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    codigo: "OFERTAML20",
    descricao: "20% OFF em smartphones selecionados",
    url: "https://www.mercadolivre.com.br",
    validade: "2026-08-25",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "ml-3",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    codigo: "FRETEGRATIS",
    descricao: "Frete grátis em todo o Brasil",
    url: "https://www.mercadolivre.com.br",
    validade: "2026-09-15",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "ml-4",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    codigo: "DESCONTO15",
    descricao: "15% OFF em calçados",
    url: "https://www.mercadolivre.com.br",
    validade: "2026-08-20",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "ml-5",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    codigo: "ELETRO25",
    descricao: "25% OFF em eletrodomésticos",
    url: "https://www.mercadolivre.com.br",
    validade: "2026-08-18",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shopee-1",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "FREEGRÁTIS",
    descricao: "Frete grátis em pedidos acima de R$ 29",
    url: "https://shopee.com.br",
    validade: "2026-09-01",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shopee-2",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "SHOPEE30",
    descricao: "30% OFF na primeira compra",
    url: "https://shopee.com.br",
    validade: "2026-08-30",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shopee-3",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "DESCONTO10",
    descricao: "R$ 10 OFF em moda feminina",
    url: "https://shopee.com.br",
    validade: "2026-08-28",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shopee-4",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "FIESTA15",
    descricao: "15% OFF em produtos para casa",
    url: "https://shopee.com.br",
    validade: "2026-09-05",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shopee-5",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "CASHBACK20",
    descricao: "20% de cashback em eletrônicos",
    url: "https://shopee.com.br",
    validade: "2026-09-10",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "amazon-1",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    codigo: "ECONOMIZE20",
    descricao: "20% OFF em produtos selecionados",
    url: "https://www.amazon.com.br",
    validade: "2026-08-22",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "amazon-2",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    codigo: "PRIME15",
    descricao: "15% OFF para membros Prime",
    url: "https://www.amazon.com.br",
    validade: "2026-09-01",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "amazon-3",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    codigo: "LIVRO10",
    descricao: "10% OFF em livros",
    url: "https://www.amazon.com.br",
    validade: "2026-08-25",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "amazon-4",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    codigo: "TECNOLOGY25",
    descricao: "25% OFF em tecnologia",
    url: "https://www.amazon.com.br",
    validade: "2026-08-18",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "amazon-5",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    codigo: "CASA15",
    descricao: "15% OFF em casa e decoração",
    url: "https://www.amazon.com.br",
    validade: "2026-09-08",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shein-1",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    codigo: "SHEIN15",
    descricao: "15% OFF na primeira compra",
    url: "https://www.shein.com.br",
    validade: "2026-08-20",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shein-2",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    codigo: "MODA20",
    descricao: "20% OFF em roupas femininas",
    url: "https://www.shein.com.br",
    validade: "2026-08-28",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shein-3",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    codigo: "SHEINMALE10",
    descricao: "10% OFF em moda masculina",
    url: "https://www.shein.com.br",
    validade: "2026-09-02",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shein-4",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    codigo: "HOME25",
    descricao: "25% OFF em casa e decoração",
    url: "https://www.shein.com.br",
    validade: "2026-08-15",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "shein-5",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    codigo: "ACESSORIOS15",
    descricao: "15% OFF em acessórios",
    url: "https://www.shein.com.br",
    validade: "2026-09-12",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "magalu-1",
    marketplace: "Magazine Luiza",
    marketplaceColor: "#00b2e1",
    codigo: "MAGALU5",
    descricao: "5% OFF em eletrodomésticos",
    url: "https://www.magazineluiza.com.br",
    validade: "2026-08-30",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "magalu-2",
    marketplace: "Magazine Luiza",
    marketplaceColor: "#00b2e1",
    codigo: "CELULAR10",
    descricao: "10% OFF em celulares",
    url: "https://www.magazineluiza.com.br",
    validade: "2026-08-25",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "magalu-3",
    marketplace: "Magazine Luiza",
    marketplaceColor: "#00b2e1",
    codigo: "NOTEBOOK15",
    descricao: "15% OFF em notebooks",
    url: "https://www.magazineluiza.com.br",
    validade: "2026-09-05",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "magalu-4",
    marketplace: "Magazine Luiza",
    marketplaceColor: "#00b2e1",
    codigo: "TV20",
    descricao: "20% OFF em TVs",
    url: "https://www.magazineluiza.com.br",
    validade: "2026-08-22",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "magalu-5",
    marketplace: "Magazine Luiza",
    marketplaceColor: "#00b2e1",
    codigo: "GELADEIRA12",
    descricao: "12% OFF em geladeiras",
    url: "https://www.magazineluiza.com.br",
    validade: "2026-09-10",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "kabum-1",
    marketplace: "Kabum",
    marketplaceColor: "#ff6600",
    codigo: "KABUM10",
    descricao: "10% OFF em informática",
    url: "https://www.kabum.com.br",
    validade: "2026-08-28",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "kabum-2",
    marketplace: "Kabum",
    marketplaceColor: "#ff6600",
    codigo: "PERIFERICOS15",
    descricao: "15% OFF em periféricos",
    url: "https://www.kabum.com.br",
    validade: "2026-09-01",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "kabum-3",
    marketplace: "Kabum",
    marketplaceColor: "#ff6600",
    codigo: "HARDWARE20",
    descricao: "20% OFF em hardware",
    url: "https://www.kabum.com.br",
    validade: "2026-08-20",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "kabum-4",
    marketplace: "Kabum",
    marketplaceColor: "#ff6600",
    codigo: "GAMER15",
    descricao: "15% OFF em produtos gamer",
    url: "https://www.kabum.com.br",
    validade: "2026-09-15",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "kabum-5",
    marketplace: "Kabum",
    marketplaceColor: "#ff6600",
    codigo: "SMART25",
    descricao: "25% OFF em smartphones",
    url: "https://www.kabum.com.br",
    validade: "2026-08-18",
    atualizadoEm: new Date().toISOString(),
  },
];

function useRotatingCoupons(cupons: Cupom[], displayCount = 5) {
  const [visible, setVisible] = useState<Cupom[]>([]);

  const rotate = useCallback(() => {
    setVisible((prev) => {
      const rotated = [...prev].sort(() => Math.random() - 0.5);
      return rotated.slice(0, displayCount);
    });
  }, [displayCount]);

  useEffect(() => {
    const shuffled = [...cupons].sort(() => Math.random() - 0.5);
    setVisible(shuffled.slice(0, displayCount));
  }, [cupons, displayCount]);

  useEffect(() => {
    const interval = setInterval(rotate, 1000 * 60 * 30);
    return () => clearInterval(interval);
  }, [rotate]);

  return { visible, rotate };
}

export default function CuponsSection() {
  const { visible, rotate } = useRotatingCoupons(TODOS_CUPONS, 5);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fallbackMsg, setFallbackMsg] = useState<string | null>(null);

  const copiar = async (cupom: Cupom) => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(cupom.codigo);
      ok = true;
    } catch {
      ok = false;
    }

    if (ok) {
      setCopiedId(cupom.id);
      setFallbackMsg("Não funcionou? Já acabou 😅 Pega outro!");
      setTimeout(() => {
        setCopiedId(null);
        setFallbackMsg(null);
      }, 2500);
    } else {
      setCopiedId(null);
      setFallbackMsg("Não funcionou? Já acabou 😅 Pega outro!");
      setTimeout(() => setFallbackMsg(null), 3000);
    }
  };

  if (TODOS_CUPONS.length === 0) {
    return null;
  }

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visible.map((cupom) => {
            const isMercadoLivre = cupom.marketplace === "Mercado Livre";
            const cardBg = "bg-white/5 text-white";
            const codeBg = "bg-black/20";
            const codeTextColor = "text-white";
            const borderClass = "border-white/10";

            return (
              <div
                key={cupom.id}
                className={`flex flex-col rounded-2xl border ${borderClass} ${cardBg} p-4 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <div
                     className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold ${isMercadoLivre ? "text-black" : "text-white"}`}
                     style={{ backgroundColor: cupom.marketplaceColor }}
                  >
                     <Tag className="h-3 w-3" />
                     {cupom.marketplace}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                    <Clock className="h-3 w-3" />
                    {tempoRelativo(cupom.atualizadoEm)}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-xs leading-relaxed text-gray-300">
                    {cupom.descricao}
                  </p>
                </div>

                <div className={`mt-3 rounded-xl border p-2 text-center border-white/10 ${codeBg}`}>
                  <p className="text-[11px] text-gray-400">Código</p>
                  <p className={`mt-1 text-sm font-bold tracking-wide ${codeTextColor}`}>
                    {cupom.codigo}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copiar(cupom)}
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white px-3 py-2 text-xs font-semibold transition-all"
                  >
                    {copiedId === cupom.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedId === cupom.id ? "Copiado!" : "Copiar"}
                  </button>
                  <Link
                    href={cupom.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#E11D48] px-3 py-2 text-xs font-bold text-white transition-all hover:bg-[#be123c]"
                  >
                    Ver Ofertas
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {fallbackMsg && (
                  <div className="mt-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-center text-[10px] font-medium text-gray-300">
                    {fallbackMsg}
                  </div>
                )}

                {cupom.validade && (
                  <p className="mt-2 text-center text-[10px] text-gray-500">
                    Válido até {new Date(cupom.validade).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
