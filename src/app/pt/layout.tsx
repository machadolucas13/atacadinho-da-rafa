import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://atacadinhodarafa.vercel.app/pt"),
  title: {
    default: "Atacadinho da Rafa - Descobertas, Achados e Ofertas",
    template: "%s | Atacadinho da Rafa",
  },
  description:
    "Descubra os melhores achados, ofertas e recomendações. Curadoria visual de moda, decoração, tecnologia e beleza para você economizar e descobrir produtos incríveis.",
  keywords: [
    "achados",
    "ofertas",
    "descobertas",
    "produtos",
    "moda feminina",
    "decoracao",
    "tecnologia",
    "cozinha",
    "beleza",
    "acessorios",
    "shopee",
    "brechó",
    "economia",
  ],
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

