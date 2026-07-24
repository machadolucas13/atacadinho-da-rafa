"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { X, Shirt, Home, UtensilsCrossed, Cpu, Sparkles, Watch, Baby, PawPrint, Dumbbell, BookOpen, Tag, Flame, HeartPulse, Flower2, Footprints, PartyPopper, Plane, Trees, ChevronRight } from "lucide-react";
import { categorias as categoriasLocais } from "@/data/categorias";

const iconMap: Record<string, React.ElementType> = {
  "moda-feminina": Shirt,
  "moda-masculina": Shirt,
  "casa-decoracao": Home,
  "cozinha": UtensilsCrossed,
  "tecnologia": Cpu,
  "beleza": Sparkles,
  "acessorios": Watch,
  "moda-infantil": Baby,
  "bebes": Baby,
  "pets": PawPrint,
  "esportes": Dumbbell,
  "livros": BookOpen,
  "ofertas": Tag,
  "achados-virais": Flame,
  "saude": HeartPulse,
  "perfumes": Flower2,
  "calcados": Footprints,
  "festas": PartyPopper,
  "viagens": Plane,
  "jardim": Trees,
};

type CategorySidebarProps = {
  locale?: "pt" | "en";
  isOpen?: boolean;
  onClose?: () => void;
};

export default function CategorySidebar({ locale = "pt", isOpen, onClose }: CategorySidebarProps) {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setCategorias(categoriasLocais);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimating(true);
      rafRef.current = requestAnimationFrame(() => {
        setAnimating(false);
      });
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    const timer = setTimeout(() => setVisible(false), 280);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const IconFor = (slug: string) => iconMap[slug] || Tag;

  if (!visible) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 opacity-100"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-[#0a0a14]/90 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out ${
          animating ? "translate-x-0" : isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ WebkitFontSmoothing: "antialiased" }}
        aria-label="Navegação lateral"
      >
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              {locale === "en" ? "Navigation" : "Navegação"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-gray-400 transition-colors hover:text-white hover:bg-white/10"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-0.5 overflow-y-auto h-[calc(100vh-80px)] pr-1 category-scroll">
            {categorias.map((categoria) => {
              const Icon = IconFor(categoria.slug);
              const name = locale === "en" ? (categoria.nomeEn || categoria.nome) : categoria.nome;
              return (
                <Link
                  key={categoria.id}
                  href={`/${locale}/categorias/${categoria.slug}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white group"
                  onClick={onClose}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white group-hover:bg-white/10 transition-colors">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-white">{name}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-white transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
