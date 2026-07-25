import { NextResponse } from "next/server";
import { CouponService } from "@/services/coupons/service";

export async function POST() {
  try {
    const results = await CouponService.syncAll();
    const summary = results.reduce(
      (acc, r) => {
        acc.found += r.found;
        acc.inserted += r.inserted;
        acc.updated += r.updated;
        acc.expired += r.expired;
        return acc;
      },
      { found: 0, inserted: 0, updated: 0, expired: 0 }
    );

    return NextResponse.json({
      ok: true,
      summary,
      details: results,
    });
  } catch (error) {
    console.error("Erro na sincronização de cupons:", error);
    return NextResponse.json(
      { ok: false, error: "Erro ao sincronizar cupons" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Use POST para disparar a sincronização de cupons.",
  });
}
