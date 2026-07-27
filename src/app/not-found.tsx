import Link from "next/link";
import LocaleAwareLink from "@/components/common/LocaleAwareLink";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-bold text-white/10">404</div>
      <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">
        Ops! Esta página não existe
      </h1>
      <p className="mt-2 text-gray-400 max-w-md">
        A página que você está procurando foi removida ou nunca existiu.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <LocaleAwareLink href="/" className="btn-primary">
          Voltar para Home
        </LocaleAwareLink>
        <LocaleAwareLink href="/busca" className="btn-ghost">
          Buscar produtos
        </LocaleAwareLink>
      </div>
    </div>
  );
}

