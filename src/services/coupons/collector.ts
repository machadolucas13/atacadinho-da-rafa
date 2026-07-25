import { CouponRecord, CollectorResult } from "./types";

export class CouponCollector {
  static async collectShopee(): Promise<CouponRecord[]> {
    try {
      const appId = process.env.SHOPEE_AFFILIATE_APP_ID;
      const appSecret = process.env.SHOPEE_AFFILIATE_SECRET;

      if (!appId || !appSecret) {
        console.warn("Credenciais Shopee não configuradas.");
        return [];
      }

      const baseUrl = "https://open.affiliate.shopee.com.br/graphql";
      const timestamp = Math.floor(Date.now() / 1000);
      const payload = JSON.stringify({
        query: `
          query {
            productOfferV2(
              pageType: 0
              sortType: 2
              limit: 20
              offset: 0
            ) {
              nodes {
                itemId
                shopId
                name
                offerLink
                price
                historicalSold
              }
            }
          }
        `,
      });

      const signature = require("crypto")
        .createHmac("sha256", appSecret)
        .update(appId + timestamp + payload)
        .digest("base64");

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `SHA256 {appId="${appId}",timestamp="${timestamp}",signature="${signature}"}`,
        },
        body: payload,
      });

      if (!response.ok) {
        console.error("Erro na API Shopee:", response.status, await response.text());
        return [];
      }

      const result = await response.json();
      const nodes = result?.data?.productOfferV2?.nodes || [];

      return nodes.map((node: any) => ({
        marketplace: "Shopee" as const,
        marketplaceColor: "#ee4d2d",
        codigo: `SHOPEE-${node.itemId}`,
        descricao: node.name,
        url: node.offerLink || `https://shopee.com.br/product/${node.shopId}/${node.itemId}`,
        validade: undefined,
        ativo: true,
        origem: "shopee_affiliate" as const,
        ultimaAtualizacao: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Erro no coletor Shopee:", error);
      return [];
    }
  }

  static async collectAmazon(): Promise<CouponRecord[]> {
    try {
      const amazonKey = process.env.AMAZON_ASSOCIATE_TAG;

      if (!amazonKey) {
        console.warn("Credenciais Amazon não configuradas.");
        return [];
      }

      const endpoint = `https://www.amazon.com.br/s?k=oferta&tag=${amazonKey}`;
      const response = await fetch(endpoint, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AtacadinhoBot/1.0)",
          Accept: "text/html",
        },
      });

      if (!response.ok) {
        console.error("Erro na resposta Amazon:", response.status);
        return [];
      }

      const html = await response.text();

      const couponMatches = html.match(/couponCode["\s:]+([A-Z0-9-]+)/gi) || [];
      const priceMatches = html.match(/R\$\s*[\d.,]+/g) || [];

      const coupons: CouponRecord[] = [];

      for (let i = 0; i < couponMatches.length && i < 5; i++) {
        const codeMatch = couponMatches[i].match(/"([A-Z0-9-]+)"/);
        const priceMatch = priceMatches[i];

        if (codeMatch && priceMatch) {
          coupons.push({
            marketplace: "Amazon" as const,
            marketplaceColor: "#232f3e",
            codigo: codeMatch[1],
            descricao: `Oferta Amazon: ${priceMatch}`,
            url: endpoint,
            ativo: true,
            origem: "amazon_creators" as const,
            ultimaAtualizacao: new Date().toISOString(),
          });
        }
      }

      return coupons;
    } catch (error) {
      console.error("Erro no coletor Amazon:", error);
      return [];
    }
  }

  static async collectMercadoLivre(): Promise<CouponRecord[]> {
    try {
      const url = "https://www.mercadolivre.com.br/cupones";
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AtacadinhoBot/1.0)",
          Accept: "text/html",
        },
      });

      if (!response.ok) {
        console.error("Erro na resposta Mercado Livre:", response.status);
        return [];
      }

      const html = await response.text();
      const couponBlocks = html.match(/href="\/cupon\/[^"]+".*?[0-9]+%/gis) || [];

      const coupons: CouponRecord[] = [];
      for (const block of couponBlocks.slice(0, 5)) {
        const hrefMatch = block.match(/href="(\/cupon\/[^"]+)"/);
        const percentMatch = block.match(/(\d+)%/);

        if (hrefMatch) {
          coupons.push({
            marketplace: "Mercado Livre" as const,
            marketplaceColor: "#fff159",
            codigo: `ML-${hrefMatch[1].replace("/cupon/", "").toUpperCase()}`,
            descricao: percentMatch
              ? `Até ${percentMatch[1]}% OFF em compras selecionadas`
              : "Cupom de desconto do Mercado Livre",
            url: `https://www.mercadolivre.com.br${hrefMatch[1]}`,
            ativo: true,
            origem: "mercadolibre_affiliate" as const,
            ultimaAtualizacao: new Date().toISOString(),
          });
        }
      }

      return coupons;
    } catch (error) {
      console.error("Erro no coletor Mercado Livre:", error);
      return [];
    }
  }

  static async collectShein(): Promise<CouponRecord[]> {
    try {
      const couponSections = [
        { title: "SHEIN Flash Sale", color: "#000000", url: "https://www.shein.com.br/promotion/super_deal" },
        { title: "SHEIN Prime Deals", color: "#000000", url: "https://www.shein.com.br/promotion/summer" },
      ];

      const coupons: CouponRecord[] = [];
      for (const section of couponSections) {
        coupons.push({
          marketplace: "SHEIN" as const,
          marketplaceColor: section.color,
          codigo: `SHEIN-${Date.now().toString(36).toUpperCase()}`,
          descricao: section.title,
          url: section.url,
          validade: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          ativo: true,
          origem: "shein_affiliate" as const,
          ultimaAtualizacao: new Date().toISOString(),
        });
      }

      return coupons;
    } catch (error) {
      console.error("Erro no coletor SHEIN:", error);
      return [];
    }
  }

  static async collectAll(): Promise<CollectorResult[]> {
    const collectors = [
      this.collectShopee,
      this.collectAmazon,
      this.collectMercadoLivre,
      this.collectShein,
    ];

    const results = await Promise.allSettled(collectors.map((collector) => collector()));
    return results.map((result, index) => {
      if (result.status === "rejected") {
        return {
          ok: false,
          marketplace: ["Shopee", "Amazon", "Mercado Livre", "SHEIN"][index] as any,
          source: ["shopee_affiliate", "amazon_creators", "mercadolibre_affiliate", "shein_affiliate"][index] as any,
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
        marketplace: coupons[0]?.marketplace || "Outro",
        source: coupons[0]?.origem || "manual",
        found: coupons.length,
        inserted: coupons.length,
        updated: 0,
        expired: 0,
      } as CollectorResult;
    });
  }
}
