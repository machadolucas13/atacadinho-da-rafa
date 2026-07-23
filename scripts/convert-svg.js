const fs = require('fs');
const path = require('path');

const svgPath = 'public/posts/post-2-afiliado-iniciante.svg';
let svg = fs.readFileSync(svgPath, 'utf8');

svg = svg.replace('font-family: Georgia', 'font-family: Georgia, serif');
fs.writeFileSync(svgPath, svg);
console.log('✓ SVG preparado');

try {
  const sharp = require('sharp');
  sharp(Buffer.from(svg))
    .resize(1200, 630)
    .png()
    .toFile('public/posts/post-2-afiliado-iniciante.png')
    .then(() => console.log('✓ PNG 1200x630 gerado'))
    .catch(err => console.error('Erro:', err.message));
} catch (e) {
  console.log('⚠ Sharp não disponível, vou usar outro método');
}
