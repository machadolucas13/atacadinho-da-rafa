import { NextResponse } from "next/server";
import { adminDb } from "@/server/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const INITIAL_COUPONS = [
  {
    codigo: "FREEGRÁTIS10",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    descricao: "Frete grátis em pedidos acima de R$ 29",
    url: "https://shopee.com.br",
    validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "shopee_affiliate",
  },
  {
    codigo: "ELETRO25",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    descricao: "25% OFF em eletrodomésticos selecionados",
    url: "https://shopee.com.br",
    validade: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "shopee_affiliate",
  },
  {
    codigo: "MODASHOPEE",
    marketplace: "Shopee",
    marketplaceColor: "#ee4d2d",
    descricao: "15% OFF em moda feminina",
    url: "https://shopee.com.br",
    validade: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "shopee_affiliate",
  },
  {
    codigo: "ECONOMIZE20",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    descricao: "20% OFF em produtos selecionados",
    url: "https://www.amazon.com.br",
    validade: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "amazon_creators",
  },
  {
    codigo: "PRIMEAMZ",
    marketplace: "Amazon",
    marketplaceColor: "#232f3e",
    descricao: "Frete grátis para Prime members",
    url: "https://www.amazon.com.br",
    validade: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "amazon_creators",
  },
  {
    codigo: "OFERTAML10",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    descricao: "R$ 10 OFF em compras acima de R$ 50",
    url: "https://www.mercadolivre.com.br",
    validade: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "mercadolibre_affiliate",
  },
  {
    codigo: "MLOFF20",
    marketplace: "Mercado Livre",
    marketplaceColor: "#fff159",
    descricao: "20% OFF em eletrônicos",
    url: "https://www.mercadolivre.com.br",
    validade: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "mercadolibre_affiliate",
  },
  {
    codigo: "SHEIN15",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    descricao: "15% OFF na primeira compra",
    url: "https://www.shein.com.br",
    validade: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "shein_affiliate",
  },
  {
    codigo: "SHEINNEW",
    marketplace: "SHEIN",
    marketplaceColor: "#000000",
    descricao: "10% OFF para novos usuários",
    url: "https://www.shein.com.br",
    validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    ativo: true,
    origem: "shein_affiliate",
  },
];

export async function POST() {
  try {
    const collectionRef = adminDb.collection("cupons");

    for (const coupon of INITIAL_COUPONS) {
      const ref = collectionRef.doc();
      await ref.set({
        ...coupon,
        id: ref.id,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        ultimaAtualizacao: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      ok: true,
      inserted: INITIAL_COUPONS.length,
      message: "Cupons iniciais criados com sucesso",
    });
  } catch (error) {
    console.error("Erro ao popular cupons:", error);
    return NextResponse.json(
      { ok: false, error: "Erro ao popular cupons" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Use POST para popular cupons iniciais",
    count: INITIAL_COUPONS.length,
  });
}

