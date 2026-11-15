import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const dir = 'C:\\Users\\guillermo\\AppData\\Local\\Temp\\opencode\\candidates2';
const meta = JSON.parse(await fs.readFile(path.join(dir, 'meta.json'), 'utf8'));

const queries = [
  'dental clinic interior pexels',
  'dental clinic interior unsplash',
  'dentist office pexels',
  'dentist unsplash photo',
  'woman smile teeth pexels',
  'smile white teeth unsplash',
  'modern clinic interior pexels',
  'dental chair pexels',
  'teeth whitening pexels',
  'dentist patient treatment pexels',
  'dental reception pexels',
  'beautiful smile portrait unsplash',
];

const info = new Map();
for (const q of queries) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(q)}&form=HDRSC2&first=1&count=35`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9', Referer: 'https://www.bing.com/' } });
    const html = (await r.text()).replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    const blocks = [...html.matchAll(/\{"murl":"(.*?)".*?\}/g)];
    for (const b of blocks) {
      const raw = b[0];
      const murl = b[1];
      const title = raw.match(/"t":"(.*?)"/)?.[1] ?? '';
      const purl = raw.match(/"purl":"(.*?)"/)?.[1] ?? '';
      if (murl && !info.has(murl.split('?')[0])) info.set(murl.split('?')[0], { title, purl });
    }
  } catch (e) { console.log(q, 'ERR', e.message); }
  await new Promise((res) => setTimeout(res, 700));
}
console.log('titles', info.size);

for (const m of meta) {
  const hit = info.get(m.murl.split('?')[0]);
  m.title = hit?.title || '';
  m.purl = hit?.purl || '';
  try {
    const s = await sharp(m.file).stats();
    const [r, g, b] = s.channels.map((c) => Math.round(c.mean));
    m.mean = `rgb(${r},${g},${b})`;
    m.brightness = Math.round((r + g + b) / 3);
    const md = await sharp(m.file).metadata();
    m.w = md.width; m.h = md.height;
  } catch {}
}
await fs.writeFile(path.join(dir, 'meta2.json'), JSON.stringify(meta, null, 2));
for (const [i, m] of meta.entries()) {
  console.log(`#${i + 1} ${m.murl.includes('pexels') ? 'PEX' : 'UNS'} ${m.w}x${m.h} b=${m.brightness} | ${m.title?.slice(0, 80)}`);
}
