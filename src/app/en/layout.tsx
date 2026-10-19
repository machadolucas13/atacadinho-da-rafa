import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://v0-atacadinhodarafa.vercel.app"),
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

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

