import { Metadata } from "next";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL("https://atacadinhodarafa.com.br/pt"),
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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer className="relative z-20" />
    </div>
  );
}
