"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { atualizarCupom, excluirCupom } from "@/app/actions/admin";
import { Cupom } from "@/types";

interface EditarCupomProps {
  params: { id: string };
}

export default function EditarCupom({ params }: EditarCupomProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<Cupom>({
    id: params.id,
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "",
    descricao: "",
    url: "",
    validade: "",
    ativo: true,
  });

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch(`/api/admin/cupons`);
        const data = await res.json();
        const cupom = data.cupons.find((c: Cupom) => c.id === params.id);
        if (cupom) {
          setForm(cupom);
        }
      } catch (e) {
        console.error("Erro ao carregar cupom", e);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, typeof value === "boolean" ? String(value) : value);
    });

    const result: any = await atualizarCupom(form.id, payload);
    if (result.ok) {
      setStatus("Cupom atualizado com sucesso!");
    } else {
      setStatus(result.error || "Erro ao atualizar cupom.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este cupom?")) return;
    const result: any = await excluirCupom(form.id);
    if (result.ok) {
      router.push("/admin/dashboard");
    } else {
      alert(result.error || "Erro ao excluir cupom.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a14]">
        <AdminNav />
        <div className="mx-auto max-w-2xl px-4 py-8 text-center text-gray-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Editar Cupom</h1>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Marketplace</label>
            <select
              value={form.marketplace}
              onChange={(e) => {
                const colors: Record<string, string> = {
                  Shopee: "#ee4d2d",
                  Amazon: "#232f3e",
                  MercadoLivre: "#fff159",
                  SHEIN: "#000000",
                };
                setForm({ ...form, marketplace: e.target.value, marketplaceColor: colors[e.target.value] || "#ffffff" });
              }}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            >
              <option value="Shopee">Shopee</option>
              <option value="Amazon">Amazon</option>
              <option value="MercadoLivre">Mercado Livre</option>
              <option value="SHEIN">SHEIN</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Código</label>
            <input
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Descrição</label>
            <textarea
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Link da Oferta</label>
            <input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Validade</label>
            <input
              type="date"
              value={form.validade}
              onChange={(e) => setForm({ ...form, validade: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="ativo"
              type="checkbox"
              checked={form.ativo}
              onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#E11D48] focus:ring-[#E11D48]"
            />
            <label htmlFor="ativo" className="text-sm text-gray-300">Ativo</label>
          </div>

          <button type="submit" className="btn-primary w-full py-2.5 text-sm font-bold">
            Atualizar Cupom
          </button>

          {status && <p className="text-sm text-gray-300">{status}</p>}
        </form>
      </div>
    </div>
  );
}
