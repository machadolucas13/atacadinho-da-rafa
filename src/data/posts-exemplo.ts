export const postsExemplo = [
  {
    id: "post-jeans",
    titulo: "30 calças jeans de R$15 a R$400 que valem a pena",
    slug: "30-calcas-jeans-de-15-a-400",
    descricao: "Separamos calças jeans baratas, médias e premium que realmente valem a pena. Tem para todos os gostos e bolsos.",
    conteudo: `
      <p>Se você está procurando calça jeans barata mas não quer gastar muito, esse post é para você. Separei 30 opções que vão desde R$15 até R$400, todas com link de afiliado.</p>

      <h2>Calças até R$50</h2>
      <p>Essas são as opções mais acessíveis, ideais para quem está começando a montar o guarda-roupa ou quer ter várias opções sem gastar muito.</p>

      <h2>Calças de R$50 a R$150</h2>
      <p>Aqui já encontramos opções com melhor acabamento, tecido mais encorpado e cortes mais modernos.</p>

      <h2>Calças premium acima de R$150</h2>
      <p>Para quem quer investir em uma peça que dura anos, com caimento perfeito e tecido premium.</p>
    `,
    imagemCapa: "/images/artigos/calcas-jeans.jpg",
    imagens: [],
    categoriaId: "1",
    categoria: {
      id: "1",
      nome: "Moda Feminina",
      slug: "moda-feminina",
      descricao: "Vestidos, saias, blusas e muito mais",
      icone: "👗",
      cor: "#ec4899",
      imagem: "/images/categorias/moda-feminina.jpg",
      ordem: 1,
      ativo: true,
    },
    destaque: true,
    visualizacoes: 12000,
    tempoLeitura: 8,
    tags: ["jeans", "calça jeans", "moda feminina", "barato", "achados", "Destaque", "Tendência"],
    ativo: true,
    publicadoEm: new Date("2024-01-15"),
    produtos: [
      {
        nome: "Calça Jeans Skinny Barata",
        preco: 29.9,
        precoOriginal: 59.9,
        linkAfiliado: "https://shopee.com.br/calca1",
        loja: "Shopee",
        imagem: "/images/produtos/calca-jeans-1.jpg",
        tags: "jeans, skinny, barata",
      },
      {
        nome: "Calça Jeans Retrô Cintura Alta",
        preco: 49.9,
        precoOriginal: 89.9,
        linkAfiliado: "https://shopee.com.br/calca2",
        loja: "Shopee",
        imagem: "/images/produtos/calca-jeans-2.jpg",
        tags: "jeans, retrô, cintura alta",
      },
      {
        nome: "Calça Jeans Premium",
        preco: 199.9,
        precoOriginal: 349.9,
        linkAfiliado: "https://amazon.com.br/calca3",
        loja: "Amazon",
        imagem: "/images/produtos/calca-jeans-3.jpg",
        tags: "jeans, premium, investimento",
      },
    ],
  },
  {
    id: "post-cozinha",
    titulo: "25 achados de cozinha que vão salvar sua vida",
    slug: "25-achados-cozinha-salvar-vida",
    descricao: "Organizadores, utensílios e eletrodomésticos que fazem toda a diferença no dia a dia da cozinha.",
    conteudo: `
      <p>Cozinha bagunçada é sinônimo de dor de cabeça. Separei 25 achados que vão organizar sua vida, desde suportes de prato até air fryer.</p>

      <h2>Organização</h2>
      <p>Os primeiros itens são todos sobre organizar sem gastar muito.</p>

      <h2>Utensílios</h2>
      <p>Panelas, espátulas, formas e tudo que você precisa para cozinhar melhor.</p>
    `,
    imagemCapa: "/images/artigos/achados-cozinha.jpg",
    imagens: [],
    categoriaId: "3",
    categoria: {
      id: "3",
      nome: "Cozinha",
      slug: "cozinha",
      descricao: "Utensílios e organizadores de cozinha",
      icone: "🍳",
      cor: "#10b981",
      imagem: "/images/categorias/cozinha.jpg",
      ordem: 3,
      ativo: true,
    },
    destaque: true,
    visualizacoes: 8500,
    tempoLeitura: 7,
    tags: ["cozinha", "organizadores", "achados", "barato", "Destaque", "Organização"],
    ativo: true,
    publicadoEm: new Date("2024-01-20"),
    produtos: [
      {
        nome: "Kit Organizador de Cozinha 5 em 1",
        preco: 49.9,
        precoOriginal: 79.9,
        linkAfiliado: "https://mercadolivre.com.br/org1",
        loja: "Mercado Livre",
        imagem: "/images/produtos/organizador-cozinha.jpg",
        tags: "cozinha, organizador",
      },
      {
        nome: "Air Fryer 4L Digital",
        preco: 299.9,
        precoOriginal: 499.9,
        linkAfiliado: "https://amazon.com.br/air1",
        loja: "Amazon",
        imagem: "/images/produtos/air-fryer.jpg",
        tags: "cozinha, air fryer, eletrodoméstico",
      },
    ],
  },
  {
    id: "post-decoracao",
    titulo: "20 achados da Shopee para deixar sua casa bonita",
    slug: "20-achados-shopee-decoracao",
    descricao: "Decoração barata e estilosa direto da Shopee. Itens que transformam qualquer ambiente por menos de R$100.",
    conteudo: `
      <p>Não precisa gastar muito para deixar a casa bonita. A Shopee está cheia de achados de decoração que parecem caros mas custam pouco.</p>

      <h2>Sala</h2>
      <p>Almofadas, quadros, tapetes e luminárias que dão um ar novo para a sala.</p>

      <h2>Quarto</h2>
      <p>Cabeceira, organizadores, espelhos e luzes para criar um clima aconchegante.</p>
    `,
    imagemCapa: "/images/artigos/achados-shopee.jpg",
    imagens: [],
    categoriaId: "2",
    categoria: {
      id: "2",
      nome: "Casa e Decoração",
      slug: "casa-decoracao",
      descricao: "Deixe sua casa mais bonita e aconchegante",
      icone: "🏠",
      cor: "#f59e0b",
      imagem: "/images/categorias/casa-decoracao.jpg",
      ordem: 2,
      ativo: true,
    },
    destaque: true,
    visualizacoes: 15000,
    tempoLeitura: 10,
    tags: ["shopee", "decoração", "achados", "casa", "Destaque", "Criativo"],
    ativo: true,
    publicadoEm: new Date("2024-01-25"),
    produtos: [
      {
        nome: "Luminária de Mesa LED",
        preco: 59.9,
        precoOriginal: 89.9,
        linkAfiliado: "https://shopee.com.br/luz1",
        loja: "Shopee",
        imagem: "/images/produtos/luminaria-led.jpg",
        tags: "decoração, luminária, LED",
      },
      {
        nome: "Tapete Decorativo",
        preco: 79.9,
        precoOriginal: 129.9,
        linkAfiliado: "https://shopee.com.br/tapete1",
        loja: "Shopee",
        imagem: "/images/produtos/tapete.jpg",
        tags: "decoração, tapete, sala",
      },
    ],
  },
];
