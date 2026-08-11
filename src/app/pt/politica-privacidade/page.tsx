import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do Atacadinho da Rafa.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Política de Privacidade</h1>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          Esta Política de Privacidade descreve como o Atacadinho da Rafa coleta, usa e
          protege as informações dos visitantes e usuários do site.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Informações que coletamos</h2>
        <p>
          Podemos coletar informações de identificação não pessoal, como tipo de navegador,
          sistema operacional, páginas visitadas e tempo de permanência, por meio de
          ferramentas como Google Analytics.
        </p>
        <p>
          Se você entrar em contato conosco, podemos receber e armazenar o nome e e-mail
          que você fornecer.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Uso das informações</h2>
        <p>
          Utilizamos essas informações para melhorar o conteúdo, a experiência do usuário
          e, quando aplicável, responder mensagens enviadas por formulário de contato.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Cookies</h2>
        <p>
          O site pode usar cookies para melhorar a navegação e para serviços de análise e
          publicidade. Você pode desativar cookies nas configurações do navegador.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Links de afiliados</h2>
        <p>
          Podemos participar de programas de afiliados. Esses links podem usar cookies para
          atribuir indicações. Isso não altera o preço final para o usuário.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Alterações</h2>
        <p>
          Podemos atualizar esta política periodicamente. Recomendamos que você a revise
          de tempos em tempos.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Contato</h2>
        <p>
          Em caso de dúvidas, entre em contato pelo{" "}
          <a className="text-[#F4A7B9] hover:underline" href="mailto:contato@atacadinhodarafa.vercel.app">
            contato@atacadinhodarafa.vercel.app
          </a>
          .
        </p>
      </div>
    </div>
  );
}
