import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { CouponRecord, CollectorResult } from "./types";
import { CouponValidator } from "./validator";

export class CouponRepository {
  private static collectionName = "cupons";

  static async findAllActive(): Promise<CouponRecord[]> {
    const q = query(collection(db, this.collectionName), where("ativo", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CouponRecord));
  }

  static async findByCodigo(codigo: string): Promise<CouponRecord | null> {
    const q = query(collection(db, this.collectionName), where("codigo", "==", codigo));
    const snapshot = await getDocs(q);
    const doc = snapshot.docs[0];
    return doc ? ({ id: doc.id, ...doc.data() } as CouponRecord) : null;
  }

  static async upsertMany(items: CouponRecord[]): Promise<CollectorResult> {
    const result: CollectorResult = {
      ok: true,
      marketplace: items[0]?.marketplace || "Outro",
      source: items[0]?.origem || "manual",
      found: items.length,
      inserted: 0,
      updated: 0,
      expired: 0,
    };

    const batch = writeBatch(db);
    const existingCodes = new Set<string>();

    for (const item of items) {
      const normalized = CouponValidator.normalize(item);
      if (!CouponValidator.isValid(normalized)) continue;

      const existing = await this.findByCodigo(normalized.codigo);
      const ref = existing?.id ? doc(db, this.collectionName, existing.id) : doc(collection(db, this.collectionName));

      const payload: any = {
        ...normalized,
        updatedAt: serverTimestamp(),
      };

      if (existing) {
        payload.createdAt = existing.createdAt;
        batch.update(ref, payload);
        result.updated += 1;
      } else {
        payload.createdAt = serverTimestamp();
        batch.set(ref, payload);
        result.inserted += 1;
      }

      existingCodes.add(normalized.codigo);
    }

    await batch.commit();

    const allActive = await this.findAllActive();
    const now = Date.now();
    const expiredBatch = writeBatch(db);
    let expiredCount = 0;

    for (const coupon of allActive) {
      if (!existingCodes.has(coupon.codigo) && coupon.validade) {
        const expiry = new Date(coupon.validade).getTime();
        if (expiry < now) {
          const ref = doc(db, this.collectionName, coupon.id as string);
          expiredBatch.update(ref, { ativo: false, updatedAt: serverTimestamp() });
          expiredCount += 1;
        }
      }
    }

    if (expiredCount > 0) {
      await expiredBatch.commit();
    }

    result.expired = expiredCount;
    return result;
  }
}

