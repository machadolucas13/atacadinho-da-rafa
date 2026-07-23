const fs = require('fs');
const sharp = require('sharp');

const posts = [
  'decoracao-sustentavel-20-ideias-ate-100-reais',
  'rotina-skincare-pele-oleosa-produtos-funcionam',
  'como-escolher-perfume-guia-completo',
  'como-economizar-supermercado-dicas',
  'melhores-apps-financas-pessoais-2026',
  'como-criar-conteudo-instagram-seguidores',
  'guia-marketing-afiliados-iniciantes-2026',
  'como-fazer-mudanca-gastando-pouco',
];

async function convertAll() {
  for (const slug of posts) {
    const svgPath = `public/posts/${slug}.svg`;
    const pngPath = `public/posts/${slug}.png`;
    
    try {
      const svg = fs.readFileSync(svgPath, 'utf8');
      await sharp(Buffer.from(svg))
        .resize(1200, 630)
        .png()
        .toFile(pngPath);
      console.log(`✓ ${slug}.png`);
    } catch (err) {
      console.error(`✗ ${slug}:`, err.message);
    }
  }
}

convertAll();
