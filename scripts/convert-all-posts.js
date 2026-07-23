const fs = require('fs');
const sharp = require('sharp');

async function convert(svgPath, pngPath) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .png()
    .toFile(pngPath);
  console.log('✓', pngPath);
}

(async () => {
  await convert('public/posts/post-2-afiliado-iniciante.svg', 'public/posts/post-2-afiliado-iniciante.png');
  await convert('public/posts/post-1-calcas-jeans-baratas.svg', 'public/posts/post-1-calcas-jeans-baratas.png');
})();
