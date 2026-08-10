const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.join(__dirname, "..", "public", "posts");

const posts = [
  ["acessorios-moto-under-50-entregador", "Acessorios de Moto ate R$50", "Achados uteis para entregadores"],
  ["achados-decoracao-apartamento-pequeno-luxo", "Decoracao para Apartamento Pequeno", "Ideias bonitas com cara de luxo"],
  ["achados-pet-under-50-reais", "Achados Pet ate R$50", "Produtos baratos para cuidar melhor"],
  ["achados-tecnologia-under-100-reais", "Tecnologia ate R$100", "Gadgets baratos que valem a pena"],
  ["produtos-beleza-under-40-skincare-barato", "Beleza e Skincare ate R$40", "Produtos baratos que funcionam"],
  ["guia-marketing-afiliados-iniciantes-2026-en", "Affiliate Marketing Guide", "Beginner friendly 2026 edition"],
  ["calca-jeans-masculina-feminina-guia-2026-en", "Best Jeans Guide", "Cuts, fits and smart deals"],
  ["melhores-apps-financas-pessoais-2026-en", "Best Finance Apps", "Organize money with less stress"],
  ["tendencias-moda-primavera-verao-2026-en", "Spring Summer Fashion Trends", "Fresh outfit ideas for 2026"],
  ["como-montar-guarda-roupa-capsula-gastando-poco-2026-en", "Capsule Wardrobe on a Budget", "Simple outfits, smarter shopping"],
  ["como-escolher-perfume-guia-completo-en", "How to Choose Perfume", "A complete practical guide"],
  ["como-criar-conteudo-instagram-seguidores-en", "Instagram Content Ideas", "Grow with better posts"],
  ["como-ganhar-dinheiro-como-afiliado-guia-2026-en", "Make Money as an Affiliate", "Practical guide for beginners"],
  ["como-fazer-mudanca-gastando-pouco-en", "Move on a Budget", "Save money and stay organized"],
  ["como-organizar-apartamento-pequeno-com-pouco-dinheiro-en", "Small Apartment Organization", "More space with less money"],
  ["como-economizar-supermercado-dicas-en", "Save at the Grocery Store", "Smart shopping tips"],
  ["maquiagem-para-iniciantes-guia-passo-a-passo-en", "Makeup for Beginners", "Simple step by step guide"],
  ["rotina-skincare-pele-oleosa-produtos-funcionam-en", "Skincare for Oily Skin", "Products and routine that work"],
  ["decoracao-sustentavel-20-ideias-ate-100-reais-en", "Sustainable Decor Ideas", "Beautiful ideas under R$100"],
];

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function breakText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function stars(width, height, count) {
  let output = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const r = Math.floor(Math.random() * 3) + 1;
    const opacity = (Math.random() * 0.45 + 0.2).toFixed(2);
    output += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" fill-opacity="${opacity}"/>`;
  }
  return output;
}

function cardShapes(width, height) {
  return `
    <circle cx="${width * 0.16}" cy="${height * 0.18}" r="${width * 0.16}" fill="#F4A7B9" fill-opacity="0.18"/>
    <circle cx="${width * 0.86}" cy="${height * 0.78}" r="${width * 0.18}" fill="#FFD166" fill-opacity="0.14"/>
    <rect x="${width * 0.12}" y="${height * 0.68}" width="${width * 0.22}" height="${height * 0.12}" rx="28" fill="#E11D48" fill-opacity="0.26"/>
    <rect x="${width * 0.66}" y="${height * 0.14}" width="${width * 0.2}" height="${height * 0.11}" rx="24" fill="#38BDF8" fill-opacity="0.18"/>
  `;
}

async function generate(filename, title, subtitle, width, height) {
  const lines = breakText(title, width > height ? 32 : 20);
  const fontSize = width > height ? 88 : 112;
  const lineHeight = fontSize * 1.08;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  const titleSvg = lines
    .map((line, index) => {
      const y = startY + index * lineHeight;
      return `<text x="${width / 2}" y="${y}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="800" fill="#ffffff" text-anchor="middle">${escapeXml(line)}</text>`;
    })
    .join("");

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#090914"/>
          <stop offset="48%" stop-color="#171326"/>
          <stop offset="100%" stop-color="#080812"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      ${stars(width, height, width > height ? 320 : 460)}
      ${cardShapes(width, height)}
      <rect x="${width * 0.08}" y="${height * 0.1}" width="${width * 0.84}" height="${height * 0.8}" rx="42" fill="#ffffff" fill-opacity="0.045" stroke="#ffffff" stroke-opacity="0.12"/>
      ${titleSvg}
      <text x="${width / 2}" y="${startY + lines.length * lineHeight + fontSize * 0.55}" font-family="Arial, sans-serif" font-size="${Math.floor(fontSize * 0.36)}" font-weight="500" fill="#F4A7B9" text-anchor="middle">${escapeXml(subtitle)}</text>
      <text x="${width / 2}" y="${height - height * 0.12}" font-family="Arial, sans-serif" font-size="${Math.floor(fontSize * 0.24)}" font-weight="700" fill="#ffffff" fill-opacity="0.7" text-anchor="middle">ATACADINHO DA RAFA</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT_DIR, filename));
  console.log(`Generated ${filename}`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [slug, title, subtitle] of posts) {
    await generate(`${slug}.png`, title, subtitle, 2160, 3840);
    await generate(`${slug}-cover.png`, title, subtitle, 3840, 2160);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
