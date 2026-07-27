import { NextRequest, NextResponse } from "next/server";
import { CouponService } from "@/services/coupons/service";

export async function GET() {
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
      rotatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro na sincronização automática de cupons:", error);
    return NextResponse.json(
      { ok: false, error: "Erro ao sincronizar cupons" },
      { status: 500 }
    );
  }
}

