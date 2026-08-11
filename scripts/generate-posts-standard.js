const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const FONT_PATH = path.join(__dirname, "..", "canvas-fonts", "PlayfairDisplay-Regular.ttf");
const OUT_DIR = path.join(__dirname, "..", "public", "posts");

const posts = [
  // PT posts
  ["acessorios-moto-under-50-entregador", "Acessorios de Moto ate R$50"],
  ["achados-decoracao-apartamento-pequeno-luxo", "Decoracao para Apartamento Pequeno"],
  ["achados-pet-under-50-reais", "Achados Pet ate R$50"],
  ["achados-tecnologia-under-100-reais", "Tecnologia ate R$100"],
  ["produtos-beleza-under-40-skincare-barato", "Beleza e Skincare ate R$40"],
  ["como-criar-conteudo-instagram-seguidores", "Como Criar Conteudo no Instagram"],
  ["como-economizar-supermercado-dicas", "Como Economizar no Supermercado"],
  ["como-escolher-perfume-guia-completo", "Como Escolher Perfume"],
  ["como-fazer-mudanca-gastando-pouco", "Como Fazer Mudanca Gastando Pouco"],
  ["como-ganhar-dinheiro-como-afiliado-guia-2026", "Como Ganhar Dinheiro como Afiliado"],
  ["como-montar-guarda-roupa-capsula-gastando-poco-2026", "Guarda-Roupa Capsula"],
  ["como-organizar-apartamento-pequeno-com-pouco-dinheiro", "Organizar Apartamento Pequeno"],
  ["como-organizar-festinha-aniversario-sozinha", "Como Organizar Festinha Sozinha"],
  ["diy-lembrancinhas-aniversario-faca-voce-mesmo", "DIY Lembrancinhas Aniversario"],
  ["gadgets-para-quarto-2026", "Gadgets para Quarto"],
  ["guia-marketing-afiliados-iniciantes-2026", "Guia Marketing de Afiliados"],
  ["maquiagem-para-iniciantes-guia-passo-a-passo", "Maquiagem para Iniciantes"],
  ["melhores-apps-financas-pessoais-2026", "Melhores Apps de Financas"],
  ["melhores-calcas-jeans-ate-150-reais", "Melhores Calcas Jeans ate R$150"],
  ["melhores-calcas-jeans-feminino-guia-2026", "Melhores Calcas Jeans Feminino"],
  ["melhores-calcas-jeans-masculino-guia-2026", "Melhores Calcas Jeans Masculino"],
  ["organizar-quarto-tecnologia-guia", "Organizar Quarto com Tecnologia"],
  ["rotina-skincare-pele-oleosa-produtos-funcionam", "Rotina Skincare Pele Oleosa"],
  ["rotina-treino-feminino-perder-peso-dicas-2026", "Rotina de Treino Feminino"],
  ["tendencias-moda-primavera-verao-2026", "Tendencias Moda Primavera Verao"],
  // EN posts
  ["decoracao-sustentavel-20-ideias-ate-100-reais-en", "Sustainable Decor Ideas"],
  ["skincare-routine-oily-skin-products-work-en", "Skincare Routine for Oily Skin"],
  ["makeup-for-beginners-step-by-step-guide-en", "Makeup for Beginners"],
  ["how-to-save-at-grocery-store-tips-en", "How to Save at the Grocery Store"],
  ["how-to-organize-small-apartment-budget-en", "Small Apartment Organization"],
  ["how-to-move-on-a-budget-en", "How to Move on a Budget"],
  ["how-to-make-money-as-affiliate-guide-2026-en", "How to Make Money as an Affiliate"],
  ["how-to-create-instagram-content-followers-en", "How to Create Instagram Content"],
  ["how-to-choose-perfume-complete-guide-en", "How to Choose Perfume"],
  ["how-to-build-capsule-wardrobe-budget-2026-en", "Capsule Wardrobe on a Budget"],
  ["fashion-trends-spring-summer-2026-en", "Spring Summer Fashion Trends"],
  ["best-womens-jeans-guide-cuts-styles-2026-en", "Best Women's Jeans Guide"],
  ["best-personal-finance-apps-2026-en", "Best Personal Finance Apps"],
  ["best-mens-jeans-guide-cuts-styles-2026-en", "Best Men's Jeans Guide"],
  ["best-jeans-guide-men-women-2026-en", "Best Jeans Guide for Men and Women"],
  ["affiliate-marketing-guide-beginners-2026-en", "Affiliate Marketing Guide for Beginners"],
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
  return lines.slice(0, 2);
}

function generateStars(width, height, count) {
  let output = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const r = Math.floor(Math.random() * 2) + 1;
    const opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
    output += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" fill-opacity="${opacity}"/>`;
  }
  return output;
}

async function generate(filename, title, width, height) {
  const lines = breakText(title, width > height ? 28 : 18);
  const fontSize = width > height ? 72 : 96;
  const lineHeight = fontSize * 1.15;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  const titleSvg = lines
    .map((line, index) => {
      const y = startY + index * lineHeight;
      return `<text x="${width / 2}" y="${y}" font-family="'Playfair Display', serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" text-anchor="middle">${escapeXml(line)}</text>`;
    })
    .join("");

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face {
            font-family: 'Playfair Display';
            src: url('data:font/truetype;charset=utf-8;base64,${fs.readFileSync(FONT_PATH).toString("base64")}') format('truetype');
            font-weight: 700;
          }
        </style>
      </defs>
      <rect width="${width}" height="${height}" fill="#000000"/>
      ${generateStars(width, height, width > height ? 280 : 400)}
      ${titleSvg}
    </svg>
  `;

  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT_DIR, filename));
  console.log(`Generated ${filename}`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [slug, title] of posts) {
    await generate(`${slug}.png`, title, 2160, 3840);
    await generate(`${slug}-cover.png`, title, 3840, 2160);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
