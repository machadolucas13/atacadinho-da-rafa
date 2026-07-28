"use client";

import { useState } from "react";
import { inscreverNewsletter } from "@/app/actions/newsletter";
import { trackSignup } from "@/lib/pinterest-events";

export default function NewsletterForm({ locale = "pt" }: { locale?: "pt" | "en" }) {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const result = await inscreverNewsletter(formData);
      if ((result as any).error) {
        setError((result as any).error);
      } else {
        setSent(true);
        setEmail("");
        setMensagem("");
        trackSignup("newsletter");
      }
    } catch (err) {
      setError("Erro ao se inscrever. Tente novamente.");
    }
  };

  const text = {
    pt: {
      title: "Não perca nenhum achado",
      subtitle: "Quer receber mais achados? Deixe seu e-mail e diga o que você está procurando.",
      placeholder: "Seu melhor e-mail",
      button: "Quero receber",
      success: "Enviado! Quando tiver achados, você recebe no seu e-mail.",
      error: "Erro ao se inscrever. Tente novamente.",
      labelPrefs: "O que você quer receber?",
      optionTudo: "Todos os achados",
      optionFeminino: "Moda feminina",
      optionInfantil: "Moda infantil e bebês",
      optionCasa: "Casa e decoração",
      optionEsporte: "Esportes e fitness",
    },
    en: {
      title: "Don't miss any find",
      subtitle: "Get weekly best products, tips and deals straight to your email.",
      placeholder: "Your best email",
      button: "Subscribe",
      success: "Subscription confirmed! You'll receive updates by email.",
      error: "Subscription failed. Please try again.",
      labelPrefs: "I want to receive:",
      optionTudo: "All finds",
      optionFeminino: "Women's fashion",
      optionInfantil: "Kids & baby fashion",
      optionCasa: "Home & decor",
      optionEsporte: "Sports & fitness",
    },
  }[locale];

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#E11D48]/10 via-[#F4A7B9]/5 to-transparent p-8 md:p-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{text.title}</h2>
      <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{text.subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={text.placeholder}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:border-[#F4A7B9] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F4A7B9]/30"
          required
        />
        <button
          type="submit"
          disabled={sent}
          className="rounded-2xl bg-[#E11D48] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c] hover:shadow-lg hover:shadow-[#E11D48]/25 disabled:opacity-70"
        >
          {sent ? "✨" : text.button}
        </button>
      </form>

      <div className="max-w-md mx-auto text-left">
        <p className="text-xs font-semibold text-gray-300 mb-2">{text.labelPrefs}</p>
        <input
          type="text"
          name="prefs"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:border-[#F4A7B9] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F4A7B9]/30"
          placeholder="Ex: moda feminina, casa, eletrônicos..."
          required
        />
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{text.error}</p>}
      {sent && (
        <p className="mt-3 text-xs font-semibold text-green-400">
          {text.success}
        </p>
      )}
    </div>
  );
}

