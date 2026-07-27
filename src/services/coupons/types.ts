export type CouponSource =
  | "shopee_affiliate"
  | "amazon_creators"
  | "mercadolibre_affiliate"
  | "shein_affiliate"
  | "manual";

export type MarketPlace = "Shopee" | "Amazon" | "Mercado Livre" | "SHEIN" | "Outro";

export interface CouponRecord {
  id?: string;
  marketplace: MarketPlace;
  marketplaceColor?: string;
  codigo: string;
  descricao: string;
  url: string;
  validade?: string;
  ativo: boolean;
  ultimaAtualizacao?: string;
  origem: CouponSource;
  createdAt?: string;
  updatedAt?: string;
}

export interface CollectorResult {
  ok: boolean;
  marketplace: MarketPlace;
  source: CouponSource;
  found: number;
  inserted: number;
  updated: number;
  expired: number;
  error?: string;
}

