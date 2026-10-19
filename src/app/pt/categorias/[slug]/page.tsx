import { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/pinterest/ProductGrid";
import PinCard from "@/components/pinterest/PinCard";
import ArtigoPinCard from "@/components/pinterest/ArtigoPinCard";
import FAQSection from "@/components/seo/FAQSection";
import { getCategorias } from "@/lib/categorias";
import { getProdutos } from "@/lib/produtos";
import { getPins } from "@/lib/pins";
import { getArtigos } from "@/server/artigos";
import { getBaseUrl } from "@/lib/base-url";

interface CategoriaPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((categoria) => ({ slug: categoria.slug }));
}

export async function generateMetadata({ params }: CategoriaPageProps): Promise<Metadata> {
  const categorias = await getCategorias();
  const categoria = categorias.find((c) => c.slug === params.slug);
  if (!categoria) return {};

  const nome = categoria.nome;
  const descricao = categoria.descricao || `Descubra os melhores ${nome.toLowerCase()} na nossa curadoria.`;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/pt/categorias/${params.slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: `${nome} - Atacadinho da Rafa`,
    description: descricao,
    keywords: [nome.toLowerCase(), "achados", "ofertas", "produtos", "Atacadinho da Rafa"],
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: "Atacadinho da Rafa",
      title: `${nome} - Atacadinho da Rafa`,
      description: descricao,
      images: [
        {
          url: categoria.imagem ? `${baseUrl}${categoria.imagem}` : `${baseUrl}/assets/images/logo_rafa.png`,
          width: 1200,
          height: 630,
          alt: nome,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${nome} - Atacadinho da Rafa`,
      description: descricao,
      images: [categoria.imagem ? `${baseUrl}${categoria.imagem}` : `${baseUrl}/assets/images/logo_rafa.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const categorias = await getCategorias();
  const categoria = categorias.find((c) => c.slug === params.slug);
  const baseUrl = getBaseUrl();
  const [produtos, pins, artigos] = await Promise.all([
    getProdutos(),
    getPins("pt"),
    getArtigos("pt"),
  ]);

  const produtosCategoria = produtos.filter((p) => p.categoriaId === categoria?.id || p.categoriaId === categoria?.slug);
  const pinsCategoria = pins.filter((p) => p.categoriaId === categoria?.slug || p.categoriaId === categoria?.id);
  const artigosCategoria = artigos.filter((a) => a.categoriaId === categoria?.slug || a.categoriaId === categoria?.id);

  if (!categoria) {
    return <div>Categoria não encontrada</div>;
  }

  const nome = categoria.nome;
  const descricao = categoria.descricao || "";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/pt` },
      { "@type": "ListItem", position: 2, name: nome, item: `${baseUrl}/pt/categorias/${params.slug}` },
    ],
  };

  const getCategoryFAQs = (catNome: string) => {
    const lower = catNome.toLowerCase();
    if (lower.includes("pet") || lower.includes("animal")) {
      return [
        { pergunta: "Areia biodegradável para gato é melhor que a comum?", resposta: "Sim. Areia biodegradável de soja ou milho é mais leve, menos suja, não agride as patas do gato e tem melhor poder de absorção. Dura mais tempo e é mais fácil de descartar." },
        { pergunta: "Comedouro elevado serve para cachorros?", resposta: "Serve. Comedouros elevados são indicados para cães de médio e grande porte, especialmente raças como Golden Retriever, Labrador e Pastor Alemão, que são propensas a problemas de coluna." },
        { pergunta: "Brinquedos interativos substituem a companhia humana?", resposta: "Não substituem, mas ajudam muito. Brinquedos interativos são ótimos para entreter o animal durante o dia, mas a interação com humanos ainda é essencial para o bem-estar emocional do pet." },
        { pergunta: "Tapete higiênico é bom para filhotes?", resposta: "Sim. Tapetes higiênicos são essenciais para treinar filhotes e para pets idosos que não conseguem esperar para fazer suas necessidades." },
      ];
    }
    if (lower.includes("decoracao") || lower.includes("casa")) {
      return [
        { pergunta: "Cortina blackout serve para sala?", resposta: "Serve. Além de bloquear a luz para assistir TV ou filmes, cortinas blackout isolam termicamente, reduzindo o calor no verão e economizando energia com ar condicionado." },
        { pergunta: "Fita LED estraga a parede?", resposta: "Não, se você usar fita adesiva 3M ou fita dupla-face de qualidade. Evite fita crepe ou durex — podem soltar tinta." },
        { pergunta: "Organizadores acrílicos são resistentes?", resposta: "Organizadores de acrílico de 3mm a 5mm são resistentes e duram anos. Evite os muito finos (menos de 3mm), que podem quebrar com facilidade." },
        { pergunta: "Difusor de ambiente dura quanto tempo?", resposta: "Um difusor de 250ml com 5 varetas de bambom dura de 30 a 45 dias em ambiente de 15m² a 20m². Quanto mais varetas, mais intenso o aroma e menor a duração." },
      ];
    }
    if (lower.includes("auto") || lower.includes("moto")) {
      return [
        { pergunta: "Retrovisor universal serve para todas as motos?", resposta: "Serve para a maioria das motos populares (Honda CG, Yamaha YBR, Suzuki Intruder), mas verifique a medida da haste (8mm ou 10mm) antes de comprar." },
        { pergunta: "Escapamento paralelo faz barulho alto?", resposta: "Depende do modelo. Alguns escapamentos paralelos são projetados para reduzir ruído, outros são esportivos e mais barulhentos. Verifique a descrição do produto antes de comprar." },
        { pergunta: "Capacete de abre-fácil é seguro?", resposta: "Desde que seja aprovado pelo InMetro, sim. O mecanismo de abertura não compromete a estrutura do capacete. O importante é o selo de aprovação." },
        { pergunta: "Pastilha de freio dura quanto tempo?", resposta: "Pastilhas de freio duram de 10.000 km a 15.000 km, dependendo do estilo de pilotagem e das condições de uso. Sempre verifique o desgaste a cada revisão." },
      ];
    }
    if (lower.includes("tecnologia")) {
      return [
        { pergunta: "Mini drone com câmera 4K vale a pena?", resposta: "Vale para iniciantes e uso recreativo. Drones profissionais custam milhares de reais, mas drones de entrada por R$85 são ótimos para aprender a voar e filmar momentos casuais." },
        { pergunta: "Smartwatch barato funciona bem?", resposta: "Funciona para funções básicas: medir passos, frequência cardíaca, notificações de celular e alarmes. Se você precisa de GPS avançado, invista em um modelo mais caro." },
        { pergunta: "SSD externo 500GB é suficiente?", resposta: "Para backup de fotos e documentos, sim. Para edição de vídeo e armazenamento de jogos, considere 1TB ou mais." },
        { pergunta: "Air Fryer 4L serve para quantas pessoas?", resposta: "Serve para família de 3 a 4 pessoas. Para 1 ou 2 pessoas, uma Air Fryer de 2L a 3L é suficiente." },
      ];
    }
    if (lower.includes("beleza")) {
      return [
        { pergunta: "Sérum de vitamina C de R$25 funciona igual ao de R$200?", resposta: "Funciona se tiver a concentração certa de ácido L-ascórbico (10% a 20%). Muitos séruns caros cobram pela marca, não pelo ingrediente." },
        { pergunta: "Protetor solar de R$20 protege bem?", resposta: "Sim, desde que seja FPS 30 ou superior e tenha proteção UVA + UVB. Muitos protetores nacionais são aprovados pela ANVISA e custam pouco." },
        { pergunta: "Água micelar serve para pele oleosa?", resposta: "Serve. Águas micelares são adequadas para todos os tipos de pele, inclusive oleosa. Escolha fórmulas sem óleo e sem álcool." },
        { pergunta: "Pimple patch realmente funciona?", resposta: "Sim. Adesivos hidrocoloides absorvem a secreção da espinha, reduzem a inflamação e evitam que você aperte e deixe marca. Funcionam melhor em espinhas superficiais." },
      ];
    }
    return [
      { pergunta: `Como escolher os melhores produtos em ${nome}?`, resposta: `Verifique avaliações de outros compradores, priorize produtos com 4.5+ estrelas e mais de 100 avaliações. Na Shopee, produtos bem avaliados geralmente têm qualidade consistente.` },
      { pergunta: `Os produtos de ${nome.toLowerCase()} são seguros?`, resposta: "Sempre confira se o produto tem certificação de qualidade (InMetro, ANVISA, etc.) e se o vendedor tem boa reputação. Na Shopee, o programa de proteção ao comprador cobre produtos que não correspondem à descrição." },
      { pergunta: "Como economizar mais em compras online?", resposta: "Aproveite campanhas promocionais como 8.8, 9.9 e 11.11, use cupons de desconto e compre produtos com frete grátis. Na Shopee, muitos vendedores oferecem frete grátis em compras acima de R$20." },
    ];
  };

  const faqs = getCategoryFAQs(nome);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.resposta,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(160deg, ${categoria.cor || "#f43f5e"}15 0%, ${categoria.cor || "#f43f5e"}30 40%, transparent 80%)`,
          }}
        />

        <div className="mx-auto max-w-7xl px-4 pt-28 pb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#F4A7B9] transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{nome}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{categoria.icone}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {nome}
                </h1>
                {descricao && (
                  <p className="mt-1 text-gray-400">{descricao}</p>
                )}
              </div>
            </div>
            <div className="md:ml-auto">
              <span className="badge bg-white/10 border border-white/10 text-gray-300 shadow-sm">
                {produtosCategoria.length + pinsCategoria.length + artigosCategoria.length} {produtosCategoria.length + pinsCategoria.length + artigosCategoria.length === 1 ? "achado" : "achados"}
              </span>
            </div>
          </div>

          <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-card">
            <p className="text-gray-300 leading-relaxed">
              Explore nossa curadoria especial de {nome.toLowerCase()}. Selecionamos os melhores achados, ofertas e recomendações para você economizar sem abrir mão da qualidade. 
              Aqui você encontra produtos verificados, preços acessíveis e dicas para fazer escolhas inteligentes. 
              Navegue pelos {produtosCategoria.length} produtos selecionados e descubra promoções exclusivas das melhores lojas.
            </p>
          </div>

          {produtosCategoria.length > 0 && (
            <ProductGrid produtos={produtosCategoria} titulo={`Produtos em ${nome}`} limite={5} locale="pt" />
          )}

          {pinsCategoria.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Pins</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pinsCategoria.map((pin) => (
                  <div key={pin.id}>
                    <PinCard pin={pin} locale="pt" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {artigosCategoria.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artigosCategoria.map((artigo) => (
                  <ArtigoPinCard key={artigo.id} artigo={artigo} locale="pt" />
                ))}
              </div>
            </section>
          )}

          {produtosCategoria.length === 0 && pinsCategoria.length === 0 && artigosCategoria.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum achado encontrado nesta categoria ainda.</p>
              <p className="text-gray-500 text-sm mt-2">Volte em breve, novidades chegando!</p>
            </div>
          )}

          {faqs.length > 0 && (
            <div className="mt-16">
              <FAQSection items={faqs} title={`Perguntas frequentes sobre ${nome}`} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
