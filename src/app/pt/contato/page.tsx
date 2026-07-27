import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Atacadinho da Rafa",
  description: "Entre em contato com o Atacadinho da Rafa. Dúvidas, sugestões, parcerias ou feedback.",
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F4A7B9] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
            Fale com a gente
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contato
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl max-w-2xl">
            Tem alguma dúvida, sugestão de produto ou proposta de parceria? Adoramos ouvir você. Use os canais abaixo e a gente responde o mais rápido possível.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">📧</span> Email
            </h2>
            <p className="mt-3 text-gray-300 text-sm leading-relaxed">
              Para dúvidas, sugestões ou parcerias, envie um email diretamente para a Rafa e equipe. Respondemos em até 48 horas úteis.
            </p>
            <a
              href="mailto:atacadinhodarafa@hotmail.com"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#E11D48]/30 bg-[#E11D48]/10 px-4 py-2.5 text-sm font-bold text-[#F4A7B9] transition-all hover:bg-[#E11D48]/20 hover:text-white"
            >
              atacadinhodarafa@hotmail.com
            </a>
            <p className="mt-3 text-xs text-gray-500">
              Horário de atendimento: segunda a sexta, 9h às 18h.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🤝</span> Parcerias
            </h2>
            <p className="mt-3 text-gray-300 text-sm leading-relaxed">
              Se você representa uma marca, loja ou plataforma e quer propor uma parceria, entre em contato com o assunto &quot;Parceria&quot; no email. Adoramos conhecer novas marcas e trazer os melhores produtos para nossa comunidade.
            </p>
            <a
              href="mailto:atacadinhodarafa@hotmail.com?subject=Parceria%20-%20Atacadinho%20da%20Rafa"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
              Propor parceria
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">💡</span> Sugestões de produtos
          </h2>
          <p className="mt-3 text-gray-300 text-sm leading-relaxed">
            Tem um produto que você ama e quer que a gente teste? Manda para a gente! Adoramos receber indicações da comunidade. Se o produto for aprovado na nossa curadoria, ele aparece aqui no site para todo mundo ver.
          </p>
          <a
            href="mailto:atacadinhodarafa@hotmail.com?subject=Sugestão%20de%20Produto"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Enviar sugestão
          </a>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">❓</span> Perguntas frequentes
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Vocês vendem os produtos?</h3>
              <p className="mt-1 text-xs text-gray-400">Não. Somos uma curadoria. Quando você compra através dos nossos links, podemos receber uma comissão sem nenhum custo extra para você.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Os preços são atualizados?</h3>
              <p className="mt-1 text-xs text-gray-400">Sim, verificamos os links e preços semanalmente. Mas os valores podem mudar a qualquer momento nas plataformas parceiras.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Como faço para aparecer no site?</h3>
              <p className="mt-1 text-xs text-gray-400">Envie sua sugestão pelo email acima. Se o produto tiver qualidade, preço justo e combinar com nossa curadoria, publicamos ele com carinho.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

