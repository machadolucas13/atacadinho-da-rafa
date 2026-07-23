const fs = require('fs');
const sharp = require('sharp');

const svg = fs.readFileSync('public/posts/melhores-calcas-jeans-ate-150-reais.svg', 'utf8');
sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile('public/posts/melhores-calcas-jeans-ate-150-reais.png')
  .then(() => console.log('✓ PNG do Post 1 atualizado'))
  .catch(err => console.error('Erro:', err.message));
