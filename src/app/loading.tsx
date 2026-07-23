export default function Loading() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 h-8 w-64 animate-pulse rounded-xl bg-gray-200/70" />
        <div className="masonry-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="masonry-item animate-pulse rounded-3xl bg-gray-200/60"
              style={{ height: `${Math.random() * 200 + 240}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
