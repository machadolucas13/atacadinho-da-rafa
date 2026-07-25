const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const fontPath = path.join(__dirname, '..', 'canvas-fonts', 'PlayfairDisplay-Regular.ttf');
const OUT_DIR = path.join(__dirname, '..', 'public', 'posts');

const posts = [
  { slug: 'tendencias-moda-primavera-verao-2026', titulo: 'Tendências de moda primavera verão 2026' },
  { slug: 'rotina-treino-feminino-perder-peso-dicas-2026', titulo: 'Rotina de treino feminino para perder peso' },
  { slug: 'rotina-skincare-pele-oleosa-produtos-funcionam', titulo: 'Rotina de skincare para pele oleosa' },
  { slug: 'melhores-calcas-jeans-masculino-guia-2026', titulo: 'Melhores calças jeans masculinas' },
  { slug: 'melhores-calcas-jeans-feminino-guia-2026', titulo: 'Melhores calças jeans femininas' },
  { slug: 'melhores-calcas-jeans-ate-150-reais', titulo: 'Melhores calças jeans até R$150' },
  { slug: 'melhores-apps-financas-pessoais-2026', titulo: 'Melhores apps de finanças pessoais' },
  { slug: 'maquiagem-para-iniciantes-guia-passo-a-passo', titulo: 'Maquiagem para iniciantes' },
  { slug: 'guia-marketing-afiliados-iniciantes-2026', titulo: 'Guia de marketing de afiliados' },
  { slug: 'como-escolher-perfume-guia-completo', titulo: 'Como escolher perfume' },
  { slug: 'como-economizar-supermercado-dicas', titulo: 'Como economizar no supermercado' },
  { slug: 'como-criar-conteudo-instagram-seguidores', titulo: 'Como criar conteúdo no Instagram' },
  { slug: 'como-montar-guarda-roupa-capsula-gastando-poco-2026', titulo: 'Como montar um guarda-roupa cápsula' },
  { slug: 'como-ganhar-dinheiro-como-afiliado-guia-2026', titulo: 'Como ganhar dinheiro como afiliado' },
  { slug: 'como-fazer-mudanca-gastando-pouco', titulo: 'Como fazer mudança gastando pouco' },
  { slug: 'como-organizar-festinha-aniversario-sozinha', titulo: 'Como organizar uma festinha sozinha' },
  { slug: 'como-organizar-apartamento-pequeno-com-pouco-dinheiro', titulo: 'Apartamento pequeno, pouco dinheiro' },
  { slug: 'diy-lembrancinhas-aniversario-faca-voce-mesmo', titulo: 'DIY lembrancinhas para aniversário' },
  { slug: 'gadgets-para-quarto-2026', titulo: 'Gadgets para quarto 2026' },
  { slug: 'organizar-quarto-tecnologia-guia', titulo: 'Organizar quarto com tecnologia' },
];

function breakText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 2);
}

async function generateCover(filename, title, subtitle, width, height, fontSize, maxCharsPerLine) {
  const starCount = 400;
  let stars = '';
  const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < starCount; i++) {
    const x = rng(0, width);
    const y = rng(0, height);
    const r = rng(1, 3);
    const opacity = (Math.random() * 0.6 + 0.2).toFixed(2);
    stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" fill-opacity="${opacity}"/>`;
  }

  const lines = breakText(title, maxCharsPerLine);
  const titleY1 = height / 2 - (lines.length === 2 ? fontSize * 0.8 : 0);
  const titleY2 = height / 2 + fontSize * 0.8;

  const titleSvg = lines.map((line, i) => {
    const y = i === 0 ? titleY1 : titleY2;
    return `<text x="${width / 2}" y="${y}" font-family="${fontPath}" font-size="${fontSize}" font-weight="bold" fill="white" text-anchor="middle">${line}</text>`;
  }).join('');

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#000000"/>
    ${stars}
    ${titleSvg}
    ${subtitle ? `<text x="${width / 2}" y="${height / 2 + fontSize * 2}" font-family="${fontPath}" font-size="${fontSize * 0.5}" fill="rgba(255,255,255,0.85)" text-anchor="middle">${subtitle}</text>` : ''}
  </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(OUT_DIR, filename));

  console.log('Gerada:', filename);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const post of posts) {
    await generateCover(
      `${post.slug}.png`,
      post.titulo,
      null,
      2160,
      3840,
      120,
      22
    );

    await generateCover(
      `${post.slug}-cover.png`,
      post.titulo,
      null,
      3840,
      2160,
      90,
      40
    );
  }

  console.log('Todas as capas 4K foram geradas!');
}

main().catch(console.error);
