"use server";

import { isAdminAuthenticated } from "@/server/admin-session";
import { adminDb } from "@/server/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function criarProduto(formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.preco = parseFloat(data.preco as string) || 0;
    data.precoOriginal = data.precoOriginal ? parseFloat(data.precoOriginal as string) : null;
    data.tags = (data.tags as string)
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    data.numAvaliacoes = 0;
    data.avaliacao = 0;
    data.moeda = "BRL";
    data.imagens = [];
    data.visualizacoes = 0;
    data.cliques = 0;
    data.conversoes = 0;
    data.ativo = data.ativo === "true";
    data.destaque = data.destaque === "true";
    data.viral = data.viral === "true";
    data.criadoEm = FieldValue.serverTimestamp();
    data.atualizadoEm = FieldValue.serverTimestamp();

    const ref = await adminDb.collection("produtos").add(data);
    return { ok: true, id: ref.id };
  } catch (error) {
    return { error: "Erro ao criar produto" };
  }
}

export async function atualizarProduto(id: string, formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.preco = parseFloat(data.preco as string) || 0;
    data.precoOriginal = data.precoOriginal ? parseFloat(data.precoOriginal as string) : null;
    data.tags = (data.tags as string)
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    data.ativo = data.ativo === "true";
    data.destaque = data.destaque === "true";
    data.viral = data.viral === "true";
    data.atualizadoEm = FieldValue.serverTimestamp();

    await adminDb.collection("produtos").doc(id).update(data);
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao atualizar produto" };
  }
}

export async function excluirProduto(id: string) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    await adminDb.collection("produtos").doc(id).delete();
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao excluir produto" };
  }
}

export async function criarArtigo(formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.tags = (data.tags as string)
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    data.visualizacoes = 0;
    data.destaque = data.destaque === "true";
    data.ativo = data.ativo === "true";
    data.publicadoEm = FieldValue.serverTimestamp();
    data.criadoEm = FieldValue.serverTimestamp();
    data.atualizadoEm = FieldValue.serverTimestamp();

    const ref = await adminDb.collection("artigos").add(data);
    return { ok: true, id: ref.id };
  } catch (error) {
    return { error: "Erro ao criar artigo" };
  }
}

export async function atualizarArtigo(id: string, formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.tags = (data.tags as string)
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    data.destaque = data.destaque === "true";
    data.ativo = data.ativo === "true";
    data.atualizadoEm = FieldValue.serverTimestamp();

    await adminDb.collection("artigos").doc(id).update(data);
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao atualizar artigo" };
  }
}

export async function excluirArtigo(id: string) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    await adminDb.collection("artigos").doc(id).delete();
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao excluir artigo" };
  }
}

export async function criarPasta(formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.ordem = 0;
    data.ativo = data.ativo === "true";
    data.destaque = data.destaque === "true";
    data.criadoEm = FieldValue.serverTimestamp();
    data.atualizadoEm = FieldValue.serverTimestamp();

    const ref = await adminDb.collection("pastas").add(data);
    return { ok: true, id: ref.id };
  } catch (error) {
    return { error: "Erro ao criar pasta" };
  }
}

export async function atualizarPasta(id: string, formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.ativo = data.ativo === "true";
    data.destaque = data.destaque === "true";
    data.atualizadoEm = FieldValue.serverTimestamp();

    await adminDb.collection("pastas").doc(id).update(data);
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao atualizar pasta" };
  }
}

export async function excluirPasta(id: string) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    await adminDb.collection("pastas").doc(id).delete();
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao excluir pasta" };
  }
}

export async function criarArtigoCompleto(formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    const produtosJson = data.produtos_json ? JSON.parse(data.produtos_json as string) : [];
    delete data.produtos_json;

    data.tags = (data.tags as string)
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    data.imagens = produtosJson.filter((p: any) => p.imagem).map((p: any) => p.imagem);
    data.visualizacoes = 0;
    data.destaque = data.destaque === "true";
    data.ativo = data.ativo === "true";
    data.publicadoEm = FieldValue.serverTimestamp();
    data.criadoEm = FieldValue.serverTimestamp();
    data.atualizadoEm = FieldValue.serverTimestamp();
    data.tempoLeitura = Math.max(1, Math.ceil((data.conteudo?.toString() || "").length / 500));

    const ref = await adminDb.collection("artigos").add(data);

    for (const produto of produtosJson) {
      if (!produto.nome || !produto.linkAfiliado) continue;
      const payload = new FormData();
      Object.entries(produto).forEach(([key, value]) => {
        payload.append(key, typeof value === "boolean" ? String(value) : (value as string));
      });
      payload.append("categoriaId", data.categoriaId || "");
      await criarProduto(payload);
    }

    return { ok: true, id: ref.id };
  } catch (error) {
    return { error: "Erro ao criar post" };
  }
}

export async function criarCupom(formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.ativo = data.ativo === "true";
    data.criadoEm = FieldValue.serverTimestamp();
    data.atualizadoEm = FieldValue.serverTimestamp();

    const ref = await adminDb.collection("cupons").add(data);
    return { ok: true, id: ref.id };
  } catch (error) {
    return { error: "Erro ao criar cupom" };
  }
}

export async function atualizarCupom(id: string, formData: FormData) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    const data: any = Object.fromEntries(formData.entries());
    data.ativo = data.ativo === "true";
    data.atualizadoEm = FieldValue.serverTimestamp();

    await adminDb.collection("cupons").doc(id).update(data);
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao atualizar cupom" };
  }
}

export async function excluirCupom(id: string) {
  if (!isAdminAuthenticated()) {
    return { error: "Não autorizado" };
  }

  try {
    await adminDb.collection("cupons").doc(id).delete();
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao excluir cupom" };
  }
}
