"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Bookmark, Globe, Pin as PinIcon } from "lucide-react";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] === "en" ? "en" : "pt";

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(pt|en)/, `/${locale}`);
    window.location.href = newPath;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="border-b border-white/10 bg-[#0a0a14]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full p-2.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
              <BrandLogo size={34} showText className="hidden sm:flex" />
              <BrandLogo size={34} showText={false} className="sm:hidden" />
            </div>

            <div className="flex items-center gap-1">
              <LocaleAwareLink
                href="/favoritos"
                className="rounded-full p-2.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-[#F4A7B9]"
                aria-label="Favoritos"
              >
                <Bookmark className="h-[18px] w-[18px]" />
              </LocaleAwareLink>

              <LocaleAwareLink
                href="/pins"
                className="rounded-full p-2.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-[#F4A7B9]"
                aria-label="Pins"
              >
                <PinIcon className="h-[18px] w-[18px]" />
              </LocaleAwareLink>

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="rounded-full p-2.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Buscar"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="rounded-full p-2.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Idioma"
                >
                  <Globe className="h-[18px] w-[18px]" />
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-white/10 bg-[#0a0a14]/95 backdrop-blur-xl p-1 shadow-xl">
                    <button
                      onClick={() => switchLocale("pt")}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                        currentLocale === "pt"
                          ? "bg-[#F4A7B9]/20 text-[#F4A7B9]"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      🇧🇷 Português
                    </button>
                    <button
                      onClick={() => switchLocale("en")}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                        currentLocale === "en"
                          ? "bg-[#F4A7B9]/20 text-[#F4A7B9]"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isSearchOpen && (
            <div className="pb-4 md:pb-5">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-white" />
                <input
                  type="text"
                  placeholder={currentLocale === "en" ? "Search finds, folders, articles..." : "Buscar achados, pastas, artigos..."}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm shadow-sm transition-all focus:border-[#F4A7B9] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F4A7B9]/30 text-gray-200 placeholder-gray-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          {isMenuOpen && (
            <nav className="border-t border-white/10 pb-5 md:hidden">
              <div className="flex gap-2 overflow-x-auto pt-2 pb-1 scrollbar-hide">
                {[]}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
