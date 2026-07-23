import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Instagram - Atacadinho da Rafa",
    description: "Follow Atacadinho da Rafa on Instagram.",
  };
}

export default function InstagramPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Instagram</h1>
        <p className="text-gray-400 mb-6">Follow us on Instagram</p>
        <Link
          href="https://www.instagram.com/atacadinhodarafa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#be123c]"
        >
          Open Instagram
        </Link>
      </div>
    </main>
  );
}
