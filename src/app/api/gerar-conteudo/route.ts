export const revalidate = 0;

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { tipo, texto, categoria } = await request.json();

    if (!texto || typeof texto !== "string" || texto.trim().length === 0) {
      return NextResponse.json(
        { error: "Envie um texto ou título para a IA trabalhar." },
        { status: 400 }
      );
    }

    const input = texto.trim();
    const lower = input.toLowerCase();

    let sugestoes: any = {};

    if (tipo === "post") {
      const titulo = gerarTitulo(input, categoria);
      const descricao = gerarDescricao(input, categoria);
      const hashtags = gerarHashtags(input, categoria);
      const textoFacebook = gerarFacebook(titulo, descricao, hashtags);
      const textoPinterest = gerarPinterest(titulo, descricao, hashtags);
      const slug = titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80);

      sugestoes = {
        titulo,
        descricao,
        hashtags,
        textoFacebook,
        textoPinterest,
        slug,
      };
    }

    return NextResponse.json({ sugestoes });
  } catch (error) {
    console.error("Erro ao gerar sugestões:", error);
    return NextResponse.json(
      { error: "Erro ao gerar sugestões" },
      { status: 500 }
    );
  }
}

function gerarTitulo(input: string, categoria?: string): string {
  const lower = input.toLowerCase();
  if (categoria && !lower.includes(categoria.toLowerCase())) {
    return `${input.slice(0, 55)} | ${categoria}`;
  }
  const clean = input
    .replace(/\s+/g, " ")
    .replace(/[^\w\s-]/g, "")
    .trim();
  return clean.length > 65 ? `${clean.slice(0, 62)}...` : clean;
}

function gerarDescricao(input: string, categoria?: string): string {
  const lower = input.toLowerCase();
  const frases = input
    .split(/[.\n\r!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  const base = frases.length >= 2 ? frases.slice(0, 2).join(". ") : input;
  const extra =
    categoria && !base.toLowerCase().includes(categoria.toLowerCase())
      ? ` Confira opções incríveis de ${categoria}.`
      : " Veja mais achados selecionados com preço baixo.";

  if (base.length + extra.length > 220) {
    return base.slice(0, 200).trimEnd() + "...";
  }
  return base + extra;
}

function gerarHashtags(input: string, categoria?: string): string[] {
  const lower = input.toLowerCase();
  const tags = new Set<string>([
    "achados",
    "ofertas",
    "descobertas",
    "AtacadinhoDaRafa",
    "preçoBaixo",
  ]);

  if (categoria) {
    tags.add(
      categoria
        .normalize("NFD")
        .replace(/[^a-zA-Z\s-]/g, "")
        .replace(/\s+/g, "")
        .trim()
    );
  }

  lower
    .split(/[\s,]+/)
    .filter((w) => w.length > 3 && !/^(tem|que|com|para|este|esse|uma|dos|das|dos|nos|nas|mais|muito|pouco|melhor|melhores)$/.test(w))
    .slice(0, 4)
    .forEach((w) => tags.add(w.replace(/[^a-z0-9]/g, "")));

  return Array.from(tags).slice(0, 8);
}

function gerarFacebook(
  titulo: string,
  descricao: string,
  hashtags: string[]
): string {
  return `${titulo}\n\n${descricao}\n\n${hashtags.join(" ")}\n\nConfira mais em: https://v0-atacadinhodarafa.vercel.app`;
}

function gerarPinterest(
  titulo: string,
  descricao: string,
  hashtags: string[]
): string {
  return `${titulo}\n\n${descricao}\n\n${hashtags.slice(0, 5).join(" ")}`;
}

