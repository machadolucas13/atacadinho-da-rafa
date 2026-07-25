"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { criarProduto } from "@/app/actions/admin";
import { Sparkles, ShoppingBag, ExternalLink, Loader2, Wand2, Info } from "lucide-react";

type Marketplace = "shopee" | "amazon" | "mercadolivre" | "shein" | null;

interface ProdutoForm {
  nome: string;
  slug: string;
  descricao: string;
  descricaoCurta: string;
  imagemPrincipal: string;
  preco: string;
  precoOriginal: string;
  linkAfiliado: string;
  loja: string;
  marketplace: Marketplace;
  tags: string;
  categoriaId: string;
  destaque: boolean;
  viral: boolean;
  ativo: true;
}

const marketDefaults: Record<string, { loja: string; tags: string; categoriaSugerida: string }> = {
  shopee: { loja: "Shopee", tags: "shopee, oferta", categoriaSugerida: "moda-feminina" },
  amazon: { loja: "Amazon", tags: "amazon, oferta", categoriaSugerida: "tecnologia" },
  mercadolivre: { loja: "Mercado Livre", tags: "mercadolivre, oferta", categoriaSugerida: "eletronicos" },
  shein: { loja: "SHEIN", tags: "shein, moda", categoriaSugerida: "moda-feminina" },
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function extrairDadosPublicos(url: string): Promise<Partial<ProdutoForm>> {
  try {
    const response = await fetch("/api/produtos/extrair", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      nome: data.titulo || "",
      imagemPrincipal: data.imagem || "",
      preco: data.preco ? data.preco.toString() : "",
      precoOriginal: data.precoOriginal ? data.precoOriginal.toString() : "",
      descricao: data.titulo || "",
      descricaoCurta: data.titulo || "",
    };
  } catch {
    return {};
  }
}

function copiarMetadadosDaUrl(url: string): Partial<ProdutoForm> {
  try {
    const u = new URL(url);
    const path = u.pathname + u.search;
    const possibleName = decodeURIComponent(path)
      .replace(/[-_/]+/g, " ")
      .replace(/\.html?$/i, "")
      .trim();

    if (possibleName.length > 6) {
      const titulo = possibleName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      return {
        nome: titulo,
        descricao: titulo,
        descricaoCurta: titulo,
      };
    }
  } catch {
    // ignore
  }
  return {};
}

export default function ImportarProduto() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [detectedMarketplace, setDetectedMarketplace] = useState<Marketplace>(null);
  const [categorias, setCategorias] = useState<any[]>([]);

  const [form, setForm] = useState<ProdutoForm>({
    nome: "",
    slug: "",
    descricao: "",
    descricaoCurta: "",
    imagemPrincipal: "",
    preco: "",
    precoOriginal: "",
    linkAfiliado: "",
    loja: "",
    marketplace: null,
    tags: "",
    categoriaId: "",
    destaque: false,
    viral: false,
    ativo: true,
  });

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const res = await fetch("/api/admin/categorias");
        const data = await res.json();
        setCategorias(data.categorias || []);
      } catch (e) {
        console.error("Erro ao carregar categorias", e);
      }
    };
    carregarCategorias();
  }, []);

  function detectarMarketplace(url: string): Marketplace {
    if (url.includes("shopee")) return "shopee";
    if (url.includes("amazon")) return "amazon";
    if (url.includes("mercadolivre") || url.includes("meli")) return "mercadolivre";
    if (url.includes("shein")) return "shein";
    return null;
  }

  async function handleImportar() {
    setLoading(true);
    setStatus("");
    try {
      const marketplace = detectarMarketplace(form.linkAfiliado);
      setDetectedMarketplace(marketplace);

      if (!marketplace) {
        setStatus("Não foi possível identificar o marketplace. Verifique o link.");
        setLoading(false);
        return;
      }

      const defaults = marketDefaults[marketplace];
      const [dadosImportados, metadadosUrl] = await Promise.all([
        extrairDadosPublicos(form.linkAfiliado),
        Promise.resolve(copiarMetadadosDaUrl(form.linkAfiliado)),
      ]);

      const nome = dadosImportados.nome || metadadosUrl.nome || form.nome || `Produto ${marketplace}`;
      const categoriaId = form.categoriaId || defaults.categoriaSugerida;

      setForm((prev) => {
        const slug = !prev.slug && nome ? slugify(nome) : prev.slug;
        const loja = dadosImportados.preco ? prev.loja || defaults.loja : defaults.loja;
        return {
          ...prev,
          nome: nome || prev.nome,
          slug: slug || prev.slug,
          imagemPrincipal: dadosImportados.imagemPrincipal || prev.imagemPrincipal || "",
          preco: dadosImportados.preco || prev.preco || "",
          precoOriginal: dadosImportados.precoOriginal || prev.precoOriginal || "",
          descricao: nome || prev.descricao,
          descricaoCurta: nome || prev.descricaoCurta,
          loja,
          marketplace,
          categoriaId: categoriaId || prev.categoriaId,
          tags: prev.tags || defaults.tags,
        };
      });

      setStatus("Produto pré-preenchido! Revise os dados e salve.");
    } catch (e) {
      setStatus("Erro ao importar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");

    if (!form.nome || !form.linkAfiliado || !form.imagemPrincipal || !form.preco) {
      setStatus("Preencha pelo menos: nome, link, imagem e preço.");
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, typeof value === "boolean" ? String(value) : (value as string));
    });

    const result: any = await criarProduto(payload);
    if (result.ok) {
      router.push("/admin/dashboard");
    } else {
      setStatus(result.error || "Erro ao salvar produto.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Importar Produto</h1>
        <p className="mt-2 text-sm text-gray-400">
          Cole o link abaixo. Se a loja bloquear a extração automática, o formulário já vem com os campos prontos para edição manual.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Link do Produto</label>
            <div className="mt-1 flex gap-2">
              <input
                value={form.linkAfiliado}
                onChange={(e) => {
                  const mp = detectarMarketplace(e.target.value);
                  setDetectedMarketplace(mp);
                  setForm({ ...form, linkAfiliado: e.target.value, marketplace: mp, loja: mp || form.loja });
                }}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                placeholder="https://shopee.com.br/produto/..."
                required
              />
              <button
                type="button"
                onClick={handleImportar}
                disabled={loading || !form.linkAfiliado}
                className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-bold disabled:opacity-70"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                {loading ? "Importando..." : "Importar"}
              </button>
            </div>
            {detectedMarketplace && (
              <p className="mt-1 text-xs text-gray-400">
                Marketplace detectado: <span className="font-semibold text-white">{detectedMarketplace}</span>
              </p>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center gap-2 text-xs text-gray-300">
            <Info className="h-4 w-4 text-[#F4A7B9]" />
            Os campos abaixo serão preenchidos automaticamente quando possível. Se ficarem vazios, é só completar manualmente.
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Nome do Produto</label>
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              placeholder="Ex: Tênis New Balance 530 Feminino"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Descrição Curta</label>
            <input
              value={form.descricaoCurta}
              onChange={(e) => setForm({ ...form, descricaoCurta: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              placeholder="Resumo do produto em uma linha"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Descrição</label>
            <textarea
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              rows={3}
              placeholder="Detalhes do produto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Imagem Principal (URL)</label>
            <input
              value={form.imagemPrincipal}
              onChange={(e) => setForm({ ...form, imagemPrincipal: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              placeholder="https://..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300">Preço Atual</label>
              <input
                type="number"
                step="0.01"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Preço Antigo</label>
              <input
                type="number"
                step="0.01"
                value={form.precoOriginal}
                onChange={(e) => setForm({ ...form, precoOriginal: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Categoria</label>
            <select
              value={form.categoriaId}
              onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
            >
              <option value="">Selecione...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Tags</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
              placeholder="shopee, moda, feminino"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="destaque"
              type="checkbox"
              checked={form.destaque}
              onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#E11D48] focus:ring-[#E11D48]"
            />
            <label htmlFor="destaque" className="text-sm text-gray-300">Destaque</label>

            <input
              id="viral"
              type="checkbox"
              checked={form.viral}
              onChange={(e) => setForm({ ...form, viral: e.target.checked })}
              className="ml-4 h-4 w-4 rounded border-white/20 bg-white/5 text-[#E11D48] focus:ring-[#E11D48]"
            />
            <label htmlFor="viral" className="text-sm text-gray-300">Viral</label>
          </div>

          <button type="submit" className="btn-primary w-full py-2.5 text-sm font-bold">
            Salvar Produto
          </button>

          {status && <p className="text-sm text-gray-300">{status}</p>}
        </form>
      </div>
    </div>
  );
}
