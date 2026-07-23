"use client";

import React, { useState, useEffect } from "react";
import { Heart, Bookmark } from "lucide-react";

type Item = {
  id: string;
  tipo: "artigo" | "produto";
  titulo: string;
  imagemCapa?: string;
  slug: string;
  adicionadoEm: number;
};

export default function SaveButton({ item }: { item: Omit<Item, "adicionadoEm"> }) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favoritos");
      const favoritos: Item[] = stored ? JSON.parse(stored) : [];
      const exists = favoritos.some((f) => f.tipo === item.tipo && f.slug === item.slug);
      setSaved(exists);
    }
  }, [item.tipo, item.slug]);

  const toggleSave = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const stored = localStorage.getItem("favoritos");
    const favoritos: Item[] = stored ? JSON.parse(stored) : [];

    if (saved) {
      const novo = favoritos.filter((f) => !(f.tipo === item.tipo && f.slug === item.slug));
      localStorage.setItem("favoritos", JSON.stringify(novo));
      setSaved(false);
    } else {
      favoritos.push({ ...item, adicionadoEm: Date.now() });
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      setSaved(true);
    }
  };

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full bg-white/10" />
    );
  }

  return (
    <button
      onClick={(e) => toggleSave(e)}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-300 shadow-sm transition-all hover:border-[#F4A7B9] hover:text-[#F4A7B9]"
    >
      {saved ? <Bookmark className="h-3.5 w-3.5 fill-current text-[#F4A7B9]" /> : <Heart className="h-3.5 w-3.5" />}
      <span>{saved ? "Salvo" : "Salvar"}</span>
    </button>
  );
}
