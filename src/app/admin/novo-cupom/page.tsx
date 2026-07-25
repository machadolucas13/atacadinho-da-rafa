"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { criarCupom } from "@/app/actions/admin";

export default function NovoCupom() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    codigo: "",
    descricao: "",
    url: "",
    validade: "",
    ativo: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, typeof value === "boolean" ? String(value) : value);
    });

    const result: any = await criarCupom(payload);
    if (result.ok) {
      setStatus("Cupom criado com sucesso!");
      setForm({
        marketplace: "Shopee",
        marketplaceColor: "#ee4d2d",
        codigo: "",
        descricao: "",
        url: "",
        validade: "",
        ativo: true,
      });
      router.push("/admin/dashboard");
    } else {
      setStatus(result.error || "Erro ao criar cupom.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Novo Cupom</h1>
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
            Salvar Cupom
          </button>

          {status && <p className="text-sm text-gray-300">{status}</p>}
        </form>
      </div>
    </div>
  );
}
