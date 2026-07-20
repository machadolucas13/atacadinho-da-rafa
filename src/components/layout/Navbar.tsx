"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { categorias } from "@/data/categorias";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-pink-600">
            Atacadinho da Rafa
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {categorias.slice(0, 6).map((categoria) => (
              <Link
                key={categoria.id}
                href={`/categorias/${categoria.slug}`}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-pink-600"
              >
                {categoria.nome}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-t pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos, pastas, artigos..."
                className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 focus:border-pink-500 focus:outline-none"
                autoFocus
              />
            </div>
          </div>
        )}

        {isMenuOpen && (
          <nav className="border-t py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id}
                  href={`/categorias/${categoria.slug}`}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-pink-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {categoria.nome}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
