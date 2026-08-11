import { Metadata } from "next";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export const metadata: Metadata = {
  title: "Divulgação",
  description: "Divulgação sobre links de afiliados e conteúdo patrocinado no Atacadinho da Rafa.",
};

export default function DivulgacaoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Divulgação</h1>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          O Atacadinho da Rafa pode participar de programas de afiliados e receber
          comissões por compras realizadas por meio de links indicados em nosso conteúdo.
        </p>
        <p>
          Isso não altera o preço final para você. A comissão recebida ajuda a manter
          o site e continuar produzindo curadorias e dicas gratuitas.
        </p>
        <p>
          Indicamos apenas produtos e serviços que consideramos relevantes e que
          acreditamos agregar valor aos nossos leitores.
        </p>
        <p>
          Algumas matérias podem incluir conteúdo patrocinado ou parcerias pagas.
          Quando isso acontecer, será indicado de forma clara no texto.
        </p>
        <p>
          Se tiver dúvidas, consulte também nossa{" "}
          <LocaleAwareLink href="/pt/politica-privacidade" className="text-[#F4A7B9] hover:underline">
            Política de Privacidade
          </LocaleAwareLink>{" "}
          e nossos{" "}
          <LocaleAwareLink href="/pt/termos-de-uso" className="text-[#F4A7B9] hover:underline">
            Termos de Uso
          </LocaleAwareLink>
          .
        </p>
      </div>
    </div>
  );
}
