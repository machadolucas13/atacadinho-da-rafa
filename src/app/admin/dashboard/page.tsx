"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { getArtigos } from "@/lib/artigos";
import { getPastas } from "@/lib/pastas";
import { excluirArtigo, excluirPasta } from "@/app/actions/admin";
import { Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";

type ItemCard = {
  id: string;
  titulo?: string;
  nome?: string;
  criadoEm?: any;
};

export default function AdminProtectedPage() {
  const [posts, setPosts] = useState<ItemCard[]>([]);
  const [pastas, setPastas] = useState<ItemCard[]>([]);

  useEffect(() => {
    const carregar = async () => {
      setPosts([]);
      setPastas([]);
      try {
        const [postsSnap, pastasSnap] = await Promise.all([getArtigos(), getPastas()]);
        setPosts(
          postsSnap
            .slice(0, 5)
            .map((d) => ({ id: d.id, titulo: (d as any).titulo, nome: (d as any).nome } as ItemCard))
        );
        setPastas(
          pastasSnap
            .slice(0, 5)
            .map((d) => ({ id: d.id, titulo: (d as any).titulo, nome: (d as any).nome } as ItemCard))
        );
      } catch (e) {
        console.error("Erro ao carregar dashboard", e);
      }
    };
    carregar();
  }, []);

  const handleDelete = async (collectionName: string, id: string) => {
    if (!confirm("Tem certeza que deseja excluir este item? Essa ação não pode ser desfeita.")) return;
    let result;
    if (collectionName === "artigos") result = await excluirArtigo(id);
    else if (collectionName === "pastas") result = await excluirPasta(id);
    else result = { ok: false, error: "Tipo não suportado" };

    if ((result as any).ok) {
      if (collectionName === "artigos") setPosts((prev) => prev.filter((item) => item.id !== id));
      if (collectionName === "pastas") setPastas((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert((result as any).error || "Erro ao excluir.");
    }
  };

  const renderList = (titulo: string, items: ItemCard[], tipo: "post" | "pasta") => {
    if (!items.length) return null;
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">{titulo}</h2>
          <Link
            href={tipo === "post" ? "/admin/novo-post" : "/admin/nova-pasta"}
            className="inline-flex items-center gap-1 rounded-full bg-[#E11D48] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#be123c] transition-colors"
          >
            <Plus className="h-3 w-3" />
            Novo
          </Link>
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-[#F4A7B9]/40 transition-colors"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{item.titulo || item.nome}</p>
                <p className="text-xs text-gray-400">ID: {item.id.slice(0, 8)}...</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/admin/editar-${tipo}/${item.id}`}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:border-[#F4A7B9] hover:text-white transition-colors"
                >
                  <Pencil className="h-3 w-3" />
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(tipo === "post" ? "artigos" : "pastas", item.id)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-red-300 hover:border-red-500 hover:text-red-200 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
          <p className="mt-2 text-gray-300">
            Crie, edite e exclua posts, pastas, artigos e produtos. Tudo aparece automaticamente no site.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="/admin/novo-post"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:shadow-card-hover hover:border-[#F4A7B9]/40 hover:-translate-y-1"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">
              📌
            </div>
            <h3 className="mt-4 font-semibold text-white">Novo Post / Pin</h3>
            <p className="mt-2 text-sm text-gray-400">
              Ex: "30 calças jeans de R$15 a R$400"
            </p>
          </Link>
          <Link
            href="/admin/nova-pasta"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:shadow-card-hover hover:border-[#F4A7B9]/40 hover:-translate-y-1"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">
              📁
            </div>
            <h3 className="mt-4 font-semibold text-white">Nova Pasta</h3>
            <p className="mt-2 text-sm text-gray-400">Coleção de produtos</p>
          </Link>
          <Link
            href="/admin/novo-artigo"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:shadow-card-hover hover:border-[#F4A7B9]/40 hover:-translate-y-1"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">
              📝
            </div>
            <h3 className="mt-4 font-semibold text-white">Novo Artigo</h3>
            <p className="mt-2 text-sm text-gray-400">Texto para o blog</p>
          </Link>
        </div>

        {renderList("Posts / Pins recentes", posts, "post")}
        {renderList("Pastas recentes", pastas, "pasta")}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Como funciona</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-300">
            <li>
              <strong>Novo Post / Pin</strong> = o formato principal. Um post pode ter
              vários produtos dentro dele, tipo uma lista de achados.
            </li>
            <li>
              <strong>Nova Pasta</strong> = coleções organizadas por tema.
            </li>
            <li>
              <strong>Novo Artigo</strong> = texto mais longo para o blog.
            </li>
            <li>Use os botões <span className="text-[#F4A7B9]">Editar</span> para ajustar qualquer item já publicado.</li>
            <li>Tudo aparece automaticamente no site. Nada de mexer no Firestore.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
