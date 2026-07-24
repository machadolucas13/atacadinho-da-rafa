"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Shirt, Home, UtensilsCrossed, Cpu, Sparkles, Watch, Baby, PawPrint, Dumbbell, BookOpen, Tag, Flame, HeartPulse, Flower2, Footprints, PartyPopper, Plane, Trees, ChevronRight } from "lucide-react";
import { getCategorias } from "@/lib/categorias";
import { categorias as categoriasLocais } from "@/data/categorias";

const iconMap: Record<string, React.ElementType> = {
  "Moda Feminina": Shirt,
  "Moda Masculina": Shirt,
  "Casa e Decoração": Home,
  "Cozinha": UtensilsCrossed,
  "Tecnologia": Cpu,
  "Beleza": Sparkles,
  "Acessórios": Watch,
  "Moda Infantil": Baby,
  "Bebês": Baby,
  "Pets": PawPrint,
  "Esportes": Dumbbell,
  "Livros": BookOpen,
  "Ofertas": Tag,
  "Achados Virais": Flame,
  "Saúde e Bem-estar": HeartPulse,
  "Perfumes": Flower2,
  "Calçados": Footprints,
  "Festas e Eventos": PartyPopper,
  "Viagens": Plane,
  "Jardim": Trees,
};

export default function CategorySidebar({ locale = "pt", isOpen, onClose }: { locale?: "pt" | "en"; isOpen?: boolean; onClose?: () => void }) {
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    getCategorias().then((data) => {
      if (data && data.length > 0) {
        setCategorias(data);
      } else {
        setCategorias(categoriasLocais);
      }
    });
  }, []);

  const IconFor = (nome: string) => iconMap[nome] || Tag;

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-[#0a0a14]/95 shadow-2xl backdrop-blur-xl transition-transform duration-300">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  Navegação
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:text-white hover:bg-white/10"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-0.5 overflow-y-auto h-[calc(100vh-80px)]">
                {categorias.map((categoria) => {
                  const Icon = IconFor(categoria.nome);
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
                      <span className="flex-1 text-white">{categoria.nome}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-white transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
