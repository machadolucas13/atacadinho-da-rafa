import Image from "next/image";
import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import { getCategorias } from "@/lib/categorias";
import { getProdutos } from "@/lib/produtos";
import { categorias as categoriasLocais } from "@/data/categorias";
import { Shirt, Home, UtensilsCrossed, Cpu, Sparkles, Watch, Baby, PawPrint, Dumbbell, BookOpen, Tag, Flame, HeartPulse, Flower2, Footprints, PartyPopper, Plane, Trees } from "lucide-react";

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

export default async function CategorySection() {
  let categorias = await getCategorias();
  const produtos = await getProdutos();

  if (!categorias || categorias.length === 0) {
    categorias = categoriasLocais;
  }

  const categoriaComContagem = categorias.map((cat) => {
    const count = produtos.filter((p) => p.categoriaId === cat.id).length;
    return { ...cat, count };
  });

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Explore por Categoria
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Toque para descobrir coleções especiais
        </p>
      </div>

      {categoriaComContagem.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categoriaComContagem.map((categoria) => {
            const Icon = iconMap[categoria.nome] || Tag;
            return (
            <Link
              key={categoria.id}
              href={`/categorias/${categoria.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition-all duration-400 hover:shadow-card-hover hover:-translate-y-1"
            >
              {categoria.imagem && (
                <Image
                  src={categoria.imagem}
                  alt={categoria.nome}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-4">
                <span className="mb-2 text-3xl flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-white line-clamp-1">{categoria.nome}</span>
                <span className="mt-0.5 text-[11px] font-medium text-gray-300">
                  {categoria.count} {categoria.count === 1 ? "produto" : "produtos"}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                  Ver mais →
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 py-12 text-center">
          <p className="text-sm text-gray-400">Em breve: categorias especiais para você explorar.</p>
        </div>
      )}
    </section>
  );
}
