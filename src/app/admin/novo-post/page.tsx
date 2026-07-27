"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useAutoSave } from "@/hooks/useAutoSave";
import AdminNav from "@/components/admin/AdminNav";
import { parseProductText } from "@/lib/productParser";
import { Sparkles, Plus, Wand2 } from "lucide-react";
import { criarArtigoCompleto } from "@/app/actions/admin";

export default function NovoPost() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);
  const [preview, setPreview] = useState<string>("");
  const [produtoPreview, setProdutoPreview] = useState<Record<number, string>>({});
  const [smartMode, setSmartMode] = useState(false);
  const [rawText, setRawText] = useState("");
  const [gerando, setGerando] = useState(false);
  const [conteudoGerado, setConteudoGerado] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    descricao: "",
    conteudo: "",
    imagemCapa: "",
    categoriaId: "",
    tags: "",
    destaque: false,
  });

  const [produtos, setProdutos] = useState([
    { nome: "", preco: "", precoOriginal: "", linkAfiliado: "", loja: "", imagem: "", tags: "" },
  ]);

  const { clearDraft, loadDraft } = useAutoSave(form, [
    "titulo", "slug", "descricao", "conteudo", "imagemCapa", "categoriaId", "tags", "destaque",
    ...produtos.reduce((acc: string[], p, i) => {
      acc.push(`produto_${i}_nome`, `produto_${i}_preco`, `produto_${i}_precoOriginal`, `produto_${i}_linkAfiliado`, `produto_${i}_loja`, `produto_${i}_imagem`, `produto_${i}_tags`);
      return acc;
    }, []),
  ]);

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

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setForm({
        titulo: draft.titulo || "",
        slug: draft.slug || "",
        descricao: draft.descricao || "",
        conteudo: draft.conteudo || "",
        imagemCapa: draft.imagemCapa || "",
        categoriaId: draft.categoriaId || "",
        tags: draft.tags || "",
        destaque: draft.destaque || false,
      });
      setStatus("Rascunho recuperado!");
    }
  }, [loadDraft]);

  const adicionarProduto = () => {
    setProdutos([...produtos, { nome: "", preco: "", precoOriginal: "", linkAfiliado: "", loja: "", imagem: "", tags: "" }]);
  };

  const removerProduto = (index: number) => {
    setProdutos(produtos.filter((_, i) => i !== index));
    setProdutoPreview((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const atualizarProduto = (index: number, campo: string, valor: string) => {
    const novos = [...produtos];
    novos[index] = { ...novos[index], [campo]: valor };
    setProdutos(novos);
  };

  const handleImagemChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = `posts/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm({ ...form, imagemCapa: url });
      setPreview(url);
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };

  const handleImagemProduto = async (index: number, file: File) => {
    try {
      const path = `produtos/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      atualizarProduto(index, "imagem", url);
      setProdutoPreview((prev) => ({ ...prev, [index]: url }));
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };

  const handleSmartPaste = () => {
    const parsed = parseProductText(rawText);
    const newProduto = {
      nome: parsed.nome,
      preco: parsed.preco.toString(),
      precoOriginal: parsed.precoOriginal.toString(),
      linkAfiliado: parsed.linkAfiliado,
      loja: parsed.loja,
      imagem: "",
      tags: parsed.tags,
    };
    setProdutos([...produtos, newProduto]);
    setRawText("");
  };

  const gerarComIA = async () => {
    if (!form.titulo && !rawText) {
      setStatus("Escreva um título ou cole o texto do produto primeiro.");
      return;
    }
    setGerando(true);
    setStatus("Gerando conteúdo com IA...");
    try {
      const res = await fetch("/api/gerar-conteudo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "post",
          texto: rawText || form.titulo + " " + form.descricao,
          categoria: categorias.find((c: any) => c.id === form.categoriaId)?.nome || "",
        }),
      });
      const data = await res.json();
      if (data.sugestoes) {
        setConteudoGerado(data.sugestoes);
        setStatus("Conteúdo gerado! Revise e clique nos botões de compartilhar.");
      } else {
        setStatus("Erro ao gerar conteúdo.");
      }
    } catch {
      setStatus("Erro ao gerar conteúdo.");
    } finally {
      setGerando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, typeof value === "boolean" ? String(value) : value);
    });

    const produtosLimpos = produtos
      .filter((p) => p.nome || p.linkAfiliado)
      .map((p) => ({
        nome: p.nome,
        preco: p.preco,
        precoOriginal: p.precoOriginal,
        linkAfiliado: p.linkAfiliado,
        loja: p.loja || "Loja",
        imagem: p.imagem || "",
        tags: (p.tags || "").toString(),
        destaque: false,
        viral: false,
        ativo: true,
        visualizacoes: 0,
        cliques: 0,
        conversoes: 0,
      }));
    payload.append("produtos_json", JSON.stringify(produtosLimpos));

    const result = await criarArtigoCompleto(payload);
    if ((result as any).ok) {
      setStatus("Post criado com sucesso!");
      clearDraft();
      setForm({
        titulo: "",
        slug: "",
        descricao: "",
        conteudo: "",
        imagemCapa: "",
        categoriaId: "",
        tags: "",
        destaque: false,
      });
      setPreview("");
      setProdutos([
        { nome: "", preco: "", precoOriginal: "", linkAfiliado: "", loja: "", imagem: "", tags: "" },
      ]);
      setProdutoPreview({});
    } else {
      setStatus((result as any).error || "Erro ao criar post.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Novo Post / Pin</h1>
          <span className="text-xs text-gray-400">Auto-save ativo</span>
        </div>

        {status && (
          <div className="mt-4 rounded-lg bg-green-900/30 p-4 text-sm text-green-400 border border-green-800">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Título do post</label>
            <input
              placeholder="Ex: 30 calças jeans de R$15 a R$400"
              value={form.titulo}
              onChange={(e) => {
                const titulo = e.target.value;
                setForm({ ...form, titulo, slug: titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") });
              }}
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
                placeholder="30-calcas-jeans-baratas"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })}
                className="flex-1 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none bg-white/5"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Descrição curta</label>
            <textarea
              placeholder="Uma frase resumindo o post..."
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Conteúdo do post</label>
            <textarea
              placeholder="Escreva o artigo aqui... Você pode usar HTML se quiser."
              value={form.conteudo}
              onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
              rows={8}
              required
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
            <select
              value={form.categoriaId}
              onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#F4A7B9] focus:outline-none"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#0a0a14]">
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tags separadas por vírgula</label>
            <input
              placeholder="Ex: jeans, barato, moda feminina"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Produtos do post</label>
              <button
                type="button"
                onClick={adicionarProduto}
                className="text-sm text-[#F4A7B9] hover:text-white flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </button>
            </div>

            <div className="mt-3 space-y-4">
              {produtos.map((produto, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-300">
                      Produto {index + 1}
                    </span>
                    {produtos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removerProduto(index)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remover
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <input
                      placeholder="Nome do produto"
                      value={produto.nome}
                      onChange={(e) => atualizarProduto(index, "nome", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
                      required
                    />
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Imagem do produto</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImagemProduto(index, file);
                        }}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300"
                      />
                      {(produtoPreview[index] || produto.imagem) && (
                        <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                          <img
                            src={produtoPreview[index] || produto.imagem}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="Preço"
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        value={produto.preco}
                        onChange={(e) => atualizarProduto(index, "preco", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
                      />
                      <input
                        placeholder="Preço original (opcional)"
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        value={produto.precoOriginal}
                        onChange={(e) => atualizarProduto(index, "precoOriginal", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
                      />
                    </div>
                    <input
                      placeholder="Link afiliado"
                      value={produto.linkAfiliado}
                      onChange={(e) => atualizarProduto(index, "linkAfiliado", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
                      required
                    />
                    <input
                      placeholder="Loja"
                      value={produto.loja}
                      onChange={(e) => atualizarProduto(index, "loja", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-[#F4A7B9]" />
                Modo inteligente
              </label>
              <button
                type="button"
                onClick={() => setSmartMode(!smartMode)}
                className="text-xs text-[#F4A7B9]"
              >
                {smartMode ? "Desativar" : "Ativar"}
              </button>
            </div>
            {smartMode && (
              <div className="mt-3 space-y-3">
                <textarea
                  placeholder="Cole aqui o texto completo do produto... Ex: Body de renda preto R$ 89,90 na Shopee https://shopee.com.br/..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
                  rows={4}
                />
                <button
                  type="button"
                  onClick={handleSmartPaste}
                  className="w-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#F67C6F] py-3 text-white font-semibold shadow-md"
                >
                  Extrair e adicionar produto
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[#F4A7B9]/30 bg-[#F4A7B9]/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#F4A7B9]" />
                Gerar conteúdo com IA
              </label>
              <button
                type="button"
                onClick={gerarComIA}
                disabled={gerando}
                className="text-xs bg-[#E11D48] text-white px-3 py-1.5 rounded-full hover:bg-[#be123c] transition-colors disabled:opacity-50"
              >
                {gerando ? "Gerando..." : "Gerar"}
              </button>
            </div>
            {conteudoGerado && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Título sugerido</label>
                  <input
                    type="text"
                    value={conteudoGerado.titulo || ""}
                    onChange={(e) => setConteudoGerado({ ...conteudoGerado, titulo: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Descrição</label>
                  <textarea
                    value={conteudoGerado.descricao || ""}
                    onChange={(e) => setConteudoGerado({ ...conteudoGerado, descricao: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Hashtags</label>
                  <input
                    type="text"
                    value={conteudoGerado.hashtags?.join(", ") || ""}
                    onChange={(e) => setConteudoGerado({ ...conteudoGerado, hashtags: e.target.value.split(", ").filter(Boolean) })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Compartilhar</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(conteudoGerado.textoFacebook || "");
                        setStatus("Texto para Facebook copiado!");
                      }}
                      className="text-xs bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700"
                    >
                      Facebook
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(conteudoGerado.textoPinterest || "");
                        setStatus("Texto para Pinterest copiado!");
                      }}
                      className="text-xs bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700"
                    >
                      Pinterest
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const texto = `${conteudoGerado.titulo}\n\n${conteudoGerado.descricao}\n\n${conteudoGerado.hashtags?.join(" ") || ""}`;
                        navigator.clipboard.writeText(texto);
                        setStatus("Texto copiado!");
                      }}
                      className="text-xs bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-800"
                    >
                      Copiar texto
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#E11D48] to-[#F67C6F] py-3 text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.01]"
          >
            Publicar Post
          </button>
        </form>
      </div>
    </div>
  );
}

