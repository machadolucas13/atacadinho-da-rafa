import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <p className="mt-4 text-xl text-gray-600">Ops! Esta página não existe</p>
      <p className="mt-2 text-gray-500">
        A página que você está procurando foi removida ou nunca existiu.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-pink-600 px-6 py-3 text-white transition-colors hover:bg-pink-700"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
