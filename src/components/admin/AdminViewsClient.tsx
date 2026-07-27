"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";

type ViewItem = {
  slug: string;
  tipo: "artigo" | "pin" | "produto";
  titulo: string;
  views: number;
};

type AdminViewsResponse = {
  views: Record<string, number>;
};

export default function AdminViewsClient() {
  const [items, setItems] = useState<ViewItem[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        setError(null);
        const [allRes, viewsRes] = await Promise.all([
          fetch("/api/admin/all-content"),
          fetch("/api/admin/views"),
        ]);

        const allData = allRes.ok ? await allRes.json() : { items: [] };
        const viewsData: AdminViewsResponse = viewsRes.ok ? await viewsRes.json() : { views: {} };

        if (cancelled) return;
        const map = new Map(
          Object.entries(viewsData.views || {}).map(([k, v]) => [k, typeof v === "number" ? v : 0])
        );
        const rawItems = (allData.items || []) as Array<{ slug: string; tipo: string; titulo: string }>;
        const next: ViewItem[] = rawItems.map((item) => ({
          slug: item.slug,
          tipo: item.tipo as ViewItem["tipo"],
          titulo: item.titulo,
          views: map.get(item.slug) || 0,
        }));
        next.sort((a, b) => b.views - a.views);
        setItems(next);
        setTotalViews(next.reduce((acc: number, item: ViewItem) => acc + item.views, 0));
        setReady(true);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erro ao carregar visualizações");
          console.error("[admin/views] polling error:", err);
        }
      }
    }, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

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
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Visualizações</h1>
          <p className="mt-2 text-sm text-gray-400">
            Contagem real de acessos por artigo, pin e produto. Atualizada em tempo real.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-xl font-bold text-white">{totalViews.toLocaleString("pt-BR")}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        {error && (
          <div className="px-4 py-3 text-sm text-red-400 border-b border-white/10">
            {error}
          </div>
        )}
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-gray-400">
            <tr>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Título / Slug</th>
              <th className="px-4 py-3 text-right">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {!ready && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  Carregando visualizações...
                </td>
              </tr>
            )}
            {ready && items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  Nenhuma visualização registrada ainda.
                </td>
              </tr>
            )}
            {items.map((item) => (
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
    </>
  );
}
