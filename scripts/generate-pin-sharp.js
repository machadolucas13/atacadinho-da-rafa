const sharp = require('sharp');
const path = require('path');

(async () => {
  const W = 1080;
  const H = 1920;
  const outPath = path.join(__dirname, '..', 'public', 'posts', 'calcas-jeans-femininas-economicas-2026.png');

  const headerBg = '#0f1b30';
  const accent = '#FFD700';
  const text = '#ffffff';
  const muted = 'rgba(255,255,255,0.75)';
  const glassBorder = 'rgba(255,255,255,0.18)';
  const highlight = '#FFADC7';
  const footerBg = '#0b1321';

  const title1 = 'CALÇAS JEANS';
  const title2 = 'FEMININAS';
  const title3 = 'A PARTIR DE';
  const title4 = 'R$ 24,90';
  const subtitle = 'Wide Leg • Flare • Cargo • Skinny • Levanta Bumbum';

  const products = [
    { name: 'Calça Jeans Bazar Brechó Usada', price: 'R$ 24,90' },
    { name: 'Wide Leg Levanta Bumbum', price: 'R$ 29,90' },
    { name: 'Cintura Alta com Lycra', price: 'R$ 36,90' },
    { name: 'Preta Grafite Empina Bumbum', price: 'R$ 36,90' },
    { name: 'Jogger com Elástico', price: 'R$ 39,99' },
    { name: 'Flare Grafite Tendência', price: 'R$ 41,99' },
    { name: 'Preta com Lycra Empina Bumbum', price: 'R$ 44,99' },
    { name: 'Flare Modeladora Levanta Bumbum', price: 'R$ 47,90' },
    { name: 'Cargo Grafite Super Tendência', price: 'R$ 48,59' },
  ];

  const fontFamily = 'Arial, sans-serif';

  const headerSvg = `
  <svg width="${W}" height="520" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0f1b30"/>
        <stop offset="1" stop-color="#1e3a5f"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FFD700"/>
        <stop offset="1" stop-color="#FFC107"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="520" fill="url(#bg)"/>
    <rect x="40" y="40" width="${W-80}" height="440" rx="28" fill="rgba(255,255,255,0.06)" stroke="${glassBorder}" stroke-width="1.2"/>

    <rect x="124" y="88" width="832" height="68" rx="999" fill="rgba(255,255,255,0.12)" stroke="${glassBorder}" stroke-width="1"/>
    <text x="${W/2}" y="141" font-family="${fontFamily}" font-size="26" font-weight="600" fill="${muted}" text-anchor="middle" letter-spacing="4">🛒 BRECHÓ • USADA • NOVA</text>

    <text x="${W/2}" y="246" font-family="${fontFamily}" font-size="78" font-weight="900" fill="${text}" text-anchor="middle" letter-spacing="-2">${title1}</text>
    <text x="${W/2}" y="324" font-family="${fontFamily}" font-size="78" font-weight="900" fill="${text}" text-anchor="middle" letter-spacing="-2">${title2}</text>
    <text x="${W/2}" y="426" font-family="${fontFamily}" font-size="44" font-weight="700" fill="url(#gold)" text-anchor="middle" letter-spacing="-1">${title3}</text>
    <text x="${W/2}" y="498" font-family="${fontFamily}" font-size="74" font-weight="900" fill="${accent}" text-anchor="middle" letter-spacing="-2">${title4}</text>
  </svg>`;

  const cols = 3;
  const cardW = Math.floor((W - 80 - 20 * (cols - 1)) / cols);
  const cardH = 320;
  const startX = 40;
  const startY = 560;
  const gap = 20;

  function cardSvg(name, priceCol) {
    const displayName = name.length > 24 ? name.slice(0, 23) + '…' : name;
    return `
    <svg width="${cardW}" height="${cardH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1e3a5f"/>
          <stop offset="1" stop-color="#12243f"/>
        </linearGradient>
      </defs>
      <rect width="${cardW}" height="${cardH}" rx="24" fill="url(#card)" stroke="${glassBorder}" stroke-width="1.2"/>
      <rect x="1" y="1" width="${cardW-2}" height="${cardH-2}" rx="24" fill="rgba(255,255,255,0.04)"/>

      <rect x="18" y="18" width="${cardW-36}" height="8" rx="999" fill="rgba(255,255,255,0.08)"/>
      <rect x="18" y="36" width="${cardW-36}" height="6" rx="999" fill="rgba(255,255,255,0.05)"/>

      <text x="28" y="90" font-family="${fontFamily}" font-size="20" font-weight="700" fill="${text}">${displayName}</text>
      <text x="28" y="118" font-family="${fontFamily}" font-size="15" font-weight="400" fill="${muted}">Alta qualidade • Envio rápido</text>

      <rect x="18" y="${cardH-90}" width="${cardW-36}" height="56" rx="16" fill="${highlight}" fill-opacity="0.18" stroke="${highlight}" stroke-opacity="0.35" stroke-width="1"/>
      <text x="${cardW/2}" y="${cardH-52}" font-family="${fontFamily}" font-size="34" font-weight="900" fill="${accent}" text-anchor="middle" letter-spacing="-1">${priceCol}</text>
    </svg>`;
  }

  const cards = products.map((p, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gap);
    const y = startY + row * (cardH + gap);
    const svg = cardSvg(p.name, p.price);
    return { input: Buffer.from(svg), left: x, top: y };
  });

  const footerY = startY + Math.ceil(products.length / cols) * (cardH + gap) + 30;
  const footerSvg = `
  <svg width="${W}" height="${Math.max(480, H - footerY)}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${Math.max(480, H - footerY)}" fill="${footerBg}"/>
    <rect x="40" y="20" width="${W-80}" height="${Math.max(420, H - footerY - 120)}" rx="28" fill="rgba(255,255,255,0.06)" stroke="${glassBorder}" stroke-width="1.2"/>

    <text x="${W/2}" y="110" font-family="${fontFamily}" font-size="44" font-weight="900" fill="${text}" text-anchor="middle">CLICA E CONFERE TODOS OS MODELOS 👇</text>
    <text x="${W/2}" y="170" font-family="${fontFamily}" font-size="24" font-weight="500" fill="${muted}" text-anchor="middle">${products.length} opções de ${title4} • Shopee • Envio rápido</text>

    <text x="${W/2}" y="${Math.max(380, H - footerY - 60)}" font-family="${fontFamily}" font-size="22" font-weight="700" fill="${highlight}" text-anchor="middle" letter-spacing="3">@ATACADINHODARAFA</text>
  </svg>`;

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: footerBg,
    },
  })
    .composite([
      { input: Buffer.from(headerSvg), top: 0, left: 0 },
      ...cards,
      { input: Buffer.from(footerSvg), top: footerY, left: 0 },
    ])
    .png()
    .toFile(outPath);

  console.log('Pin gerado:', outPath);
})();
