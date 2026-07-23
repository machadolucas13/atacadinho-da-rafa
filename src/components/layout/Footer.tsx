"use client";

import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import BrandLogo from "./BrandLogo";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#0a0a14]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo size={36} showText className="mb-4" />
            <p className="max-w-sm text-sm text-gray-400 leading-relaxed">
              Curadoria de achados especiais para você descobrir sem enrolação.
              Moda, decoração, tecnologia e muito mais — só o que vale a pena.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#F4A7B9]" />
              <span className="text-xs font-semibold text-gray-300">
                Inspire-se toda semana
              </span>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300">
              Categorias
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { nome: "Moda Feminina", slug: "moda-feminina" },
                { nome: "Casa e Decoração", slug: "casa-decoracao" },
                { nome: "Cozinha", slug: "cozinha" },
                { nome: "Tecnologia", slug: "tecnologia" },
                { nome: "Beleza", slug: "beleza" },
                { nome: "Acessórios", slug: "acessorios" },
              ].map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/categorias/${item.slug}`}
                    className="group inline-flex items-center text-sm text-gray-400 transition-colors hover:text-[#F4A7B9]"
                  >
                    <span className="mr-1.5 text-gray-600 transition-colors group-hover:text-[#F4A7B9]">
                      •
                    </span>
                    {item.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300">
              Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { nome: "Pins", href: "/pins" },
                { nome: "Sobre", href: "/sobre" },
                { nome: "Contato", href: "/contato" },
                { nome: "Privacidade", href: "/politica-privacidade" },
                { nome: "Termos", href: "/termos-de-uso" },
              ].map((item) => (
                <li key={item.href}>
                  <LocaleAwareLink
                    href={item.href}
                    className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-[#F4A7B9]"
                  >
                    <span className="mr-1.5 text-gray-600 transition-colors group-hover:text-[#F4A7B9]">
                      •
                    </span>
                    {item.nome}
                  </LocaleAwareLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-3 text-center md:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Atacadinho da Rafa. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-gray-600">
            Feito com 💖 para amantes de achados especiais
          </p>
        </div>
      </div>
    </footer>
  );
}
