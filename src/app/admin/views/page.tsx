import AdminNav from "@/components/admin/AdminNav";
import AdminViewsClient from "@/components/admin/AdminViewsClient";
import { getArtigos } from "@/lib/artigos";
import { getPins } from "@/lib/pins";
import { getProdutos } from "@/lib/produtos";

type ViewItem = {
  slug: string;
  tipo: "artigo" | "pin" | "produto";
  titulo: string;
  views: number;
};

export default async function AdminViewsPage() {
  const [artigos, pins, produtos] = await Promise.all([
    getArtigos("pt"),
    getPins("pt"),
    getProdutos(),
  ]);

  let viewsMap = new Map<string, number>();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/views`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.views && typeof data.views === "object") {
        viewsMap = new Map(Object.entries(data.views).map(([k, v]) => [k, typeof v === "number" ? v : 0]));
      }
    }
  } catch (error) {
    console.error("Erro ao buscar visualizações no admin:", error);
  }

  const items: ViewItem[] = [
    ...artigos.map((a) => ({ slug: a.slug, tipo: "artigo" as const, titulo: a.titulo, views: 0 })),
    ...pins.map((p) => ({ slug: p.slug, tipo: "pin" as const, titulo: p.titulo, views: 0 })),
    ...produtos.map((p) => ({ slug: p.slug, tipo: "produto" as const, titulo: p.nome, views: 0 })),
  ];

  const merged: ViewItem[] = items
    .map((item) => ({
      ...item,
      views: viewsMap.get(item.slug) || 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 120);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdminViewsClient initialItems={merged} />
      </div>
    </div>
  );
}
