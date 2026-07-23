"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import AdminNav from "@/components/admin/AdminNav";
import { atualizarArtigo } from "@/app/actions/admin";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EditarArtigoProps {
  params: { id: string };
}

export default function EditarArtigo({ params }: EditarArtigoProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<any[]>([]);

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    descricao: "",
    conteudo: "",
    imagemCapa: "",
    categoriaId: "",
    tags: "",
    destaque: false,
    ativo: true,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        const [artigosRes, categoriasRes] = await Promise.all([
          fetch("/api/admin/artigos"),
          fetch("/api/admin/categorias"),
        ]);
        const artigosData = await artigosRes.json();
        const categoriasData = await categoriasRes.json();
        const artigos = artigosData.artigos || [];
        setCategorias(categoriasData.categorias || []);
        const artigo = artigos.find((a: any) => a.id === params.id);
        if (!artigo) {
          setStatus("Artigo não encontrado.");
          setLoading(false);
          return;
        }
        setForm({
          titulo: artigo.titulo || "",
          slug: artigo.slug || "",
          descricao: artigo.descricao || "",
          conteudo: artigo.conteudo || "",
          imagemCapa: artigo.imagemCapa || "",
          categoriaId: artigo.categoriaId || "",
          tags: Array.isArray(artigo.tags) ? artigo.tags.join(", ") : "",
          destaque: artigo.destaque || false,
          ativo: artigo.ativo ?? true,
        });
        if (artigo.imagemCapa) setPreview(artigo.imagemCapa);
      } catch (e) {
        setStatus("Erro ao carregar artigo.");
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [params.id]);

  const handleImagemChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = `artigos/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm({ ...form, imagemCapa: url });
      setPreview(url);
    } catch (error) {
      console.error("Erro no upload:", error);
      setStatus("Erro no upload da imagem.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, typeof value === "boolean" ? String(value) : value);
    });

    const result = await atualizarArtigo(params.id, payload);
    if ((result as any).ok) {
      setStatus("Artigo atualizado com sucesso!");
      setTimeout(() => router.push("/admin/dashboard"), 600);
    } else {
      setStatus((result as any).error || "Erro ao atualizar artigo.");
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o dashboard
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-white">Editar Artigo</h1>
        </div>

        {status && (
          <div className={`mt-4 rounded-lg p-4 text-sm border ${status.includes("sucesso") ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Título do artigo</label>
            <input
              placeholder="Ex: 30 calças jeans de R$15 a R$400"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">URL do post</label>
            <div className="mt-1 flex rounded-xl border border-white/10 overflow-hidden">
              <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-white/5 border-r border-white/10">
                /artigos/
              </span>
              <input
                placeholder="slug-do-artigo"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="flex-1 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none bg-white/5"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Descrição curta</label>
            <textarea
              placeholder="Uma frase resumindo o artigo..."
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Conteúdo do post (HTML permitido)</label>
            <textarea
              placeholder="Escreva o artigo aqui..."
              value={form.conteudo}
              onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
              rows={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Imagem de capa</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E11D48] file:text-white hover:file:bg-[#be123c]"
            />
            {preview && (
              <div className="mt-3 relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

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
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}
