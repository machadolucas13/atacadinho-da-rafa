"use client";

import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";
import BrandLogo from "./BrandLogo";

export default function Footer({ className }: { className?: string } = {}) {
  return (
    <footer className={`relative border-t border-white/10 bg-[#0a0a14]/80 backdrop-blur-xl ${className || ""}`}>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-4">
            <BrandLogo size={36} showText className="mb-4" />
            <p className="max-w-sm text-sm text-gray-400 leading-relaxed">
              Curadoria de achados especiais para você descobrir sem enrolação.
              Moda, decoração, tecnologia e muito mais — só o que vale a pena.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <LocaleAwareLink href="/pinterest" className="text-gray-400 hover:text-[#F4A7B9] transition-colors">
                Pinterest
              </LocaleAwareLink>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4">
              Categorias
            </h4>
            <ul className="space-y-2.5">
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

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4">
             Produtos
            </h4>
            <ul className="space-y-2.5">
              {[
                { nome: "Todos os Produtos", href: "/produtos" },
                { nome: "Pins", href: "/pins" },
                { nome: "Artigos", href: "/artigos" },
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

          <div className="col-span-2 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4">
              Institucional
            </h4>
             <ul className="space-y-2.5">
               {[
                 { nome: "Sobre", href: "/sobre" },
                 { nome: "Contato", href: "/contato" },
                 { nome: "Política de Privacidade", href: "/politica-privacidade" },
                 { nome: "Termos de Uso", href: "/termos-de-uso" },
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
          <div className="flex items-center gap-4">
            <LocaleAwareLink href="/pt" className="text-xs text-gray-500 hover:text-[#F4A7B9] transition-colors">
              PT
            </LocaleAwareLink>
            <LocaleAwareLink href="/en" className="text-xs text-gray-500 hover:text-[#F4A7B9] transition-colors">
              EN
            </LocaleAwareLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

