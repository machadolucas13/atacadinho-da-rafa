"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl">😕</div>
      <h2 className="mt-4 text-2xl font-bold text-white tracking-tight">
        Algo deu errado!
      </h2>
      <p className="mt-2 text-gray-300 max-w-md">
        Não conseguimos carregar esta página. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="btn-primary mt-6"
      >
        Tentar novamente
      </button>
    </div>
  );
}

