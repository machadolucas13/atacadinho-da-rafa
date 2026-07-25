"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Clock, Tag, Flame } from "lucide-react";

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

export default function CuponsSection() {
  const [visibleCoupons, setVisibleCoupons] = useState<Cupom[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch("/api/cupons");
        const data = await res.json();
        const all = data.cupons || [];
        if (all.length > 0) {
          const shuffled = [...all].sort(() => Math.random() - 0.5);
          setVisibleCoupons(shuffled.slice(0, 5));
        } else {
          const fallback = getFallbackCoupons();
          const shuffled = [...fallback].sort(() => Math.random() - 0.5);
          setVisibleCoupons(shuffled.slice(0, 5));
        }
      } catch (e) {
        console.error("Erro ao carregar cupons", e);
        const fallback = getFallbackCoupons();
        const shuffled = [...fallback].sort(() => Math.random() - 0.5);
        setVisibleCoupons(shuffled.slice(0, 5));
      }
    };

    carregar();
    const interval = setInterval(() => {
      setVisibleCoupons((prev) => {
        const rotated = [...prev].sort(() => Math.random() - 0.5);
        return rotated.slice(0, 5);
      });
    }, 1000 * 60 * 30);
    return () => clearInterval(interval);
  }, []);

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
          {visibleCoupons.map((cupom) => {
            const isLightMarketplace = cupom.marketplace === "Amazon" || cupom.marketplace === "Mercado Livre";
            const badgeTextColor = isLightMarketplace ? "text-black" : "text-white";
            const cardBg = isLightMarketplace ? "bg-white/90 text-black" : "bg-white/5 text-white";
            const codeBg = isLightMarketplace ? "bg-black/10" : "bg-black/20";
            const codeTextColor = isLightMarketplace ? "text-black" : "text-white";

            return (
              <div
                key={cupom.id}
                className={`flex flex-col rounded-2xl border ${isLightMarketplace ? "border-black/10" : "border-white/10"} ${cardBg} p-4 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold ${badgeTextColor}`}
                    style={{ backgroundColor: cupom.marketplaceColor }}
                  >
                    <Tag className="h-3 w-3" />
                    {cupom.marketplace}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                    <Clock className="h-3 w-3" />
                    {tempoRelativo(cupom.atualizadoEm)}
                  </span>
                </div>

                <div className="mt-3">
                  <p className={`text-xs leading-relaxed ${isLightMarketplace ? "text-gray-800" : "text-gray-300"}`}>
                    {cupom.descricao}
                  </p>
                </div>

                <div className={`mt-3 rounded-xl border ${isLightMarketplace ? "border-black/10" : "border-white/10"} ${codeBg} p-2 text-center`}>
                  <p className={`text-[11px] ${isLightMarketplace ? "text-gray-600" : "text-gray-400"}`}>Código</p>
                  <p className={`mt-1 text-sm font-bold tracking-wide ${codeTextColor}`}>
                    {cupom.codigo}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copiar(cupom.codigo)}
                    className={`flex-1 inline-flex items-center justify-center gap-1 rounded-xl border ${isLightMarketplace ? "border-black/10 bg-black/5 hover:bg-black/10 text-black" : "border-white/10 bg-white/5 hover:bg-white/10 text-white"} px-3 py-2 text-xs font-semibold transition-all`}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied === cupom.codigo ? "Copiado!" : "Copiar"}
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

                {cupom.validade && (
                  <p className={`mt-2 text-center text-[10px] ${isLightMarketplace ? "text-gray-600" : "text-gray-500"}`}>
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

function getFallbackCoupons(): Cupom[] {
  return [
    {
      id: "shopee-fallback-1",
      marketplace: "Shopee",
      marketplaceColor: "#ee4d2d",
      codigo: "FREEGRÁTIS",
      descricao: "Frete grátis em pedidos acima de R$ 29",
      url: "https://shopee.com.br",
      validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      atualizadoEm: new Date().toISOString(),
    },
    {
      id: "amazon-fallback-1",
      marketplace: "Amazon",
      marketplaceColor: "#232f3e",
      codigo: "ECONOMIZE20",
      descricao: "20% OFF em produtos selecionados",
      url: "https://www.amazon.com.br",
      validade: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      atualizadoEm: new Date().toISOString(),
    },
    {
      id: "ml-fallback-1",
      marketplace: "Mercado Livre",
      marketplaceColor: "#fff159",
      codigo: "OFERTAML10",
      descricao: "R$ 10 OFF em compras acima de R$ 50",
      url: "https://www.mercadolivre.com.br",
      validade: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      atualizadoEm: new Date().toISOString(),
    },
    {
      id: "shein-fallback-1",
      marketplace: "SHEIN",
      marketplaceColor: "#000000",
      codigo: "SHEIN15",
      descricao: "15% OFF na primeira compra",
      url: "https://www.shein.com.br",
      validade: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      atualizadoEm: new Date().toISOString(),
    },
  ];
}
