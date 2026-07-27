export const revalidate = 60;

import { Metadata } from "next";
import Link from "next/link";
import { Bookmark, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "My Favorites - Atacadinho da Rafa",
  description: "Your saved posts and products to review later. Manage your favorite finds in one place.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-16">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-[#F4A7B9] transition-colors">
        <ChevronLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mt-8 text-center">
        <Bookmark className="mx-auto h-12 w-12 text-[#F4A7B9]" />
        <h1 className="mt-4 text-3xl font-bold text-white">My favorites</h1>
        <p className="mt-2 text-gray-400">Click &quot;Save&quot; on posts and products to add them here.</p>
      </div>

      <div id="favoritos-container" className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const stored = localStorage.getItem('favoritos');
                const favoritos = stored ? JSON.parse(stored) : [];
                const container = document.getElementById('favoritos-container');
                if (!container || favoritos.length === 0) {
                  if (container) container.innerHTML = '<p class=\"col-span-full text-center text-gray-400\">No favorites saved yet.</p>';
                  return;
                }
                container.innerHTML = favoritos.map(function(item) {
                  return '<div class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-soft"><p class="text-sm font-semibold text-white">' + item.titulo + '</p><p class="mt-1 text-xs text-gray-500">' + new Date(item.adicionadoEm).toLocaleDateString('pt-BR') + '</p></div>';
                }).join('');
              } catch (e) {
                var container = document.getElementById('favoritos-container');
                if (container) container.innerHTML = '<p class=\"col-span-full text-center text-gray-400\">No favorites saved yet.</p>';
              }
            })();
          `,
        }}
      />
    </div>
  );
}

