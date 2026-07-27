import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/layout';
import PWAProvider from '@/components/seo/PWAProvider';
import BackgroundStarfield from '@/components/hero/BackgroundStarfield';
import AdSenseScript from '@/components/seo/AdSenseScript';
import { TopAd, InContentAd, FooterAd, SmartlinkAd } from '@/components/ads/ResponsiveAds';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

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
  title: {
    default: 'Atacadinho da Rafa - Descobertas, Achados e Ofertas',
    template: '%s | Atacadinho da Rafa',
  },
  description:
    'Descubra os melhores achados, ofertas e recomendações. Curadoria visual de moda, decoração, tecnologia e muito mais.',
  keywords: [
    'achados',
    'ofertas',
    'descobertas',
    'produtos',
    'moda feminina',
    'decoracao',
    'tecnologia',
    'cozinha',
    'beleza',
    'acessorios',
    'Shopee',
    'Mercado Livre',
    'Amazon',
  ],
  authors: [{name: 'Atacadinho da Rafa'}],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://atacadinhodarafa.vercel.app',
    siteName: 'Atacadinho da Rafa',
    title: 'Atacadinho da Rafa - Descobertas, Achados e Ofertas',
    description:
      'Descubra os melhores achados, ofertas e recomendações. Curadoria visual de moda, decoração, tecnologia e muito mais.',
    images: [
      {
        url: 'https://atacadinhodarafa.vercel.app/assets/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Atacadinho da Rafa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atacadinho da Rafa',
    description: 'Descubra os melhores achados e ofertas',
    images: ['https://atacadinhodarafa.vercel.app/assets/images/og-home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://atacadinhodarafa.vercel.app',
  },
  icons: {
    icon: '/assets/images/logo_rafa.png',
    apple: '/assets/images/logo_rafa.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const themeColor = [
  {media: '(prefers-color-scheme: light)', color: '#fdfbf7'},
  {media: '(prefers-color-scheme: dark)', color: '#1a1a1a'},
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} ${manrope.variable} font-body antialiased`}
    >
      <link rel="manifest" href="/manifest.json" />
      <meta name="google-site-verification" content="pSS___bG_1nZa89MbmiwuAI9PsENM5qMFCE8rTud4X0" />
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
        <AdSenseScript />
        <JsonLd />
        <Navbar />
        <BackgroundStarfield />
        <TopAd />
        <main
          className="relative z-10"
          style={{position: 'relative', zIndex: 10}}
        >
          {children}
          <InContentAd />
        </main>
        <SmartlinkAd />
        <FooterAd />
        <Footer className="relative z-20" />
        <ScrollReveal />
        <PWAProvider />
        <Analytics />
      </body>
    </html>
  );
}

