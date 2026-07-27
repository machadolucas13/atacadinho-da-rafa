import AdminNav from "@/components/admin/AdminNav";
import AdminViewsClient from "@/components/admin/AdminViewsClient";

export const metadata = {
  title: "Visualizações - Admin",
};

export default function AdminViewsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdminViewsClient />
      </div>
    </div>
  );
}
