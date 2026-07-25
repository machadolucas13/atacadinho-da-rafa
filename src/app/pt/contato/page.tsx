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
            Dúvidas, sugestões, parcerias ou feedback? Estamos aqui para ouvir você.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Email</h2>
            <p className="mt-2 text-gray-300">
              Para dúvidas, sugestões ou parcerias, envie um email para:
            </p>
            <a
              href="mailto:atacadinhodarafa@hotmail.com"
              className="mt-4 inline-flex items-center gap-2 text-[#F4A7B9] font-medium hover:text-white transition-colors"
            >
              atacadinhodarafa@hotmail.com
            </a>
            <p className="mt-4 text-sm text-gray-400">
              Respondemos em até 48 horas úteis.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Contato direto</h2>
            <p className="mt-2 text-gray-300">
              Envie um email para dúvidas, sugestões ou parcerias:
            </p>
            <a
              href="mailto:atacadinhodarafa@hotmail.com"
              className="mt-4 inline-flex items-center gap-2 text-[#F4A7B9] font-medium hover:text-white transition-colors"
            >
              atacadinhodarafa@hotmail.com
            </a>
            <p className="mt-4 text-sm text-gray-400">
              Respondemos em até 48 horas úteis.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white">Parcerias</h2>
          <p className="mt-2 text-gray-300">
            Se você representa uma marca, loja ou plataforma e quer propor uma parceria, entre em contato pelo email acima com o assunto "Parceria". Adoramos conhecer novas marcas e trazer os melhores produtos para nossa comunidade.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white">Sugestões de produtos</h2>
          <p className="mt-2 text-gray-300">
            Tem um produto que você ama e quer que a gente teste? Manda para a gente! Adoramos receber indicações da comunidade. Se o produto for aprovado na nossa curadoria, ele aparece aqui no site.
          </p>
        </div>
      </div>
    </div>
  );
}
