import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre - Atacadinho da Rafa",
  description: "Conheça a história por trás do Atacadinho da Rafa e nossa missão de encontrar os melhores achados com curadoria real e transparente.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Nossa história
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Quem está por trás dos achados?
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-2xl">
            O Atacadinho da Rafa nasceu da obsessão por encontrar produtos bons, bonitos e baratos na internet — e de compartilhar isso com você que não tem tempo de ficar procurando.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#F4A7B9]">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">A origem</h2>
            <p className="text-gray-300 leading-relaxed">
              Tudo começou em 2024, quando a Rafa — cansada de ver gente pagando caro por coisas que ela encontrava por uma fração do preço — decidiu reunir os melhores achados em um só lugar.
            </p>
            <p className="text-gray-300 leading-relaxed">
              O que era um hobby virou um projeto de vida. Hoje, o Atacadinho da Rafa é uma curadoria semanal dos melhores produtos em moda, casa, tecnologia, beleza e muito mais.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Nossa missão</h2>
            <p className="text-gray-300 leading-relaxed">
              Acreditamos que todo mundo merece acesso a produtos de qualidade sem precisar gastar uma fortuna. Por isso, separamos apenas o que realmente vale a pena — testamos, comparamos preços e trazemos até você.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Sem enrolação. Sem achismo. Só achados que aprovamos.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Como funciona</h2>
            <p className="text-gray-300 leading-relaxed">
              Publicamos conteúdos em formato de pins e artigos. Cada produto que indicamos possui um link de afiliado — o que significa que podemos receber uma comissão se você comprar através do nosso link. <strong className="text-white">Isso não aumenta o preço final para você</strong>, pelo contrário: muitas vezes conseguimos ofertas exclusivas.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Trabalhamos com as maiores plataformas do Brasil: Shopee, Mercado Livre, Amazon e outras. Todos os links são verificados e atualizados regularmente.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Compromisso com você</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Indicamos apenas produtos que usaríamos nós mesmas</li>
              <li>Preços e disponibilidade são verificados semanalmente</li>
              <li>Não vendemos posições — tudo é curadoria real</li>
              <li>Transparência total sobre links de afiliados</li>
              <li>Respeito à sua privacidade e experiência</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Nossa equipe</h2>
            <p className="text-gray-300 leading-relaxed">
              Somos uma equipe pequena, mas dedicada. Cada membro traz uma expertise diferente: moda, tecnologia, decoração, finanças. Juntas, formamos uma curadoria completa — mas sempre com o olho de quem usa o produto de verdade.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contato</h2>
            <p className="text-gray-300 leading-relaxed">
              Quer propor uma parceria, enviar um feedback ou simplesmente dizer oi? Estamos por aqui. Envie um email para <a href="mailto:atacadinhodarafa@hotmail.com" className="text-[#F4A7B9] hover:text-white transition-colors">atacadinhodarafa@hotmail.com</a> e vamos conversar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
