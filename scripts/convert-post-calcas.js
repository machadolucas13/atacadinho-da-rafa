const fs = require('fs');
const sharp = require('sharp');

const svg = fs.readFileSync('public/posts/calca-jeans-masculina-feminina-guia-2026.svg', 'utf8');
sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile('public/posts/calca-jeans-masculina-feminina-guia-2026.png')
  .then(() => console.log('✓ PNG do post calças gerado'))
  .catch(err => console.error('Erro:', err.message));
