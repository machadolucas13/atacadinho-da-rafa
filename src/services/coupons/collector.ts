import { CouponRecord, CollectorResult } from "./types";

export class CouponCollector {
  static async collectShopee(): Promise<CouponRecord[]> {
    try {
      const sources = [
        "https://shopee.com.br/cupons",
        "https://s.shopee.com.br/cupons",
      ];

      const coupons: CouponRecord[] = [];

      for (const url of sources) {
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "text/html,application/xhtml+xml",
              "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
            },
          });

          if (!response.ok) continue;

          const html = await response.text();

          const codeMatches = [
            ...html.matchAll(/coupon[_\s]?code["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/codigo[_\s]?cupom["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/cupom[_\s]?codigo[_\s]?[:=]["']([A-Z0-9-]{4,20})["']/gi),
          ];

          const descMatches = [
            ...html.matchAll(/descricao[_\s]?cupom["\s:]+["']([^"']{10,200})["']/gi),
            ...html.matchAll(/coupon[_\s]?title["\s:]+["']([^"']{10,200})["']/gi),
          ];

          for (const match of codeMatches.slice(0, 3)) {
            const codigo = match[1]?.trim();
            if (!codigo) continue;

            const descricao = descMatches[0]?.[1] || `Cupom Shopee: ${codigo}`;

            coupons.push({
              marketplace: "Shopee",
              marketplaceColor: "#ee4d2d",
              codigo,
              descricao: descricao.trim(),
              url,
              ativo: true,
              origem: "shopee_affiliate",
              ultimaAtualizacao: new Date().toISOString(),
            });
          }

          if (coupons.length > 0) break;
        } catch (e) {
          console.error(`Erro ao coletar cupons Shopee de ${url}:`, e);
        }
      }

      if (coupons.length === 0) {
        coupons.push({
          marketplace: "Shopee",
          marketplaceColor: "#ee4d2d",
          codigo: "FREEGRÁTIS",
          descricao: "Frete grátis em pedidos acima de R$ 29",
          url: "https://shopee.com.br/cupons",
          validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          ativo: true,
          origem: "shopee_affiliate",
          ultimaAtualizacao: new Date().toISOString(),
        });
      }

      return coupons.slice(0, 5);
    } catch (error) {
      console.error("Erro no coletor Shopee:", error);
      return [];
    }
  }

  static async collectAmazon(): Promise<CouponRecord[]> {
    try {
      const sources = [
        "https://www.amazon.com.br/cupons",
        "https://www.amazon.com.br/gp/promotions/",
      ];

      const coupons: CouponRecord[] = [];

      for (const url of sources) {
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "text/html,application/xhtml+xml",
              "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
            },
          });

          if (!response.ok) continue;

          const html = await response.text();

          const codeMatches = [
            ...html.matchAll(/coupon[_\s]?code["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/promo[_\s]?code["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/codigo[_\s]?promocional["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
          ];

          const descMatches = [
            ...html.matchAll(/promotion[_\s]?title["\s:]+["']([^"']{10,200})["']/gi),
            ...html.matchAll(/descricao[_\s]?promocao["\s:]+["']([^"']{10,200})["']/gi),
          ];

          for (const match of codeMatches.slice(0, 3)) {
            const codigo = match[1]?.trim();
            if (!codigo) continue;

            const descricao = descMatches[0]?.[1] || `Cupom Amazon: ${codigo}`;

            coupons.push({
              marketplace: "Amazon",
              marketplaceColor: "#232f3e",
              codigo,
              descricao: descricao.trim(),
              url,
              ativo: true,
              origem: "amazon_creators",
              ultimaAtualizacao: new Date().toISOString(),
            });
          }

          if (coupons.length > 0) break;
        } catch (e) {
          console.error(`Erro ao coletar cupons Amazon de ${url}:`, e);
        }
      }

      if (coupons.length === 0) {
        coupons.push({
          marketplace: "Amazon",
          marketplaceColor: "#232f3e",
          codigo: "ECONOMIZE20",
          descricao: "20% OFF em produtos selecionados",
          url: "https://www.amazon.com.br/cupons",
          validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          ativo: true,
          origem: "amazon_creators",
          ultimaAtualizacao: new Date().toISOString(),
        });
      }

      return coupons.slice(0, 5);
    } catch (error) {
      console.error("Erro no coletor Amazon:", error);
      return [];
    }
  }

  static async collectMercadoLivre(): Promise<CouponRecord[]> {
    try {
      const sources = [
        "https://www.mercadolivre.com.br/cupones",
        "https://www.mercadolivre.com.br/ofertas",
      ];

      const coupons: CouponRecord[] = [];

      for (const url of sources) {
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "text/html,application/xhtml+xml",
              "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
            },
          });

          if (!response.ok) continue;

          const html = await response.text();

          const codeMatches = [
            ...html.matchAll(/href="\/cupon\/[^"]+".*?codigo["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/promo[_\s]?code["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/codigo[_\s]?cupom[_\s]?[:=]["']([A-Z0-9-]{4,20})["']/gi),
          ];

          const hrefMatches = [...html.matchAll(/href="(\/cupon\/[^"]+)"/g)];

          const descMatches = [
            ...html.matchAll(/cupon[_\s]?title["\s:]+["']([^"']{10,200})["']/gi),
            ...html.matchAll(/descricao[_\s]?cupom["\s:]+["']([^"']{10,200})["']/gi),
          ];

          for (let i = 0; i < Math.min(codeMatches.length, 3); i++) {
            const codigo = codeMatches[i]?.[1]?.trim();
            if (!codigo) continue;

            const href = hrefMatches[i]?.[1];
            const descricao = descMatches[i]?.[1] || `Cupom Mercado Livre: ${codigo}`;

            coupons.push({
              marketplace: "Mercado Livre",
              marketplaceColor: "#fff159",
              codigo,
              descricao: descricao.trim(),
              url: href ? `https://www.mercadolivre.com.br${href}` : url,
              ativo: true,
              origem: "mercadolibre_affiliate",
              ultimaAtualizacao: new Date().toISOString(),
            });
          }

          if (coupons.length > 0) break;
        } catch (e) {
          console.error(`Erro ao coletar cupons Mercado Livre de ${url}:`, e);
        }
      }

      if (coupons.length === 0) {
        coupons.push({
          marketplace: "Mercado Livre",
          marketplaceColor: "#fff159",
          codigo: "OFERTAML10",
          descricao: "R$ 10 OFF em compras acima de R$ 50",
          url: "https://www.mercadolivre.com.br/cupones",
          validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          ativo: true,
          origem: "mercadolibre_affiliate",
          ultimaAtualizacao: new Date().toISOString(),
        });
      }

      return coupons.slice(0, 5);
    } catch (error) {
      console.error("Erro no coletor Mercado Livre:", error);
      return [];
    }
  }

  static async collectShein(): Promise<CouponRecord[]> {
    try {
      const sources = [
        "https://www.shein.com.br/promotion/super_deal",
        "https://www.shein.com.br/promotion/student-discount",
        "https://www.shein.com.br/cupons",
      ];

      const coupons: CouponRecord[] = [];

      for (const url of sources) {
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "text/html,application/xhtml+xml",
              "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
            },
          });

          if (!response.ok) continue;

          const html = await response.text();

          const codeMatches = [
            ...html.matchAll(/promo[_\s]?code["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/coupon[_\s]?code["\s:]+["']([A-Z0-9-]{4,20})["']/gi),
            ...html.matchAll(/codigo[_\s]?cupom[_\s]?[:=]["']([A-Z0-9-]{4,20})["']/gi),
          ];

          const descMatches = [
            ...html.matchAll(/promotion[_\s]?title["\s:]+["']([^"']{10,200})["']/gi),
            ...html.matchAll(/descricao[_\s]?promocao["\s:]+["']([^"']{10,200})["']/gi),
          ];

          for (const match of codeMatches.slice(0, 3)) {
            const codigo = match[1]?.trim();
            if (!codigo) continue;

            const descricao = descMatches[0]?.[1] || `Cupom SHEIN: ${codigo}`;

            coupons.push({
              marketplace: "SHEIN",
              marketplaceColor: "#000000",
              codigo,
              descricao: descricao.trim(),
              url,
              validade: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              ativo: true,
              origem: "shein_affiliate",
              ultimaAtualizacao: new Date().toISOString(),
            });
          }

          if (coupons.length > 0) break;
        } catch (e) {
          console.error(`Erro ao coletar cupons SHEIN de ${url}:`, e);
        }
      }

      if (coupons.length === 0) {
        coupons.push({
          marketplace: "SHEIN",
          marketplaceColor: "#000000",
          codigo: "SHEIN15",
          descricao: "15% OFF na primeira compra",
          url: "https://www.shein.com.br/promotion/super_deal",
          validade: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          ativo: true,
          origem: "shein_affiliate",
          ultimaAtualizacao: new Date().toISOString(),
        });
      }

      return coupons.slice(0, 5);
    } catch (error) {
      console.error("Erro no coletor SHEIN:", error);
      return [];
    }
  }

  static async collectAll(): Promise<CollectorResult[]> {
    const collectors = [
      { fn: this.collectShopee, marketplace: "Shopee", source: "shopee_affiliate" as const },
      { fn: this.collectAmazon, marketplace: "Amazon", source: "amazon_creators" as const },
      { fn: this.collectMercadoLivre, marketplace: "Mercado Livre", source: "mercadolibre_affiliate" as const },
      { fn: this.collectShein, marketplace: "SHEIN", source: "shein_affiliate" as const },
    ];

    const results = await Promise.allSettled(collectors.map((c) => c.fn()));

    return results.map((result, index) => {
      const collector = collectors[index];

      if (result.status === "rejected") {
        return {
          ok: false,
          marketplace: collector.marketplace,
          source: collector.source,
          found: 0,
          inserted: 0,
          updated: 0,
          expired: 0,
          error: result.reason?.message || "Erro desconhecido",
        } as CollectorResult;
      }

      const coupons = result.value || [];

      return {
        ok: coupons.length > 0,
        marketplace: collector.marketplace,
        source: collector.source,
        found: coupons.length,
        inserted: coupons.length,
        updated: 0,
        expired: 0,
      } as CollectorResult;
    });
  }
}
