export const metadata = {
  title: "robots.txt - Atacadinho da Rafa",
  description: "Robots.txt do site Atacadinho da Rafa",
};

export default function Robots() {
  const baseUrl = "https://atacadinhodarafa.vercel.app";
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">robots.txt</h1>
      <pre className="text-xs overflow-auto">
        {`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/
Sitemap: ${baseUrl}/sitemap.xml`}
      </pre>
    </div>
  );
}
