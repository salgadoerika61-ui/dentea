import fs from 'node:fs/promises';
import path from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const dir = 'C:\\Users\\guillermo\\AppData\\Local\\Temp\\opencode\\candidates2';
const meta = JSON.parse(await fs.readFile(path.join(dir, 'meta.json'), 'utf8'));

const queries = [
  'dental clinic interior pexels', 'dental clinic interior unsplash', 'dentist office pexels', 'dentist unsplash photo',
  'woman smile teeth pexels', 'smile white teeth unsplash', 'modern clinic interior pexels', 'dental chair pexels',
  'teeth whitening pexels', 'dentist patient treatment pexels', 'dental reception pexels', 'beautiful smile portrait unsplash',
];
const info = new Map();
for (const q of queries) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(q)}&form=HDRSC2&first=1&count=35`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9', Referer: 'https://www.bing.com/' } });
    const html = (await r.text()).replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    for (const m of html.matchAll(/m="(\{"sid".*?\})"/g)) {
      try {
        const o = JSON.parse(m[1]);
        if (o.murl && !info.has(o.murl.split('?')[0])) info.set(o.murl.split('?')[0], { t: o.t, purl: o.purl });
      } catch {}
    }
  } catch (e) { console.log(q, 'ERR', e.message); }
  await new Promise((res) => setTimeout(res, 600));
}
console.log('titles', info.size);
for (const [i, m] of meta.entries()) {
  const hit = info.get(m.murl.split('?')[0]) || {};
  m.title = hit.t || '';
  m.purl = hit.purl || '';
  console.log(`#${i + 1} ${Math.round((m.bytes || 0) / 1024)}KB ${m.murl.includes('pexels') ? 'PEX' : 'UNS'} | q=${m.q} | ${m.title.slice(0, 95)}`);
}
await fs.writeFile(path.join(dir, 'meta3.json'), JSON.stringify(meta, null, 2));
