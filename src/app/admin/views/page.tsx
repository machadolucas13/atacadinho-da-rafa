import AdminNav from "@/components/admin/AdminNav";
import { adminDb } from "@/server/firebase-admin";
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

  let viewsSnapshot: any[] = [];
  try {
    const snap = await adminDb.collection("visualizacoes").get();
    viewsSnapshot = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar visualizações:", error);
  }

  const items: ViewItem[] = [
    ...artigos.map((a) => ({ slug: a.slug, tipo: "artigo" as const, titulo: a.titulo, views: 0 })),
    ...pins.map((p) => ({ slug: p.slug, tipo: "pin" as const, titulo: p.titulo, views: 0 })),
    ...produtos.map((p) => ({ slug: p.slug, tipo: "produto" as const, titulo: p.nome, views: 0 })),
  ];

  const viewsMap = new Map(viewsSnapshot.map((v) => [v.slug, typeof v.views === "number" ? v.views : 0]));

  const merged: ViewItem[] = items
    .map((item) => ({
      ...item,
      views: viewsMap.get(item.slug) || 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 120);

  const totalViews = merged.reduce((acc, item) => acc + item.views, 0);

  const tipoLabel: Record<string, string> = {
    artigo: "Artigo",
    pin: "Pin",
    produto: "Produto",
  };

  const tipoClass: Record<string, string> = {
    artigo: "bg-[#E11D48]/10 text-[#F4A7B9]",
    pin: "bg-[#F4A261]/10 text-[#F4A261]",
    produto: "bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Visualizações</h1>
            <p className="mt-2 text-sm text-gray-400">
              Contagem real de acessos por artigo, pin e produto. Atualizada a cada 60 segundos.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-xl font-bold text-white">{totalViews.toLocaleString("pt-BR")}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Título / Slug</th>
                <th className="px-4 py-3 text-right">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {merged.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                    Nenhuma visualização registrada ainda.
                  </td>
                </tr>
              )}
              {merged.map((item) => (
                <tr key={`${item.tipo}-${item.slug}`} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${tipoClass[item.tipo]}`}>
                      {tipoLabel[item.tipo]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium line-clamp-1">{item.titulo}</p>
                    <p className="text-xs text-gray-500">/{item.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-white font-semibold">{item.views.toLocaleString("pt-BR")}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
