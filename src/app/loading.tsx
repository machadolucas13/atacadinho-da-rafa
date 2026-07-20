export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 h-8 w-64 animate-pulse rounded-lg bg-gray-200" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl bg-gray-200"
              style={{ height: `${Math.random() * 200 + 200}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
