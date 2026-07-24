import {Plus_Jakarta_Sans, Manrope} from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {JsonLd} from '@/components/seo/JsonLd';
import {ScrollReveal} from '@/components/layout';
import PWAProvider from '@/components/seo/PWAProvider';

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
    <>
      <JsonLd />
      <Navbar />
      <main
        className="relative z-10"
        style={{position: 'relative', zIndex: 10}}
      >
        {children}
      </main>
      <Footer className="relative z-20" />
      <ScrollReveal />
      <PWAProvider />
    </>
  );
}
