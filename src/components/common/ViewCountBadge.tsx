"use client";

import { Eye } from "lucide-react";
import { useViewCount } from "@/hooks/useViewCount";

export default function ViewCountBadge({
  slug,
  locale = "pt-BR",
}: {
  slug: string;
  locale?: string;
}) {
  const { views, loading } = useViewCount(slug);
  const localeForNumber = locale === "en" ? "en-US" : "pt-BR";

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 md:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300">
        <Eye className="h-3 w-3" />
        ...
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 md:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300">
      <Eye className="h-3 w-3" />
      {views.toLocaleString(localeForNumber)}
    </span>
  );
}
