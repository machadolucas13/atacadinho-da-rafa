import { Metadata } from "next";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export const metadata: Metadata = {
  title: "Termos de Uso - Atacadinho da Rafa",
  description: "Termos de Uso do Atacadinho da Rafa. Regras e condições para utilização do site.",
};

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Legal
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Termos de Uso
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl">
            Última atualização: Julho de 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#F4A7B9]">
            <h2>1. Aceitação dos termos</h2>
            <p className="text-gray-300">
              Ao acessar e utilizar o site <strong className="text-white">Atacadinho da Rafa</strong>, você concorda em cumprir estes Termos de Uso. Se não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site.
            </p>

            <h2 className="text-white">2. Descrição do serviço</h2>
            <p className="text-gray-300">
              O Atacadinho da Rafa é uma plataforma de curadoria de produtos que oferece conteúdo informativo, recomendações e links de afiliados para produtos disponíveis em marketplaces como Shopee, Mercado Livre, Amazon e outros.
            </p>
            <p className="text-gray-300">
              <strong className="text-white">Não somos uma loja virtual</strong>. Não vendemos produtos diretamente. O site funciona como um guia de achados e ofertas, direcionando o usuário para as plataformas de venda parceiras.
            </p>

            <h2 className="text-white">3. Uso do site</h2>
            <p className="text-gray-300">
              Você concorda em usar este site apenas para fins legítimos e de acordo com estes Termos de Uso. É proibido:
            </p>
            <ul className="text-gray-300">
              <li>Utilizar o site para atividades ilegais ou não autorizadas</li>
              <li>Tentar obter acesso não autorizado a nossos sistemas</li>
              <li>Reproduzir, duplicar ou copiar conteúdo sem permissão</li>
              <li>Utilizar robots, spiders ou outros métodos automatizados para acessar o site</li>
              <li>Interferir ou interromper o funcionamento do site</li>
            </ul>

            <h2 className="text-white">4. Propriedade intelectual</h2>
            <p className="text-gray-300">
              Todo o conteúdo do Atacadinho da Rafa — incluindo textos, imagens, logos, design e código — é protegido por direitos autorais e outras leis de propriedade intelectual. Você pode visualizar e compartilhar o conteúdo para fins não comerciais, desde que atribua a devida autoria.
            </p>

            <h2 className="text-white">5. Links de afiliados</h2>
            <p className="text-gray-300">
              O site contém links de afiliados. Isso significa que podemos receber uma comissão se você realizar uma compra através desses links. Essa comissão não altera o preço final do produto para você.
            </p>
            <p className="text-gray-300">
              Trabalhamos com transparência e indicamos apenas produtos que acreditamos ser relevantes para nossa comunidade. A decisão de compra é sempre sua.
            </p>

            <h2 className="text-white">6. Isenção de responsabilidade</h2>
            <p className="text-gray-300">
              O conteúdo do site é fornecido "como está". Não garantimos a precisão, completude ou atualidade das informações. Preços, disponibilidades e características dos produtos podem ser alterados pelas plataformas de venda a qualquer momento, sem aviso prévio.
            </p>
            <p className="text-gray-300">
              Não nos responsabilizamos por:
            </p>
            <ul className="text-gray-300">
              <li>Erros ou omissões no conteúdo</li>
              <li>Danos resultantes do uso ou incapacidade de usar o site</li>
              <li>Conteúdo de sites de terceiros linkados</li>
              <li>Perdas financeiras decorrentes de compras</li>
            </ul>

            <h2 className="text-white">7. Privacidade</h2>
            <p className="text-gray-300">
              Sua privacidade é importante para nós. Nossa <LocaleAwareLink href="/politica-privacidade" className="text-[#F4A7B9] hover:text-white">Política de Privacidade</LocaleAwareLink> descreve como coletamos, usamos e protegemos suas informações.
            </p>

            <h2 className="text-white">8. Alterações nos termos</h2>
            <p className="text-gray-300">
              Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. Alterações entrarão em vigor imediatamente após a publicação. Recomendamos que você revise esta página periodicamente.
            </p>

            <h2 className="text-white">9. Lei aplicável</h2>
            <p className="text-gray-300">
              Estes termos são regidos pelas leis brasileiras. Quaisquer disputas serão resolvidas nos tribunais competentes do Brasil.
            </p>

            <h2 className="text-white">10. Contato</h2>
            <p className="text-gray-300">
              Para questões relacionadas a estes Termos de Uso, entre em contato:
            </p>
            <ul className="text-gray-300">
              <li>Email: <a href="mailto:atacadinhodarafa@hotmail.com" className="text-[#F4A7B9] hover:text-white">atacadinhodarafa@hotmail.com</a></li>
              <li>Instagram: <a href="https://instagram.com/atacadinhodarafa" target="_blank" rel="noopener noreferrer" className="text-[#F4A7B9] hover:text-white">@atacadinhodarafa</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
