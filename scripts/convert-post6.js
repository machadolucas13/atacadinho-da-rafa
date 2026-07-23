const fs = require('fs');
const sharp = require('sharp');

const svg = fs.readFileSync('public/posts/como-organizar-apartamento-pequeno-com-pouco-dinheiro.svg', 'utf8');
sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile('public/posts/como-organizar-apartamento-pequeno-com-pouco-dinheiro.png')
  .then(() => console.log('✓ PNG Post 6 gerado'))
  .catch(err => console.error('Erro:', err.message));
