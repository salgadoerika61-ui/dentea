import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'C:\\Users\\guillermo\\AppData\\Local\\Temp\\opencode\\candidates';
const meta = JSON.parse(await fs.readFile(path.join(dir, 'meta.json'), 'utf8'));

// contact sheet: 4 cols
const cols = 4, cellW = 420, cellH = 300, labelH = 26;
const rows = Math.ceil(meta.length / cols);
const composites = [];
for (let i = 0; i < meta.length; i++) {
  const m = meta[i];
  const x = (i % cols) * cellW, y = Math.floor(i / cols) * (cellH + labelH);
  try {
    const buf = await sharp(m.file).resize(cellW - 8, cellH - 8, { fit: 'cover' }).jpeg({ quality: 78 }).toBuffer();
    composites.push({ input: buf, left: x + 4, top: y + 4 });
    const svg = `<svg width="${cellW}" height="${labelH}"><rect width="100%" height="100%" fill="#111"/><text x="6" y="18" font-family="Arial" font-size="15" fill="#fff">#${i + 1} ${m.q} | ${m.w}x${m.h}</text></svg>`;
    composites.push({ input: Buffer.from(svg), left: x, top: y + cellH });
  } catch (e) { console.log('err', i, e.message); }
}
await sharp({ create: { width: cols * cellW, height: rows * (cellH + labelH), channels: 3, background: '#000' } })
  .composite(composites).jpeg({ quality: 80 }).toFile(path.join(dir, 'sheet.jpg'));
console.log('sheet done', meta.length);

// test unsplash cdn
const ids = ['1494790108377-be9c29b29330', '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e'];
for (const id of ids) {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?w=200&q=60`);
  console.log(id, r.status, r.headers.get('content-type'));
}
