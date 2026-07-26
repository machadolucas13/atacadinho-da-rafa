"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { excluirInscritoNewsletter } from "@/app/actions/newsletter";

type Inscrito = {
  id: string;
  email: string;
  prefs: string;
  dataCriacao?: any;
};

export default function AdminNewsletterPage() {
  const [inscritos, setInscritos] = useState<Inscrito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregar = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      if ((data as any).error) {
        setError((data as any).error || "Não autorizado");
        setInscritos([]);
      } else {
        setInscritos((data as any).inscritos || []);
      }
    } catch (e) {
      console.error(e);
      setError("Erro ao carregar newsletter");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleExcluir = async (id: string) => {
    if (!confirm("Excluir este inscrito?")) return;
    const result = await excluirInscritoNewsletter(id);
    if ((result as any).ok) {
      setInscritos((prev) => prev.filter((i) => i.id !== id));
    } else {
      alert((result as any).error || "Erro ao excluir");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Newsletter</h1>
        <p className="mt-2 text-gray-400">
          Lista de emails inscritos. Use estes emails para enviar campanhas manualmente pelo seu Gmail.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F4A7B9] border-t-transparent" />
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Preferências</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {inscritos.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                      Nenhum inscrito ainda.
                    </td>
                  </tr>
                )}
                {inscritos.map((inscrito) => (
                  <tr key={inscrito.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{inscrito.email}</td>
                    <td className="px-4 py-3 text-gray-300">{inscrito.prefs}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {inscrito.dataCriacao?.toDate?.()
                        ? inscrito.dataCriacao.toDate().toLocaleDateString("pt-BR")
                        : new Date(inscrito.dataCriacao).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleExcluir(inscrito.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
