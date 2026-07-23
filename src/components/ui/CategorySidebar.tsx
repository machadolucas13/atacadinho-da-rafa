"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import { X } from "lucide-react";
import { getCategorias } from "@/lib/categorias";

export default function CategorySidebar({ locale = "pt" }: { locale?: "pt" | "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    getCategorias().then(setCategorias);
  }, []);

  const texts = {
    pt: { title: "Categorias", close: "Fechar" },
    en: { title: "Categories", close: "Close" },
  }[locale];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-1/2 z-40 hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 transition-all hover:border-[#F4A7B9] hover:text-white"
      >
        📂 {texts.title}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-[#0a0a14]/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">{texts.title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-gray-400 transition-colors hover:text-white"
                aria-label={texts.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id}
                  href={`/${locale}/categorias/${categoria.slug}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{categoria.icone}</span>
                  <div>
                    <span className="block text-white">{categoria.nome}</span>
                    <span className="text-xs text-gray-500">{categoria.descricao}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
