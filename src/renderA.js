const path = require('path'), fs = require('fs');
const pw = require(path.join(require('child_process').execSync('npm root -g').toString().trim(), 'playwright'));
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Noto+Serif+TC:wght@900&display=swap" rel="stylesheet">';
const { TOOLS } = JSON.parse(fs.readFileSync('tools3.json', 'utf8'));
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 512, height: 512 } });
  fs.mkdirSync('png3_A', { recursive: true });
  for (const t of TOOLS) {
    const svg = fs.readFileSync(path.join('svg3_A', t.id + '.svg'), 'utf8');
    await p.setContent(`<html><head><meta charset="utf-8">${FONTS}</head><body style="margin:0">${svg}</body></html>`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(100);
    await p.screenshot({ path: path.join('png3_A', t.id + '.png'), clip: { x: 0, y: 0, width: 512, height: 512 } });
  }
  await b.close(); console.log('A rendered', TOOLS.length);
})();
