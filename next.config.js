/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atacadinhodarafa.vercel.app",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.shopee.com.br",
      },
      {
        protocol: "https",
        hostname: "*.amazon.com",
      },
      {
        protocol: "https",
        hostname: "*.mercadolivre.com.br",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https: http:; frame-src 'self' https: http:; connect-src 'self' https: http:; font-src 'self' https: http:; object-src 'none'; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};
