"use client";

import Link from "next/link";
import { logoutAdmin } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <nav className="border-b border-white/10 bg-[#0a0a14]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/novo-post" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Novo Post
          </Link>
          <Link href="/admin/novo-artigo" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Novo Artigo
          </Link>
          <Link href="/admin/newsletter" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Newsletter
          </Link>
          <Link href="/admin/radar" className="text-sm font-medium text-[#F4A7B9] hover:text-white transition-colors">
            🔍 Radar Trends
          </Link>
          <Link href="/admin/pins" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            📌 Pins
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

