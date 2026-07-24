export interface Pin {
  id: string;
  slug: string;
  locale: string;
  titulo: string;
  descricao: string;
  imagem: string;
  destaque: boolean;
  visualizacoes?: number;
  links?: { nome: string; preco: string; url: string }[];
}

export const pins: Pin[] = [
  {
    id: "pin-jeans-pt",
    slug: "calcaspromocaocalcas-jeans-femininas-economicas-2026",
    locale: "pt",
    titulo: "Calças Jeans Femininas a partir de R$ 24,90",
    descricao: "20 modelos que empinam o bumbum: wide leg, flare, cargo, skinny e mais.",
    imagem: "/posts/calcas-jeans-femininas-economicas-2026.png",
    destaque: true,
    links: [
      { nome: "Calça Jeans Feminina | Bazar Brechó Desapego usada", preco: "R$ 24,90", url: "https://s.shopee.com.br/4qEG7HYQVJ" },
      { nome: "calça wide leg jeans feminina levanta bumbum", preco: "R$ 29,90", url: "https://s.shopee.com.br/5fnN74lkgj" },
      { nome: "calça jeans feminina levanta bumbum cintura alta com lycra", preco: "R$ 36,90", url: "https://s.shopee.com.br/1Vxo9SwHGb" },
      { nome: "calça jeans feminina preta grafite cintura alta empina bumbum", preco: "R$ 36,90", url: "https://s.shopee.com.br/4AyZKPbq6n" },
      { nome: "Calças Jogger Jeans Feminina Com Elástico Super Confortável Estilosa", preco: "R$ 39,99", url: "https://s.shopee.com.br/8AUi5ohfoR" },
      { nome: "calça jeans flare grafite feminina super empina bumbum tendência", preco: "R$ 41,99", url: "https://s.shopee.com.br/LlqlV9Kxg" },
      { nome: "calça jeans feminina preta com Lycra empina bumbum", preco: "R$ 44,99", url: "https://s.shopee.com.br/6VMU6mioLv" },
      { nome: "Calça Jeans Flare Feminina Cintura Alta Modeladora Levanta Bumbum", preco: "R$ 47,90", url: "https://s.shopee.com.br/9pcw59yz77" },
      { nome: "calça jeans cargo grafite feminina empina bumbum super tendencia", preco: "R$ 48,59", url: "https://s.shopee.com.br/50XgKK36x0" },
      { nome: "Calça Jeans Feminina em Brilhos Furta Cor Estrelas Luxuosa", preco: "R$ 151,91", url: "https://s.shopee.com.br/111XZ3TejC" },
      { nome: "Calça Jeans Feminina Sal E Pimenta Skinny Linda Rasgada Envio Rapido", preco: "R$ 91,20", url: "https://s.shopee.com.br/9zwMHdcaC2" },
      { nome: "Calça Jeans Feminina Wide Leg Rasgada no joelho Cintura Alta Boca larga", preco: "R$ 66,49", url: "https://s.shopee.com.br/30mbwoImih" },
      { nome: "Calça Jeans Feminina Cargo Wide Leg Black Marmorizada Pantalona", preco: "R$ 69,65", url: "https://s.shopee.com.br/9V05goBWiK" },
      { nome: "Calça Jeans Stoned Bordada Miss Texas Blue Strass Cowgirl", preco: "R$ 260,10", url: "https://s.shopee.com.br/3g2Ik8amft" },
      { nome: "CALÇA JEANS WIDE COM LISTRAS E BOTÕES LATERAIS CINTURA ALTA", preco: "R$ 251,91", url: "https://s.shopee.com.br/1qaeYnTtU3" },
      { nome: "Calça Jeans Maxi Wide Leg Moda Tendência Europa Pantalona", preco: "R$ 193,50", url: "https://s.shopee.com.br/9ANFIInyCg" },
      { nome: "Calça Jeans Feminina Com Detalhe Bordado Wide Lag Pantalona", preco: "R$ 189,91", url: "https://s.shopee.com.br/5VTwvbIie8" },
      { nome: "Calça Jeans citura alto Wide Leg Destroyed Rasgada pantalona Femininas", preco: "R$ 133", url: "https://s.shopee.com.br/7Kvb711ahz" },
      { nome: "Calça Jeans Feminina Sal e Pimenta Original Vários Modelos - Cintura Alta", preco: "R$ 79,99", url: "https://s.shopee.com.br/6Ajdiz3LHY" },
      { nome: "calça cargo jeans e sarja feminina", preco: "R$ 90", url: "https://s.shopee.com.br/AAFmUPLhFY" },
    ],
  },
  {
    id: "pin-tenis-pt",
    slug: "tenis-corrida-masculino-feminino-2026",
    locale: "pt",
    titulo: "Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo",
    descricao: "Selecionamos tênis de corrida masculinos e femininos que combinam conforto, performance e estilo.",
    imagem: "/images/pin2.png",
    destaque: true,
    links: [
      { nome: "Tênis New Balance 530 Feminino Original Casual Retrô", preco: "R$ 591,40", url: "https://s.shopee.com.br/3qLjBG86H9" },
      { nome: "Tênis Feminino New Balance 530 Esportivo Casual Respirável", preco: "R$ 572,91", url: "https://s.shopee.com.br/9KgfjTaZXr" },
      { nome: "Tênis New Balance Fresh Foam Arishi V4 Feminino Original com Nota Fiscal", preco: "R$ 345,21", url: "https://s.shopee.com.br/Llr11YRzl" },
      { nome: "Tenis Mizuno Space 5 Menina", preco: "R$ 270", url: "https://s.shopee.com.br/6L34A8VJTY" },
      { nome: "Tênis Fila Recovery Feminino Bege Leve Macio Caminhada Academia", preco: "R$ 287,96", url: "https://s.shopee.com.br/2qTBzji6XE" },
      { nome: "Tênis Fila Progress Lite Feminino Bege Caminhada Original Mulher", preco: "R$ 306", url: "https://s.shopee.com.br/7KvbM3lce0" },
      { nome: "Tenis Fila Runner 2K Feminino Lifestyle Casual Confortavel", preco: "R$ 368,90", url: "https://s.shopee.com.br/30mcCAubGI" },
      { nome: "Tênis Adidas Supernova Comfortglide Feminino Corrida", preco: "R$ 619", url: "https://s.shopee.com.br/8fQywf3JEO" },
      { nome: "Tênis New Balance Feminino Fresh Foam X 1080v14", preco: "R$ 736", url: "https://s.shopee.com.br/30mcCHSKuu" },
      { nome: "Tênis New Balance Fuelcell Rebel V5 Feminino - Rosa Neo/Rosa", preco: "R$ 894", url: "https://s.shopee.com.br/50Xga2wIew" },
      { nome: "Tênis Mizuno Wave Creation 26 Feminino Original com Nota Fiscal", preco: "R$ 511,71", url: "https://s.shopee.com.br/9Kgfk4a3y9" },
      { nome: "Tênis Olympikus Swift 5 Feminino Cinza e Rosa", preco: "R$ 315", url: "https://s.shopee.com.br/1qaeoLRWiJ" },
      { nome: "Tenis Fila Maxxi Lite Feminino Caminhada Corrida Treinos Academia", preco: "R$ 277", url: "https://s.shopee.com.br/190d12lth" },
      { nome: "Tênis Adidas Latin Run 3.0 Feminino", preco: "R$ 374", url: "https://s.shopee.com.br/1qaeoQK91n" },
      { nome: "Tênis Feminino de Academia para Musculação Treino Funcional", preco: "R$ 49", url: "https://s.shopee.com.br/2BDVD8Z0sq" },
      { nome: "Tênis Feminino Esportivo Axion Estiloso Moderno Treino Academia", preco: "R$ 69,99", url: "https://s.shopee.com.br/9zwMXZza4G" },
      { nome: "Tênis Feminino Esportivo Academia Caminhada Leve Confortável", preco: "R$ 106", url: "https://s.shopee.com.br/3g2Izz0TrF" },
    ],
  },
  {
    id: "pin-jeans-en",
    slug: "best-womens-jeans-under-50-deals-2026",
    locale: "en",
    titulo: "Best Women's Jeans Under R$50",
    descricao: "20 models that lift and shape: wide leg, flare, cargo, skinny and more.",
    imagem: "/posts/calcas-jeans-femininas-economicas-2026.png",
    destaque: true,
  },
  {
    id: "pin-tenis-en",
    slug: "tenis-corrida-masculino-feminino-2026",
    locale: "en",
    titulo: "Men's and Women's Running Shoes: best models to train in style",
    descricao: "Selected running shoes for men and women that combine comfort, performance and style.",
    imagem: "/images/pin2.png",
    destaque: true,
  },
];

export async function getPins(locale?: string): Promise<Pin[]> {
  if (locale) {
    return pins.filter((p) => p.locale === locale);
  }
  return pins;
}
