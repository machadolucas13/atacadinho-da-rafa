const fs = require('fs');
const sharp = require('sharp');

const svg = fs.readFileSync('public/posts/maquiagem-para-iniciantes-guia-passo-a-passo.svg', 'utf8');
sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile('public/posts/maquiagem-para-iniciantes-guia-passo-a-passo.png')
  .then(() => console.log('✓ PNG Post 5 gerado'))
  .catch(err => console.error('Erro:', err.message));
