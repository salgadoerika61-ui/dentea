import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const src = 'C:\\Users\\guillermo\\AppData\\Local\\Temp\\opencode\\candidates2';
const outDir = path.resolve('public/images');
await fs.mkdir(outDir, { recursive: true });

// role -> candidate index (1-based) + target aspect ratio (w/h)
const plan = [
  { name: 'hero-main', idx: 21, ratio: 16 / 10, widths: [900, 1400, 2000], pos: 'centre' },
  { name: 'hero-inset', idx: 26, ratio: 4 / 5, widths: [480, 800], pos: 'centre' },
  { name: 'care', idx: 66, ratio: 3 / 4, widths: [600, 1000], pos: 'attention' },
  { name: 'clinic-1', idx: 23, ratio: 3 / 4, widths: [500, 900], pos: 'centre' },
  { name: 'clinic-2', idx: 22, ratio: 4 / 3, widths: [700, 1200], pos: 'centre' },
  { name: 'clinic-3', idx: 29, ratio: 1, widths: [600, 1000], pos: 'centre' },
  { name: 'smile', idx: 80, ratio: 4 / 5, widths: [600, 1000], pos: 'attention' },
  { name: 'detail', idx: 25, ratio: 3 / 2, widths: [700, 1200], pos: 'centre' },
];

const meta = JSON.parse(await fs.readFile(path.join(src, 'meta3.json'), 'utf8'));
const manifest = [];

for (const p of plan) {
  const m = meta[p.idx - 1];
  if (!m) { console.log('missing', p.idx); continue; }
  const file = m.file;
  const metaImg = await sharp(file).metadata();
  const targetW = p.widths[p.widths.length - 1];
  const targetH = Math.round(targetW / p.ratio);
  const base = sharp(file)
    .rotate()
    .resize(targetW, targetH, { fit: 'cover', position: p.pos === 'attention' ? sharp.strategy.attention : 'centre' });

  const variants = [];
  for (const w of p.widths) {
    const h = Math.round(w / p.ratio);
    const out = path.join(outDir, `${p.name}-${w}.webp`);
    await sharp(file)
      .rotate()
      .resize(w, h, { fit: 'cover', position: p.pos === 'attention' ? sharp.strategy.attention : 'centre' })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);
    const stat = await fs.stat(out);
    variants.push({ w, h, file: `/images/${p.name}-${w}.webp`, bytes: stat.size });
  }
  // blur placeholder
  const lqip = await sharp(file).rotate().resize(24).blur(2).webp({ quality: 40 }).toBuffer();
  manifest.push({
    name: p.name,
    ratio: p.ratio,
    sourceIndex: p.idx,
    sourceUrl: m.murl.split('?')[0],
    sourceQuery: m.q,
    original: `${metaImg.width}x${metaImg.height}`,
    variants,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  });
  console.log(p.name, variants.map((v) => `${v.w}x${v.h} ${Math.round(v.bytes / 1024)}KB`).join(' | '), '| from', m.murl.slice(0, 60));
}
await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('done', manifest.length);
