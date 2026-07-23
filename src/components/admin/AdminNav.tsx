"use client";

import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="border-b border-white/10 bg-[#0a0a14]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 flex gap-4">
        <Link href="/admin/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Dashboard
        </Link>
        <Link href="/admin/novo-post" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Novo Post
        </Link>
        <Link href="/admin/nova-pasta" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Nova Pasta
        </Link>
        <Link href="/admin/novo-artigo" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Novo Artigo
        </Link>
      </div>
    </nav>
  );
}
