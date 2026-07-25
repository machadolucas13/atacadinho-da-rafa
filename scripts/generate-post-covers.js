const sharp = require('sharp');
const path = require('path');
const { Buffer } = require('buffer');

const OUT = path.join(__dirname, '..', 'public', 'posts');

async function generateCover(filename, title, subtitle) {
  const W = 1080;
  const H = 1920;

  const starCount = 300;
  let stars = '';
  const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < starCount; i++) {
    const x = rng(0, W);
    const y = rng(0, H);
    const r = rng(1, 4); 
    const opacity = (Math.random() * 0.7 + 0.1).toFixed(2);
    stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" fill-opacity="${opacity}"/>`;
  }

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#000000"/>
    ${stars}
    <text x="${W/2}" y="${H/2 - 30}" font-family="sans-serif" font-size="56" font-weight="bold" fill="#ffffff" text-anchor="middle">${title}</text>
    <text x="${W/2}" y="${H/2 + 50}" font-family="sans-serif" font-size="28" fill="rgba(255,255,255,0.85)" text-anchor="middle">${subtitle}</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(OUT, filename));

  console.log('Cover 9:16 gerada:', filename);
}

(async () => {
  await generateCover(
    'como-organizar-festinha-aniversario-sozinha.png',
    'COMO ORGANIZAR UMA FESTINHA SOZINHA',
    'Dicas para mães: festa infantil sem stress e sem gastar muito'
  );

  await generateCover(
    'diy-lembrancinhas-aniversario-faca-voce-mesmo.png',
    'DIY LEMBRANCINHAS PARA ANIVERSÁRIO',
    'Faça você mesmo: ideias criativas, baratas e fáceis de fazer'
  );
})();
