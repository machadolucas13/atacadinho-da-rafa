const fs = require('fs');
const sharp = require('sharp');

const svg = fs.readFileSync('public/posts/post-1-calcas-jeans-baratas.svg', 'utf8');
sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile('public/posts/post-1-calcas-jeans-baratas.png')
  .then(() => console.log('✓ PNG do Post 1 gerado'))
  .catch(err => console.error('Erro:', err.message));
