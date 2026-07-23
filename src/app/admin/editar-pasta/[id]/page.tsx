"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AdminNav from "@/components/admin/AdminNav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EditarPastaProps {
  params: { id: string };
}

export default function EditarPasta({ params }: EditarPastaProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<any[]>([]);

  const [form, setForm] = useState({
    nome: "",
    slug: "",
    descricao: "",
    imagemCapa: "",
    categoriaId: "",
    destaque: false,
    ativo: true,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    const carregar = async () => {
      const snap = await getDoc(doc(db, "pastas", params.id));
      if (!snap.exists()) {
        setStatus("Pasta não encontrada.");
        setLoading(false);
        return;
      }
      const data = snap.data();
      setForm({
        nome: data.nome || "",
        slug: data.slug || "",
        descricao: data.descricao || "",
        imagemCapa: data.imagemCapa || "",
        categoriaId: data.categoriaId || "",
        destaque: data.destaque || false,
        ativo: data.ativo ?? true,
      });
      if (data.imagemCapa) setPreview(data.imagemCapa);

      const catSnap = await getDocs(collection(db, "categorias"));
      setCategorias(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    carregar();
  }, [params.id]);

  const handleImagemChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = `pastas/${Date.now()}-${file.name}`;
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
    try {
      await updateDoc(doc(db, "pastas", params.id), {
        nome: form.nome,
        slug: form.slug,
        descricao: form.descricao,
        imagemCapa: form.imagemCapa,
        categoriaId: form.categoriaId,
        destaque: form.destaque,
        ativo: form.ativo,
        atualizadoEm: serverTimestamp(),
      });
      setStatus("Pasta atualizada com sucesso!");
      setTimeout(() => router.push("/admin/dashboard"), 600);
    } catch (error) {
      console.error(error);
      setStatus("Erro ao atualizar pasta.");
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
          <h1 className="mt-3 text-2xl font-bold text-white">Editar Pasta</h1>
        </div>

        {status && (
          <div className={`mt-4 rounded-lg p-4 text-sm border ${status.includes("sucesso") ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input
            placeholder="Nome da pasta"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            required
          />
          <input
            placeholder="Slug"
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
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E11D48] file:text-white hover:file:bg-[#be123c]"
            />
            {preview && (
              <div className="mt-3 relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
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
