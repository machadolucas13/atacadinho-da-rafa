"use server";

import { getArtigoBySlug } from "@/server/artigos";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export async function generateStaticParams() {
  return [
    { slug: "melhores-calcas-jeans-masculino-guia-2026" },
    { slug: "melhores-calcas-jeans-feminino-guia-2026" },
    { slug: "como-ganhar-dinheiro-como-afiliado-guia-2026" },
    { slug: "como-montar-guarda-roupa-capsula-gastando-poco-2026" },
    { slug: "tendencias-moda-primavera-verao-2026" },
    { slug: "maquiagem-para-iniciantes-guia-passo-a-passo" },
    { slug: "como-organizar-apartamento-pequeno-com-pouco-dinheiro" },
    { slug: "decoracao-sustentavel-20-ideias-ate-100-reais" },
    { slug: "rotina-skincare-pele-oleosa-produtos-funcionam" },
    { slug: "como-escolher-perfume-guia-completo" },
    { slug: "como-economizar-supermercado-dicas" },
    { slug: "melhores-apps-financas-pessoais-2026" },
    { slug: "como-criar-conteudo-instagram-seguidores" },
    { slug: "guia-marketing-afiliados-iniciantes-2026" },
    { slug: "como-fazer-mudanca-gastando-pouco" },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artigo = await getArtigoBySlug(params.slug, "pt");
  if (!artigo) return {};
  return {
    title: artigo.titulo,
    description: artigo.descricao,
  };
}

export default async function ArtigoPage({
  params,
}: {
  params: { slug: string };
}) {
  const artigo = await getArtigoBySlug(params.slug, "pt");
  if (!artigo || !artigo.ativo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400">Artigo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-12">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <LocaleAwareLink href="/artigos" className="hover:text-[#F4A7B9] transition-colors">
                Artigos
              </LocaleAwareLink>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">{artigo.slug}</span>
            </div>

            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src={artigo.imagemCapa}
                alt={artigo.titulo}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
              <span>{new Date(artigo.publicadoEm).toLocaleDateString("pt-BR")}</span>
              <span>•</span>
              <span>{artigo.tempoLeitura} min de leitura</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {artigo.titulo}
            </h1>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {artigo.descricao}
            </p>

            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}