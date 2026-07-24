export interface Pin {
  id: string;
  slug: string;
  locale: string;
  titulo: string;
  descricao: string;
  imagem: string;
  destaque: boolean;
  visualizacoes?: number;
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
  },
  {
    id: "pin-tenis-pt",
    slug: "tenis-corrida-masculino-feminino-2026",
    locale: "pt",
    titulo: "Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo",
    descricao: "Selecionamos tênis de corrida masculinos e femininos que combinam conforto, performance e estilo.",
    imagem: "/images/pin2.png",
    destaque: true,
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
