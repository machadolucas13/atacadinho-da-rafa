import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - Atacadinho da Rafa",
  description: "Política de Privacidade do Atacadinho da Rafa. Saiba como protegemos seus dados e sua privacidade.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Transparência
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl">
            Última atualização: Julho de 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#F4A7B9]">
            <h2>1. Informações que coletamos</h2>
            <p className="text-gray-300">
              Coletamos informações mínimas para o funcionamento do site. Isso inclui dados de navegação básicos, como páginas visitadas e tempo de permanência, apenas para melhorar sua experiência.
            </p>
            <p className="text-gray-300">
              <strong className="text-white">Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros</strong>, exceto quando exigido por lei ou para processar pagamentos (neste caso, apenas informações necessárias para a transação).
            </p>

            <h2 className="text-white">2. Cookies</h2>
            <p className="text-gray-300">
              Utilizamos cookies para melhorar sua experiência de navegação, lembrar suas preferências e analisar o tráfego do site. Você pode desativar os cookies nas configurações do seu navegador, mas algumas funcionalidades podem não funcionar corretamente.
            </p>
            <ul className="text-gray-300">
              <li><strong className="text-white">Cookies essenciais</strong>: necessários para o funcionamento básico do site</li>
              <li><strong className="text-white">Cookies de análise</strong>: nos ajudam a entender como os visitantes usam o site</li>
              <li><strong className="text-white">Cookies de marketing</strong>: utilizados para personalizar anúncios</li>
            </ul>

            <h2 className="text-white">3. Links de afiliados</h2>
            <p className="text-gray-300">
              Alguns links neste site são links de afiliados. Isso significa que podemos receber uma comissão se você fizer uma compra através desses links, <strong className="text-white">sem nenhum custo adicional para você</strong>.
            </p>
            <p className="text-gray-300">
              Trabalhamos com plataformas como Shopee, Mercado Livre, Amazon e outras. Os preços e disponibilidade dos produtos são atualizados regularmente, mas podem mudar sem aviso prévio.
            </p>

            <h2 className="text-white">4. Segurança</h2>
            <p className="text-gray-300">
              Implementamos medidas de segurança para proteger suas informações. No entanto, nenhum método de transmissão pela internet é 100% seguro. Fazemos o possível para proteger seus dados, mas não podemos garantir segurança absoluta.
            </p>

            <h2 className="text-white">5. Seus direitos</h2>
            <p className="text-gray-300">
              Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco pelo email <a href="mailto:atacadinhodarafa@hotmail.com" className="text-[#F4A7B9] hover:text-white">atacadinhodarafa@hotmail.com</a>.
            </p>

            <h2 className="text-white">6. Alterações nesta política</h2>
            <p className="text-gray-300">
              Podemos atualizar esta política periodicamente. A data da última atualização está no topo desta página. Recomendamos que você revise esta política regularmente para se manter informado.
            </p>

            <h2 className="text-white">7. Contato</h2>
            <p className="text-gray-300">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <ul className="text-gray-300">
              <li>Email: <a href="mailto:atacadinhodarafa@hotmail.com" className="text-[#F4A7B9] hover:text-white">atacadinhodarafa@hotmail.com</a></li>
              <li><a href="https://instagram.com/atacadinhodarafa" target="_blank" rel="noopener noreferrer" className="text-[#F4A7B9] hover:text-white">Instagram</a>: @atacadinhodarafa</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
