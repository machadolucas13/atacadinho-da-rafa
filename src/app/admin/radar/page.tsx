"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { Sparkles, TrendingUp, Heart, Star, RefreshCw, Clock, ExternalLink, FileText, ArrowUpRight, X } from "lucide-react";

interface TrendItem {
  keyword: string;
  url: string;
}

interface TrendsData {
  ok: boolean;
  total: number;
  fastestGrowing: TrendItem[];
  mostWanted: TrendItem[];
  mostPopular: TrendItem[];
  updatedAt: string;
}

type TabType = "crescendo" | "desejadas" | "populares";

export default function AdminRadar() {
  const [data, setData] = useState<TrendsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("crescendo");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchTrends = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.set("category", selectedCategory);
      }
      if (isRefresh) {
        params.set("refresh", "true");
      }

      const res = await fetch(`/api/radar/trends?${params.toString()}`);
      const json = await res.json();
      if (json.ok) {
        setData(json);
        setLastUpdated(new Date());
      }
    } catch (e) {
      console.error("Erro ao buscar trends:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchTrends();
  }, [selectedCategory, fetchTrends]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchTrends();
    }, 4 * 60 * 60 * 1000); // 4 horas

    return () => clearInterval(interval);
  }, [autoRefresh, fetchTrends]);

  const handleCreateArticle = (keyword: string) => {
    const slug = keyword
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const titulo = `Achados: ${keyword} — Os melhores produtos`;
    window.open(
      `/admin/novo-artigo?titulo=${encodeURIComponent(titulo)}&slug=${encodeURIComponent(slug)}&tags=${encodeURIComponent(keyword)}`,
      "_blank"
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const tabs: { key: TabType; label: string; icon: React.ReactNode; count: number; color: string }[] = [
    {
      key: "crescendo",
      label: "Mais Crescendo",
      icon: <ArrowUpRight className="h-4 w-4" />,
      count: data?.fastestGrowing.length || 0,
      color: "text-red-400 border-red-400/30 bg-red-400/5",
    },
    {
      key: "desejadas",
      label: "Mais Desejadas",
      icon: <Heart className="h-4 w-4" />,
      count: data?.mostWanted.length || 0,
      color: "text-pink-400 border-pink-400/30 bg-pink-400/5",
    },
    {
      key: "populares",
      label: "Tendências Populares",
      icon: <Star className="h-4 w-4" />,
      count: data?.mostPopular.length || 0,
      color: "text-amber-400 border-amber-400/30 bg-amber-400/5",
    },
  ];

  const getCurrentData = (): TrendItem[] => {
    if (!data) return [];
    switch (activeTab) {
      case "crescendo":
        return data.fastestGrowing;
      case "desejadas":
        return data.mostWanted;
      case "populares":
        return data.mostPopular;
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter((item) =>
    item.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (!data || !data.ok) {
    return (
      <div className="min-h-screen bg-[#0a0a14]">
        <AdminNav />
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-red-400/30 bg-red-400/5 p-8 text-center">
            <p className="text-red-400">Erro ao carregar trends. Tente novamente.</p>
            <button
              onClick={() => fetchTrends(true)}
              className="mt-4 rounded-full bg-red-400/20 px-6 py-2 text-sm text-red-300 hover:bg-red-400/30"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#F4A7B9]" />
              Radar de Tendências
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              O que o Brasil está buscando agora — dados do Mercado Livre
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                autoRefresh
                  ? "bg-green-400/10 text-green-400 border border-green-400/30"
                  : "bg-white/5 text-gray-400 border border-white/10"
              }`}
            >
              <Clock className="h-4 w-4" />
              {autoRefresh ? "Auto: 4h" : "Auto: Off"}
            </button>
            <button
              onClick={() => fetchTrends(true)}
              disabled={refreshing}
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-bold disabled:opacity-70"
            >
              {refreshing ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Atualizar Agora
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {lastUpdated && (
              <>
                <Clock className="h-3 w-3" />
                Última atualização: {formatDate(lastUpdated)}
                {autoRefresh && <span className="text-green-400">• Auto-refresh a cada 4h</span>}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filtrar trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? `${tab.color} border`
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-gray-400">Nenhuma trend encontrada para "{searchQuery}"</p>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div
                key={`${activeTab}-${index}-${item.keyword}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#F4A7B9]/50 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4A7B9]/10 text-xs font-bold text-[#F4A7B9]">
                        {index + 1}
                      </span>
                      <h3 className="truncate text-sm font-medium text-white">{item.keyword}</h3>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#F4A7B9]"
                    >
                      Ver no Mercado Livre
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleCreateArticle(item.keyword)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F4A7B9]/10 px-3 py-1.5 text-xs font-medium text-[#F4A7B9] transition-all hover:bg-[#F4A7B9]/20"
                  >
                    <FileText className="h-3 w-3" />
                    Criar Artigo
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Como usar este Radar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-400">
            <li>
              <strong className="text-white">Mais Crescendo</strong> = termos que mais cresceram essa semana. Oportunidade de chegar antes.
            </li>
            <li>
              <strong className="text-white">Mais Desejadas</strong> = maior volume de busca. Demanda constante.
            </li>
            <li>
              <strong className="text-white">Tendências Populares</strong> = aumento significativo vs semana passada.
            </li>
            <li>
              Clique em <span className="text-[#F4A7B9]">Criar Artigo</span> para abrir o formulário com o título pré-preenchido.
            </li>
            <li>Os dados são do Mercado Livre e atualizam automaticamente a cada 4 horas.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
