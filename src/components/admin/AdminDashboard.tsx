"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { getArtigos } from "@/lib/artigos";
import { getPastas } from "@/lib/pastas";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Sparkles, FolderOpen, FileText, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [artigos, setArtigos] = useState<any[]>([]);
  const [pastas, setPastas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  useEffect(() => {
    if (!isAdmin) return;
    const carregar = async () => {
      setLoading(true);
      try {
        const [a, p] = await Promise.all([getArtigos(), getPastas()]);
        setArtigos(a);
        setPastas(p);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [isAdmin]);

  const excluirArtigo = async (id: string) => {
    if (!confirm("Excluir este post/pin?")) return;
    await deleteDoc(doc(db, "artigos", id));
    setArtigos((prev) => prev.filter((a) => a.id !== id));
  };

  if (!isAdmin) {
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

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
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
                {artigos.map((artigo) => (
                  <li
                    key={artigo.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{artigo.titulo}</p>
                      <p className="text-xs text-gray-400">/{artigo.slug}</p>
                    </div>
                    <button
                      onClick={() => excluirArtigo(artigo.id)}
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
                {pastas.map((pasta) => (
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
            <li>Tudo aparece automaticamente no site. Nada de mexer no Firestore.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
