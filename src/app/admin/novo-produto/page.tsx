"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import AdminNav from "@/components/admin/AdminNav";
import { criarProduto } from "@/app/actions/admin";

export default function NovoProduto() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const res = await fetch("/api/categorias");
        const data = await res.json();
        setCategorias(data.categorias || []);
      } catch (e) {
        console.error("Erro ao carregar categorias", e);
      }
    };
    carregarCategorias();
  }, []);

  const [form, setForm] = useState({
    nome: "",
    slug: "",
    descricao: "",
    descricaoCurta: "",
    imagemPrincipal: "",
    preco: "",
    precoOriginal: "",
    linkAfiliado: "",
    loja: "",
    tags: "",
    categoriaId: "",
    destaque: false,
    viral: false,
    ativo: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, typeof value === "boolean" ? String(value) : value);
    });

    const result = await criarProduto(payload);
    if ((result as any).ok) {
      setStatus("Produto criado com sucesso!");
      setForm({
        nome: "",
        slug: "",
        descricao: "",
        descricaoCurta: "",
        imagemPrincipal: "",
        preco: "",
        precoOriginal: "",
        linkAfiliado: "",
        loja: "",
        tags: "",
        categoriaId: "",
        destaque: false,
        viral: false,
        ativo: true,
      });
    } else {
      setStatus((result as any).error || "Erro ao criar produto.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Novo Produto</h1>

        {status && (
          <div className={`mt-4 rounded-lg p-4 text-sm border ${status.includes("sucesso") ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input
            placeholder="Nome do produto"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            required
          />
          <input
            placeholder="Slug (ex: body-de-renda-preto)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            required
          />
          <textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
          />
          <input
            placeholder="Descrição curta"
            value={form.descricaoCurta}
            onChange={(e) => setForm({ ...form, descricaoCurta: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Imagem principal</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  const path = `produtos/${Date.now()}-${file.name}`;
                  const storageRef = ref(storage, path);
                  await uploadBytes(storageRef, file);
                  const url = await getDownloadURL(storageRef);
                  setForm({ ...form, imagemPrincipal: url });
                } catch (error) {
                  console.error("Erro no upload:", error);
                }
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300"
            />
            {form.imagemPrincipal && (
              <div className="mt-3 relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
                <img src={form.imagemPrincipal} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Preço"
              type="number"
              step="0.01"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
              required
            />
            <input
              placeholder="Preço original (opcional)"
              type="number"
              step="0.01"
              value={form.precoOriginal}
              onChange={(e) => setForm({ ...form, precoOriginal: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            />
          </div>
          <input
            placeholder="Link afiliado"
            value={form.linkAfiliado}
            onChange={(e) => setForm({ ...form, linkAfiliado: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            required
          />
          <input
            placeholder="Loja (Shopee, Mercado Livre, Amazon)"
            value={form.loja}
            onChange={(e) => setForm({ ...form, loja: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            required
          />
          <select
            value={form.categoriaId}
            onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#F4A7B9] focus:outline-none"
          >
            <option value="">Sem categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-[#0a0a14]">
                {cat.nome}
              </option>
            ))}
          </select>
          <input
            placeholder="Tags separadas por vírgula"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
          />
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={form.destaque}
                onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
              />
              Destaque
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={form.viral}
                onChange={(e) => setForm({ ...form, viral: e.target.checked })}
              />
              Viral
            </label>
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={form.ativo}
                onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              />
              Ativo
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#F67C6F] py-3 text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01]"
          >
            Criar Produto
          </button>
        </form>
      </div>
    </div>
  );
}
