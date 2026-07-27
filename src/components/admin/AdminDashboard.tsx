"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { excluirArtigo, excluirPasta } from "@/app/actions/admin";
import { Sparkles, FolderOpen, FileText, Trash2, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [artigos, setArtigos] = useState<any[]>([]);
  const [pastas, setPastas] = useState<any[]>([]);
  const [syncStatus, setSyncStatus] = useState<string>("");
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  const syncCoupons = async () => {
    setSyncing(true);
    setSyncStatus("");
    try {
      const res = await fetch("/api/admin/cupons/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: process.env.NEXT_PUBLIC_ADMIN_SECRET }),
      });
      const data = await res.json();
      if (data.ok) {
        setSyncStatus(`Sincronizado! ${data.summary.inserted} inseridos, ${data.summary.updated} atualizados.`);
      } else {
        setSyncStatus(data.error || "Erro na sincronização.");
      }
    } catch (e) {
      setSyncStatus("Erro ao sincronizar cupons.");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        const [aRes, pRes] = await Promise.all([
          fetch("/api/admin/artigos"),
          fetch("/api/admin/pastas"),
        ]);
        const aData = await aRes.json();
        const pData = await pRes.json();
        setArtigos((aData.artigos || []) as any[]);
        setPastas((pData.pastas || []) as any[]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const handleExcluirArtigo = async (id: string) => {
    if (!confirm("Excluir este post/pin?")) return;
    const result = await excluirArtigo(id);
    if ((result as any).ok) {
      setArtigos((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert((result as any).error || "Erro ao excluir");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a14]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F4A7B9] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Painel Admin</h1>
        <p className="mt-2 text-gray-400">
          Crie posts, pastas e artigos. Tudo que você publicar aqui aparece no site automaticamente.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <a
            href="/admin/novo-post"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-[#F4A7B9] hover:bg-white/10"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E11D48]/10 text-2xl">
              📌
            </div>
            <h3 className="mt-4 font-semibold text-white">Novo Post / Pin</h3>
            <p className="mt-2 text-sm text-gray-400">
              Ex: "30 calças jeans de R$15 a R$400"
            </p>
          </a>
          <a
            href="/admin/nova-pasta"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-[#F4A7B9] hover:bg-white/10"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4A7B9]/10 text-2xl">
              📁
            </div>
            <h3 className="mt-4 font-semibold text-white">Nova Pasta</h3>
            <p className="mt-2 text-sm text-gray-400">Coleção de produtos</p>
          </a>
          <a
            href="/admin/novo-artigo"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-[#F4A7B9] hover:bg-white/10"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4A261]/10 text-2xl">
              📝
            </div>
            <h3 className="mt-4 font-semibold text-white">Novo Artigo</h3>
            <p className="mt-2 text-sm text-gray-400">Texto para o blog</p>
          </a>
          <a
            href="/admin/importar-produto"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-[#F4A7B9] hover:bg-white/10"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E11D48]/10 text-2xl">
              🛒
            </div>
            <h3 className="mt-4 font-semibold text-white">Importar Produto</h3>
            <p className="mt-2 text-sm text-gray-400">Colar link e publicar</p>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Coletor de Cupons</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Sincronize cupons automaticamente das plataformas de afiliados.
                </p>
              </div>
              <button
                type="button"
                onClick={syncCoupons}
                disabled={syncing}
                className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-bold disabled:opacity-70"
              >
                {syncing ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {syncing ? "Sincronizando..." : "Sincronizar Agora"}
              </button>
            </div>

            {syncStatus && (
              <p className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
                {syncStatus}
              </p>
            )}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs text-gray-400">
              <div>
                <strong className="text-white">Shopee</strong>
                <p>API GraphQL oficial</p>
                <p>Credenciais: App ID + Secret</p>
              </div>
              <div>
                <strong className="text-white">Amazon</strong>
                <p>Creators API / PA-API</p>
                <p>Credenciais: Associate Tag + Keys</p>
              </div>
              <div>
                <strong className="text-white">Mercado Livre</strong>
                <p>API de Afiliados</p>
                <p>Credenciais: App ID + Token</p>
              </div>
              <div>
                <strong className="text-white">SHEIN</strong>
                <p>Sem API pública</p>
                <p>Usar entradas manuais/alternativas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Posts / Pins</h2>
            {loading ? (
              <p className="mt-4 text-sm text-gray-400">Carregando...</p>
            ) : artigos.length === 0 ? (
              <p className="mt-4 text-sm text-gray-400">Nenhum post ainda.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {artigos.slice(0, 20).map((artigo) => (
                  <li
                    key={artigo.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{artigo.titulo}</p>
                      <p className="text-xs text-gray-400">/{artigo.slug}</p>
                    </div>
                    <button
                      onClick={() => handleExcluirArtigo(artigo.id)}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Pastas</h2>
            {loading ? (
              <p className="mt-4 text-sm text-gray-400">Carregando...</p>
            ) : pastas.length === 0 ? (
              <p className="mt-4 text-sm text-gray-400">Nenhuma pasta ainda.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {pastas.slice(0, 20).map((pasta) => (
                  <li key={pasta.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-medium text-white">{pasta.nome}</p>
                    <p className="text-xs text-gray-400">/{pasta.slug}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Como funciona</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-400">
            <li>
              <strong className="text-white">Novo Post / Pin</strong> = o formato principal. Um post pode ter vários produtos dentro dele, tipo uma lista de achados.
            </li>
            <li>
              <strong className="text-white">Nova Pasta</strong> = coleções organizadas por tema.
            </li>
            <li>
              <strong className="text-white">Novo Artigo</strong> = texto mais longo para o blog.
            </li>
            <li>Use os botões <span className="text-[#F4A7B9]">Editar</span> para ajustar qualquer item já publicado.</li>
            <li>Tudo aparece automaticamente no site. Nada de mexer no Firestore.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

