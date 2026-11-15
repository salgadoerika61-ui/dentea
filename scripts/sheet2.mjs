import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'C:\\Users\\guillermo\\AppData\\Local\\Temp\\opencode\\candidates2';
const meta = JSON.parse(await fs.readFile(path.join(dir, 'meta.json'), 'utf8'));
console.log('count', meta.length);
const cols = 5, cellW = 360, cellH = 260, labelH = 24;
const chunk = 40;
for (let start = 0; start < meta.length; start += chunk) {
  const items = meta.slice(start, start + chunk);
  const rows = Math.ceil(items.length / cols);
  const composites = [];
  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const x = (i % cols) * cellW, y = Math.floor(i / cols) * (cellH + labelH);
    try {
      const buf = await sharp(m.file).resize(cellW - 6, cellH - 6, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer();
      composites.push({ input: buf, left: x + 3, top: y + 3 });
    } catch (e) { console.log('err', start + i + 1, e.message); }
    const label = `#${start + i + 1} ${m.murl.includes('pexels') ? 'PEX' : 'UNS'}`;
    const svg = `<svg width="${cellW}" height="${labelH}"><rect width="100%" height="100%" fill="#0b0b0b"/><text x="6" y="17" font-family="Arial" font-size="15" fill="#fff">${label}</text></svg>`;
    composites.push({ input: Buffer.from(svg), left: x, top: y + cellH });
  }
  const sheet = path.join(dir, `sheet-${start + 1}-${start + items.length}.jpg`);
  await sharp({ create: { width: cols * cellW, height: rows * (cellH + labelH), channels: 3, background: '#000' } })
    .composite(composites).jpeg({ quality: 82 }).toFile(sheet);
  console.log('sheet', sheet);
}
