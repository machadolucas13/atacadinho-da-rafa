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
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://russiaexternalkew.com https://*.googlesyndication.com https://*.google-analytics.com https://*.facebook.net https://*.fbcdn.net https://*.g.doubleclick.net https://*.google.com https://*.googleapis.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://*.googleapis.com; img-src 'self' data: blob: https: http:; frame-src 'self' https://*.facebook.com https://*.google.com https://*.googleadservices.com https://*.doubleclick.net; connect-src 'self' https://*.google-analytics.com https://*.firebase.com https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com https://*.shopee.com.br https://*.amazon.com https://*.mercadolivre.com.br; font-src 'self' https://*.gstatic.com https://*.googleapis.com; object-src 'none'; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};
