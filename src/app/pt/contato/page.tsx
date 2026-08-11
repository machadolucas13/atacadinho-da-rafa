"use client";

import { useState, FormEvent } from "react";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Contato</h1>
      <p className="text-gray-300 leading-relaxed mb-8">
        Envie sua mensagem, sugestão de pauta, parceria ou dúvida. Respondemos em até
        alguns dias úteis.
      </p>

      {sent ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-gray-200">
          Mensagem enviada com sucesso! Em breve entraremos em contato.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Nome</label>
            <input
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">E-mail</label>
            <input
              required
              type="email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Assunto</label>
            <input
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="Assunto"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Mensagem</label>
            <textarea
              required
              rows={6}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-[#F4A7B9]"
              placeholder="Escreva sua mensagem..."
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#F4A7B9] px-6 py-2.5 font-semibold text-black hover:bg-[#ff8fa3]"
          >
            Enviar mensagem
          </button>
        </form>
      )}

      <p className="mt-8 text-sm text-gray-400">
        Ou envie diretamente para:{" "}
        <a className="text-[#F4A7B9] hover:underline" href="mailto:contato@atacadinhodarafa.vercel.app">
          contato@atacadinhodarafa.vercel.app
        </a>
      </p>
    </div>
  );
}
