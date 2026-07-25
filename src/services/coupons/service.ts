import { CouponCollector } from "./collector";
import { CouponRepository } from "./repository";
import { CollectorResult, CouponRecord } from "./types";

export class CouponService {
  static async syncAll(): Promise<CollectorResult[]> {
    const collected: CouponRecord[] = [
      ...(await CouponCollector.collectShopee()),
      ...(await CouponCollector.collectAmazon()),
      ...(await CouponCollector.collectMercadoLivre()),
      ...(await CouponCollector.collectShein()),
    ];

    const results: CollectorResult[] = [];

    if (collected.length === 0) {
      return results;
    }

    const upsertResult = await CouponRepository.upsertMany(collected);
    results.push(upsertResult);

    return results;
  }
}
