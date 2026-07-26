"use client";

import { cn } from "@/lib/utils";
import { Flame, Zap, Star, Crown } from "lucide-react";

interface TagBadgeProps {
  label: string;
  variant?: "hot" | "fire" | "new" | "vip" | "sale";
  className?: string;
}

const styles: Record<string, string> = {
  hot: "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25",
  fire: "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-600/25",
  new: "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25",
  vip: "bg-gradient-to-r from-amber-500 to-yellow-300 text-black shadow-lg shadow-amber-500/25",
  sale: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25",
};

const icons: Record<string, any> = {
  hot: null,
  fire: Flame,
  new: Zap,
  vip: Crown,
  sale: Star,
};

export default function TagBadge({ label, variant = "hot", className }: TagBadgeProps) {
  const Icon = icons[variant] || null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-sm border border-white/10",
        styles[variant],
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
}
