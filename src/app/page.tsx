import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/pinterest/ProductGrid";
import CategorySection from "@/components/pinterest/CategorySection";
import TrendingSection from "@/components/pinterest/TrendingSection";
import FeaturedFolders from "@/components/pinterest/FeaturedFolders";
import Skeleton from "@/components/ui/Skeleton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<Skeleton />}>
        <CategorySection />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <FeaturedFolders />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <TrendingSection />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
