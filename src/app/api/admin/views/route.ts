import { NextResponse } from "next/server";
import { db, incrementItemViews } from "@/lib/views";

export async function GET() {
  try {
    const { collection, getDocs } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "visualizacoes"));
    const views: Record<string, number> = {};
    snap.docs.forEach((doc) => {
      const data = doc.data();
      if (data?.slug && typeof data.views === "number") {
        views[data.slug] = data.views;
      }
    });
    return NextResponse.json({ views });
  } catch (error) {
    console.error("Erro ao buscar visualizações:", error);
    return NextResponse.json({ views: {} });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug;
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ views: {} });
    }
    const views = await incrementItemViews(slug);
    return NextResponse.json({ views: { [slug]: views } });
  } catch (error) {
    console.error("Erro ao registrar visualização:", error);
    return NextResponse.json({ views: {} });
  }
}
