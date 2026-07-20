"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold text-gray-900">Algo deu errado!</h2>
      <p className="mt-2 text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-full bg-pink-600 px-6 py-3 text-white transition-colors hover:bg-pink-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}
