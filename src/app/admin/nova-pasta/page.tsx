"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import AdminNav from "@/components/admin/AdminNav";
import { criarPasta } from "@/app/actions/admin";

export default function NovaPasta() {
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
    imagemCapa: "",
    categoriaId: "",
    destaque: false,
  });

  const handleImagemChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = `pastas/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm({ ...form, imagemCapa: url });
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, typeof value === "boolean" ? String(value) : value);
    });

    const result = await criarPasta(payload);
    if ((result as any).ok) {
      setStatus("Pasta criada com sucesso!");
      setForm({ nome: "", slug: "", descricao: "", imagemCapa: "", categoriaId: "", destaque: false });
    } else {
      setStatus((result as any).error || "Erro ao criar pasta.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Nova Pasta / Coleção</h1>

        {status && <div className="mt-4 rounded-lg bg-green-900/30 p-4 text-sm text-green-400 border border-green-800">{status}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input
            placeholder="Nome (ex: 10 Bodies de Renda até R$100)"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            required
          />
          <input
            placeholder="Slug (ex: 10-bodies-de-renda-ate-100)"
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Imagem de capa</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300"
            />
            {form.imagemCapa && (
              <div className="mt-3 relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
                <img src={form.imagemCapa} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <select
            value={form.categoriaId}
            onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#F4A7B9] focus:outline-none"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-[#0a0a14]">
                {cat.nome}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={form.destaque}
              onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
            />
            Destaque
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#F67C6F] py-2.5 text-white shadow-md transition-all hover:shadow-lg"
          >
            Criar Pasta
          </button>
        </form>
      </div>
    </div>
  );
}
