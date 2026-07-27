import { CouponRecord, CollectorResult } from "./types";

export class CouponValidator {
  static isValid(coupon: Partial<CouponRecord>): boolean {
    if (!coupon.codigo || !coupon.marketplace || !coupon.url) return false;
    if (coupon.codigo.trim().length < 2) return false;
    return true;
  }

  static isExpired(coupon: CouponRecord): boolean {
    if (!coupon.validade) return false;
    const expiry = new Date(coupon.validade);
    return expiry.getTime() < Date.now();
  }

  static normalize(coupon: Partial<CouponRecord>): CouponRecord {
    return {
      marketplace: coupon.marketplace || "Outro",
      marketplaceColor: coupon.marketplaceColor || "#ffffff",
      codigo: (coupon.codigo || "").trim().toUpperCase(),
      descricao: (coupon.descricao || "").trim(),
      url: (coupon.url || "").trim(),
      validade: coupon.validade,
      ativo: coupon.ativo ?? true,
      origem: coupon.origem || "manual",
      ultimaAtualizacao: new Date().toISOString(),
    };
  }
}

