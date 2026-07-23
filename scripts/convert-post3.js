const fs = require('fs');
const sharp = require('sharp');

const svg = fs.readFileSync('public/posts/como-montar-guarda-roupa-capsula-gastando-poco-2026.svg', 'utf8');
sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile('public/posts/como-montar-guarda-roupa-capsula-gastando-poco-2026.png')
  .then(() => console.log('✓ PNG Post 3 gerado'))
  .catch(err => console.error('Erro:', err.message));
