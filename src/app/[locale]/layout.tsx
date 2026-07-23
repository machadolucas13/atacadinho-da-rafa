import {Plus_Jakarta_Sans, Manrope} from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {JsonLd} from '@/components/seo/JsonLd';
import {ScrollReveal} from '@/components/layout';
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

export function generateStaticParams() {
  return [{locale: 'pt'}, {locale: 'en'}];
}

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const isPt = locale === 'pt';
  return {
    title: {
      default: isPt ? 'Atacadinho da Rafa - Descobertas, Achados e Ofertas' : 'Atacadinho da Rafa - Finds, Deals and Recommendations',
      template: '%s | Atacadinho da Rafa',
    },
    description: isPt
      ? 'Descubra os melhores achados, ofertas e recomendações. Curadoria visual de moda, decoração, tecnologia e beleza.'
      : 'Discover the best finds, deals and recommendations. Visual curation of fashion, decor, tech and beauty.',
    alternates: {
      canonical: `https://atacadinhodarafa.com.br/${locale}`,
    },
  };
}

export default async function RootLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <html lang={locale} className={`${plusJakartaSans.variable} ${manrope.variable} font-body antialiased`}>
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
        <main
          className="relative z-10 min-h-screen"
          style={{position: 'relative', zIndex: 10}}
        >
          {children}
        </main>
        <Footer className="relative z-20" />
        <ScrollReveal />
      </body>
    </html>
  );
}
