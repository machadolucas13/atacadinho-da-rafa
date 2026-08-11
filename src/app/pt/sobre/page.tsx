import { Metadata } from "next";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o Atacadinho da Rafa, curadoria de achados, ofertas e dicas para você economizar e descobrir produtos incríveis.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Sobre o Atacadinho da Rafa</h1>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          O Atacadinho da Rafa é um site de curadoria e descobertas. Nosso objetivo é
          separar o que realmente vale a pena em meio a tanto produto disponível na internet.
        </p>
        <p>
          Aqui você encontra achados de moda, decoração, tecnologia, beleza, cozinha e
          acessórios — sempre com foco em custo-benefício, utilidade e qualidade.
        </p>
        <p>
          Também compartilhamos dicas práticas para economizar, organizar a casa, cuidar
          de si e ganhar renda extra como afiliado. Tudo em linguagem simples, sem enrolação.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Quem escreve</h2>
        <p>
          Sou a Rafa, criadora do Atacadinho da Rafa. Trabalho com curadoria de produtos
          e conteúdo útil há anos, e criei este espaço para ajudar pessoas comuns a
          encontrar ofertas reais e tomar melhores decisões de compra — sem perder tempo
          nem dinheiro.
        </p>
        <p>
          Acredito que dá para viver bem gastando menos, quando se sabe escolher. Por isso
          cada post aqui é feito com pesquisa, testes e critério.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Transparência</h2>
        <p>
          Alguns links deste site são links de afiliado. Isso significa que, se você comprar
          por meio deles, podemos receber uma comissão sem nenhum custo extra para você.
          Indicamos apenas produtos e serviços que acreditamos ser úteis.
        </p>
        <p>
          Veja mais na nossa página de{" "}
          <LocaleAwareLink href="/pt/divulgacao" className="text-[#F4A7B9] hover:underline">
            Divulgação
          </LocaleAwareLink>
          .
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Contato</h2>
        <p>
          Quer enviar uma sugestão, parceria ou reportar algo? Fale com a gente pelo{" "}
          <LocaleAwareLink href="/pt/contato" className="text-[#F4A7B9] hover:underline">
            formulário de contato
          </LocaleAwareLink>
          .
        </p>
      </div>
    </div>
  );
}
