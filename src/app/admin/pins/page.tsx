"use client";

import AdminNav from "@/components/admin/AdminNav";
import { useState, useEffect } from "react";
import { ExternalLink, Share2, Copy, Check, Image as ImageIcon } from "lucide-react";

interface Pin {
  id: string;
  slug: string;
  locale: string;
  titulo: string;
  descricao: string;
  imagem: string;
  destaque: boolean;
  categoriaId: string;
  publicadoEm?: string;
  links?: { nome: string; preco: string; url: string }[];
  tags?: string[];
}

export default function AdminPinsPage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadPins() {
      try {
        const { getPins } = await import("@/lib/pins");
        const all = await getPins("pt");
        setPins(all);
      } catch (e) {
        console.error("Erro ao carregar pins:", e);
      } finally {
        setLoading(false);
      }
    }
    loadPins();
  }, []);

  const getPinterestShareUrl = (pin: Pin) => {
    const baseUrl = "https://v0-atacadinhodarafa.vercel.app";
    const pinUrl = `${baseUrl}/pt/pins/${pin.slug}`;
    const imageUrl = pin.imagem.startsWith("http") ? pin.imagem : `${baseUrl}${pin.imagem}`;
    const description = `${pin.titulo}\n\n${pin.descricao}\n\n${pin.tags?.map(t => `#${t.replace(/\s+/g, "")}`).join(" ") || ""}`;

    return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pinUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;
  };

  const copyPinText = async (pin: Pin) => {
    const baseUrl = "https://v0-atacadinhodarafa.vercel.app";
    const pinUrl = `${baseUrl}/pt/pins/${pin.slug}`;
    const text = `${pin.titulo}\n\n${pin.descricao}\n\n${pin.tags?.map(t => `#${t.replace(/\s+/g, "")}`).join(" ") || ""}\n\n${pinUrl}`;

    await navigator.clipboard.writeText(text);
    setCopiedId(pin.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a14]">
        <AdminNav />
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F4A7B9] border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Share2 className="h-6 w-6 text-[#F4A7B9]" />
            Pins Prontos para Compartilhar
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Clique em "Compartilhar no Pinterest" para abrir o formulário do Pinterest com o título, descrição e imagem preenchidos automaticamente.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#F4A7B9]/50 hover:bg-white/10"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5 mb-4">
                <img
                  src={pin.imagem}
                  alt={pin.titulo}
                  className="h-full w-full object-contain"
                />
                {pin.destaque && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#E11D48] px-2 py-1 text-[10px] font-bold text-white shadow-lg">
                    🔥 Destaque
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
                {pin.titulo}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                {pin.descricao}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {pin.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getPinterestShareUrl(pin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#E11D48] px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#be123c]"
                >
                  <Share2 className="h-3 w-3" />
                  Compartilhar no Pinterest
                </a>
                <button
                  onClick={() => copyPinText(pin)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all hover:bg-white/10"
                >
                  {copiedId === pin.id ? (
                    <Check className="h-3 w-3 text-green-400" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copiedId === pin.id ? "Copiado!" : "Copiar texto"}
                </button>
              </div>

              {pin.links && pin.links.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Links incluídos ({pin.links.length})
                  </p>
                  <div className="space-y-1">
                    {pin.links.slice(0, 3).map((link, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2">
                        <span className="text-[11px] text-gray-300 truncate flex-1">{link.nome}</span>
                        <span className="text-[11px] font-bold text-[#F4A7B9]">{link.preco}</span>
                      </div>
                    ))}
                    {pin.links.length > 3 && (
                      <p className="text-[10px] text-gray-500">
                        +{pin.links.length - 3} mais
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {pins.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
            <ImageIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">Nenhum pin encontrado.</p>
            <p className="text-xs text-gray-500 mt-1">Crie pins em <code className="text-[#F4A7B9]">/admin/novo-pin</code></p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Como compartilhar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-400">
            <li>
              Clique em <span className="text-[#E11D48]">"Compartilhar no Pinterest"</span> — abre o formulário do Pinterest com título, descrição e imagem preenchidos.
            </li>
            <li>
              Ou clique em <span className="text-[#E11D48]">"Copiar texto"</span> e cole manualmente no Pinterest.
            </li>
            <li>
              O link do pin já aponta para sua página de pin no site, que contém todos os links de afiliado.
            </li>
            <li>
              A imagem já está no tamanho correto para Pinterest (1000x1500px).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
