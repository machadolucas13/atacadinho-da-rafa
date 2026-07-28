"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import {
  Sparkles,
  TrendingUp,
  Heart,
  Star,
  RefreshCw,
  Clock,
  ExternalLink,
  FileText,
  ArrowUpRight,
  X,
  ShoppingBag,
  Search,
  Flame,
  Award,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  keyword: string;
  platform: string;
  url: string;
  price: number;
  currency: string;
  originalPrice?: number;
  discountPercentage?: number;
  soldCount?: number;
  likedCount?: number;
  totalResults?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
  freeShipping?: boolean;
  trendType: "crescendo" | "desejadas" | "populares" | "search";
}

interface TrendsData {
  ok: boolean;
  items: ProductItem[];
  platforms: string[];
  updatedAt: string;
}

type TabType = "todos" | "crescendo" | "desejadas" | "populares";
type PlatformType = "todos" | "ml" | "shopee" | "amazon" | "magalu" | "temu" | "aliexpress";
type SortType = "vendas" | "buscas" | "tendencia";

const PLATFORMS: { key: PlatformType; label: string; color: string; icon: string }[] = [
  { key: "todos", label: "Todos", color: "bg-gray-400/20 text-gray-300 border-gray-400/30", icon: "🌐" },
  { key: "ml", label: "Mercado Livre", color: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30", icon: "🟡" },
  { key: "shopee", label: "Shopee", color: "bg-pink-400/10 text-pink-400 border-pink-400/30", icon: "🛍️" },
  { key: "amazon", label: "Amazon", color: "bg-blue-400/10 text-blue-400 border-blue-400/30", icon: "📦" },
  { key: "magalu", label: "Magalu", color: "bg-purple-400/10 text-purple-400 border-purple-400/30", icon: "🟣" },
  { key: "temu", label: "Temu", color: "bg-red-400/10 text-red-400 border-red-400/30", icon: "🏷️" },
  { key: "aliexpress", label: "AliExpress", color: "bg-red-500/10 text-red-500 border-red-500/30", icon: "🌍" },
];

const SORT_OPTIONS: { key: SortType; label: string; icon: React.ReactNode }[] = [
  { key: "vendas", label: "Mais Vendidos", icon: <Award className="h-4 w-4" /> },
  { key: "buscas", label: "Mais Buscados", icon: <Search className="h-4 w-4" /> },
  { key: "tendencia", label: "Tendências", icon: <TrendingUp className="h-4 w-4" /> },
];

const TREND_TYPE_LABEL: Record<string, { label: string; color: string }> = {
  crescendo: { label: "Crescendo", color: "text-red-400 bg-red-400/10" },
  desejadas: { label: "Desejadas", color: "text-pink-400 bg-pink-400/10" },
  populares: { label: "Populares", color: "text-amber-400 bg-amber-400/10" },
  search: { label: "Busca", color: "text-blue-400 bg-blue-400/10" },
};

const PLATFORM_LABEL: Record<string, { label: string; color: string }> = {
  ml: { label: "ML", color: "bg-yellow-400/20 text-yellow-400" },
  shopee: { label: "Shopee", color: "bg-pink-400/20 text-pink-400" },
  amazon: { label: "Amazon", color: "bg-blue-400/20 text-blue-400" },
  magalu: { label: "Magalu", color: "bg-purple-400/20 text-purple-400" },
  temu: { label: "Temu", color: "bg-red-400/20 text-red-400" },
  aliexpress: { label: "AliExpress", color: "bg-red-500/20 text-red-500" },
};

function formatCurrency(value: number | undefined, currency: string = "BRL"): string {
  if (!value || value <= 0) return "—";
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

function formatNumber(value: number | undefined): string {
  if (!value || value <= 0) return "—";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

export default function AdminRadar() {
  const [data, setData] = useState<TrendsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("todos");
  const [activePlatform, setActivePlatform] = useState<PlatformType>("todos");
  const [activeSort, setActiveSort] = useState<SortType>("vendas");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string>("ml,shopee,amazon,magalu,temu,aliexpress");

  const fetchTrends = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const params = new URLSearchParams();
      params.set("platforms", selectedPlatforms);
      params.set("limit", "40");

      const res = await fetch(`/api/radar/multi-trends?${params.toString()}`, {
        cache: isRefresh ? "no-store" : "default",
      });
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
  }, [selectedPlatforms]);

  useEffect(() => {
    fetchTrends();
  }, [selectedPlatforms, fetchTrends]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchTrends();
    }, 4 * 60 * 60 * 1000);

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

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((current) => {
      const platforms = current.split(",").filter(Boolean);
      if (platforms.includes(platform)) {
        if (platforms.length === 1) return current;
        return platforms.filter((p) => p !== platform).join(",");
      }
      return [...platforms, platform].join(",");
    });
  };

  const getFilteredItems = (): ProductItem[] => {
    if (!data) return [];

    let filtered = data.items;

    if (activeTab !== "todos") {
      filtered = filtered.filter((item) => item.trendType === activeTab);
    }

    if (activePlatform !== "todos") {
      filtered = filtered.filter((item) => item.platform === activePlatform);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.keyword.toLowerCase().includes(query)
      );
    }

    switch (activeSort) {
      case "vendas":
        filtered.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
        break;
      case "buscas":
        filtered.sort((a, b) => (b.totalResults || 0) - (a.totalResults || 0));
        break;
      case "tendencia":
        filtered.sort((a, b) => {
          const order = { crescendo: 0, desejadas: 1, populares: 2, search: 3 };
          return (order[a.trendType] || 3) - (order[b.trendType] || 3);
        });
        break;
    }

    return filtered;
  };

  const filteredItems = getFilteredItems();

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
              O que o Brasil está buscando agora — comparando todas as plataformas
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
              Atualizar
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Filtrar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full border border-white/10 bg-white/5 pl-10 pr-4 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#F4A7B9] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => {
            const isActive = activePlatform === platform.key;
            const isSelected = selectedPlatforms.includes(platform.key);
            const count = platform.key === "todos"
              ? data.items.length
              : data.items.filter((i) => i.platform === platform.key).length;

            return (
              <button
                key={platform.key}
                onClick={() => setActivePlatform(platform.key)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all border ${
                  isActive
                    ? `${platform.color} border`
                    : "text-gray-400 hover:text-white border-transparent"
                }`}
              >
                <span>{platform.icon}</span>
                {platform.label}
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              onClick={() => setActiveSort(option.key)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeSort === option.key
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["todos", "crescendo", "desejadas", "populares"] as TabType[]).map((tab) => {
            const tabConfig = {
              todos: { label: "Todos", icon: <ShoppingBag className="h-4 w-4" />, color: "text-gray-300 border-gray-400/30 bg-gray-400/5" },
              crescendo: { label: "Mais Crescendo", icon: <Flame className="h-4 w-4" />, color: "text-red-400 border-red-400/30 bg-red-400/5" },
              desejadas: { label: "Mais Desejados", icon: <Heart className="h-4 w-4" />, color: "text-pink-400 border-pink-400/30 bg-pink-400/5" },
              populares: { label: "Tendências Populares", icon: <Star className="h-4 w-4" />, color: "text-amber-400 border-amber-400/30 bg-amber-400/5" },
            };

            const config = tabConfig[tab];
            const count = tab === "todos"
              ? filteredItems.length
              : data.items.filter((i) => i.trendType === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all border ${
                  activeTab === tab ? config.color : "text-gray-400 hover:text-white"
                }`}
              >
                {config.icon}
                {config.label}
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-gray-400">Nenhum produto encontrado para os filtros selecionados.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const trendLabel = TREND_TYPE_LABEL[item.trendType] || TREND_TYPE_LABEL.search;
              const platformInfo = PLATFORM_LABEL[item.platform] || { label: item.platform, color: "bg-gray-400/20 text-gray-400" };

              return (
                <div
                  key={`${item.platform}-${item.id}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#F4A7B9]/50 hover:bg-white/10"
                >
                  <div className="flex items-start gap-3">
                    {item.image && (
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${platformInfo.color}`}>
                          {platformInfo.label}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${trendLabel.color}`}>
                          {trendLabel.label}
                        </span>
                        {item.freeShipping && (
                          <span className="inline-flex items-center rounded-full bg-green-400/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
                            Frete grátis
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1.5 line-clamp-2 text-sm font-medium text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.keyword}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#F4A7B9]">
                          {formatCurrency(item.price, item.currency)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-gray-500 line-through">
                            {formatCurrency(item.originalPrice, item.currency)}
                          </span>
                        )}
                      </div>
                      {item.discountPercentage && item.discountPercentage > 0 && (
                        <span className="inline-flex w-fit rounded-full bg-green-400/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
                          -{item.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    {item.soldCount !== undefined && (
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="h-3 w-3" />
                        {formatNumber(item.soldCount)} vendidos
                      </span>
                    )}
                    {item.totalResults !== undefined && (
                      <span className="flex items-center gap-1">
                        <Search className="h-3 w-3" />
                        {formatNumber(item.totalResults)} resultados
                      </span>
                    )}
                    {item.rating !== undefined && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {item.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                    >
                      Ver produto
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <button
                      onClick={() => handleCreateArticle(item.keyword)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F4A7B9]/10 px-3 py-1.5 text-xs font-medium text-[#F4A7B9] transition-all hover:bg-[#F4A7B9]/20"
                    >
                      <FileText className="h-3 w-3" />
                      Artigo
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Como usar este Radar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-400">
            <li>
              <strong className="text-white">Comparação Multi-Plataforma</strong> — veja os mesmos produtos e termos em ML, Shopee, Amazon, Magalu, Temu e AliExpress.
            </li>
            <li>
              <strong className="text-white">Mais Vendidos</strong> — ordenados por quantidade vendida. Oportunidade de produtos que já provaram demanda.
            </li>
            <li>
              <strong className="text-white">Mais Buscados</strong> — volume de busca em cada plataforma. Demanda real do consumidor.
            </li>
            <li>
              <strong className="text-white">Tendências</strong> — termos crescendo, desejados e populares da semana.
            </li>
            <li>
              Clique em <span className="text-[#F4A7B9]">Artigo</span> para criar conteúdo sobre o produto.
            </li>
            <li>
              Clique em <span className="text-[#F4A7B9]">Ver produto</span> para abrir a página na plataforma original.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
