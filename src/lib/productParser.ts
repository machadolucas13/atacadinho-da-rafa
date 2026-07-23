const MONEY_REGEX = /R\$\s*(\d+[,.]?\d*)/gi;
const URL_REGEX = /https?:\/\/[^\s]+/gi;
const PRICE_REGEX = /(?:preço|price|valor)[:\s]+R\$\s*([\d,.]+)/gi;
const NAME_REGEX = /^([^\n\r]*?)(?:\s*-\s*R\$|\s*preço|\s*price|\s*valor|\s*link|\s*http|\s*https|\s*loja|\s*descrição|\s*descricao|\s*r\$)/i;

function toNumber(value: string): number {
  if (!value) return 0;
  return parseFloat(value.replace(",", ".")) || 0;
}

function extractFirst(regex: RegExp, text: string): string {
  const match = regex.exec(text);
  if (match) {
    regex.lastIndex = 0;
    return match[1] || match[0];
  }
  regex.lastIndex = 0;
  return "";
}

export function parseProductText(text: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  const fullText = text;
  const prices = Array.from(fullText.matchAll(MONEY_REGEX)).map((m) => m[1].replace(",", "."));
  const uniquePrices = [...new Set(prices)].map((p) => toNumber(p)).filter((p) => p > 0);
  const price = uniquePrices[0] || 0;
  const originalPrice = uniquePrices[1] || 0;

  const urls = Array.from(fullText.matchAll(URL_REGEX)).map((m) => m[0]);
  const link = urls[0] || "";

  const firstLine = lines[0] || "";
  const name = extractFirst(NAME_REGEX, firstLine) || firstLine;

  const lojaMatch = fullText.match(/(?:loja|shop|store)[:\s]+([^\n\r]+)/i);
  const loja = lojaMatch ? lojaMatch[1].trim() : "";

  const descMatch = fullText.match(/(?:descri[çc][ãa]o|desc|sobre)[:\s]+([^\n\r]+)/i);
  const description = descMatch ? descMatch[1].trim() : lines.slice(1).join(" ");

  return {
    nome: name.slice(0, 120),
    preco: price,
    precoOriginal: originalPrice > price ? originalPrice : 0,
    linkAfiliado: link,
    loja: loja || "Loja",
    descricaoCurta: description.slice(0, 160),
    descricao: description,
    tags: lines.join(", ").slice(0, 120),
  };
}
