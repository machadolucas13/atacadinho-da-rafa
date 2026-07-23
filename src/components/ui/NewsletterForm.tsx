"use client";

import { useState } from "react";
import { inscreverNewsletter } from "@/app/actions/newsletter";

export default function NewsletterForm({ locale = "pt" }: { locale?: "pt" | "en" }) {
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useState("tudo");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await inscreverNewsletter(new FormData(e.target as HTMLFormElement));
    if ((result as any).error) {
      setError((result as any).error);
    } else {
      setSent(true);
    }
  };

  const text = {
    pt: {
      title: "Não perca nenhum achado",
      subtitle: "Receba semanalmente os melhores produtos, dicas e ofertas diretamente no seu e-mail.",
      placeholder: "Seu melhor e-mail",
      button: "Quero receber",
      success: "Inscrição confirmada! Quando tiver novidades, você recebe no seu email.",
      error: "Erro ao se inscrever. Tente novamente.",
      labelPrefs: "Quero receber:",
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
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="prefs" value="tudo" checked={prefs === "tudo"} onChange={() => setPrefs("tudo")} />
            {text.optionTudo}
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="prefs" value="feminino" checked={prefs === "feminino"} onChange={() => setPrefs("feminino")} />
            {text.optionFeminino}
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="prefs" value="infantil" checked={prefs === "infantil"} onChange={() => setPrefs("infantil")} />
            {text.optionInfantil}
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="prefs" value="casa" checked={prefs === "casa"} onChange={() => setPrefs("casa")} />
            {text.optionCasa}
          </label>
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{text.error}</p>}
      {sent && <p className="mt-3 text-xs text-[#F4A7B9]">{text.success}</p>}
    </div>
  );
}
