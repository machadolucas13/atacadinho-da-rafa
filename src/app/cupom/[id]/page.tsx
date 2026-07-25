import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Copy, ExternalLink, Clock, Tag, ArrowLeft, Flame } from "lucide-react";
import { getCupomById } from "@/lib/cupons";
import { getProdutos } from "@/lib/produtos";
import ProductCard from "@/components/pinterest/ProductCard";

interface CupomPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: CupomPageProps): Promise<Metadata> {
  const cupom = await getCupomById(params.id);
  if (!cupom) return { title: "Cupom não encontrado" };

  return {
    title: `${cupom.codigo} - ${cupom.marketplace} | Atacadinho da Rafa`,
    description: cupom.descricao,
    openGraph: {
      title: `${cupom.codigo} - ${cupom.marketplace}`,
      description: cupom.descricao,
      type: "website",
      url: `https://atacadinhodarafa.com.br/cupom/${cupom.id}`,
    },
  };
}

export default async function CupomPage({ params }: CupomPageProps) {
  const cupom = await getCupomById(params.id);
  if (!cupom) return notFound();

  const produtos = await getProdutos();
  const produtosRelacionados = produtos
    .filter((p) => p.loja.toLowerCase().includes(cupom.marketplace.toLowerCase()) && p.ativo)
    .slice(0, 4);

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

  return (
    <main className="relative z-10 min-h-screen">
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/pt" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-soft">
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold text-white"
                style={{ backgroundColor: cupom.marketplaceColor }}
              >
                <Tag className="h-4 w-4" />
                {cupom.marketplace}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                {tempoRelativo(cupom.atualizadoEm)}
              </span>
            </div>

            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-white tracking-tight">
              {cupom.codigo}
            </h1>

            <p className="mt-3 text-base text-gray-300 leading-relaxed">
              {cupom.descricao}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(cupom.codigo);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Copy className="h-4 w-4" />
                Copiar Código
              </button>
              <Link
                href={cupom.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D48] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#be123c]"
              >
                Ver Ofertas
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            {cupom.validade && (
              <p className="mt-4 text-sm text-gray-400">
                Válido até {new Date(cupom.validade).toLocaleDateString("pt-BR")}
              </p>
            )}
          </div>
        </div>
      </section>

      {produtosRelacionados.length > 0 && (
        <section className="py-8 md:py-12" aria-label="Produtos relacionados">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                <span className="inline-flex items-center gap-2">
                  <Flame className="h-5 w-5 text-[#F67C6F]" />
                  Produtos Relacionados
                </span>
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {produtosRelacionados.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
