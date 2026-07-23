const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });

  const htmlPath = path.join(__dirname, 'public', 'pins', 'calcas-jeans-femininas-baratas.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  const outputPath = path.join(__dirname, 'public', 'posts', 'calcas-jeans-femininas-economicas-2026.png');
  await page.screenshot({ path: outputPath, type: 'png', fullPage: true });

  await browser.close();
  console.log('Pin gerado com sucesso:', outputPath);
})();
