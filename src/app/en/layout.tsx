import {Plus_Jakarta_Sans, Manrope} from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {JsonLd} from '@/components/seo/JsonLd';
import {ScrollReveal} from '@/components/layout';
import PWAProvider from '@/components/seo/PWAProvider';
import CategorySidebar from '@/components/ui/CategorySidebar';
import './../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL("https://atacadinhodarafa.com.br"),
  title: {
    default: 'Atacadinho da Rafa - Finds, Deals and Recommendations',
    template: '%s | Atacadinho da Rafa',
  },
  description:
    'Discover the best finds, deals and recommendations. Visual curation of fashion, home, tech and beauty.',
  keywords: [
    'finds',
    'deals',
    'recommendations',
    'products',
    'fashion',
    'home decor',
    'tech',
    'beauty',
    'shopee',
    'savings',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${manrope.variable} font-body antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E11D48" />
      </head>
      <body
        className="relative min-h-screen bg-[#0a0a14] text-[hsl(var(--foreground))]"
        style={{
          color: '#f5f5f7',
          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          lineHeight: '1.7',
          letterSpacing: '-0.01em',
          overflowX: 'hidden',
        }}
      >
        <JsonLd />
        <Navbar />
        <CategorySidebar locale="en" />
        <main
          className="relative z-10 min-h-screen"
          style={{position: 'relative', zIndex: 10}}
        >
          {children}
        </main>
        <Footer className="relative z-20" />
        <ScrollReveal />
        <PWAProvider />
      </body>
    </html>
  );
}
