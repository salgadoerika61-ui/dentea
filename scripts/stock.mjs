import fs from 'node:fs/promises';
import path from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const outDir = 'C:\\Users\\guillermo\\AppData\\Local\\Temp\\opencode\\candidates2';
await fs.mkdir(outDir, { recursive: true });

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

const results = [];
for (const q of queries) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(q)}&form=HDRSC2&first=1&count=35`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9', Referer: 'https://www.bing.com/' } });
    const html = await r.text();
    const decoded = html.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    const found = [];
    for (const m of decoded.matchAll(/"murl":"(.*?)"/g)) found.push(m[1]);
    const match = found.filter((u) => /images\.pexels\.com|images\.unsplash\.com/.test(u));
    for (const u of match) results.push({ q, murl: u });
    console.log(q, '->', found.length, 'matched', match.length);
  } catch (e) { console.log(q, 'ERR', e.message); }
  await new Promise((r) => setTimeout(r, 900));
}

const seen = new Set();
const unique = results.filter((r) => {
  const key = r.murl.split('?')[0];
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});
console.log('unique', unique.length);

let i = 0;
const saved = [];
for (const item of unique.slice(0, 80)) {
  i++;
  let url = item.murl;
  if (url.includes('images.unsplash.com')) url += (url.includes('?') ? '&' : '?') + 'w=1600&q=80';
  if (url.includes('images.pexels.com')) url += (url.includes('?') ? '&' : '?') + 'auto=compress&cs=tinysrgb&w=1600';
  const file = path.join(outDir, `c${String(i).padStart(2, '0')}.jpg`);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://www.bing.com/' } });
    if (!r.ok) { console.log(i, 'HTTP', r.status, url.slice(0, 70)); continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 15000) { console.log(i, 'small', buf.length); continue; }
    await fs.writeFile(file, buf);
    saved.push({ ...item, file, bytes: buf.length });
    console.log(i, Math.round(buf.length / 1024) + 'KB', url.slice(0, 85));
  } catch (e) { console.log(i, 'ERR', e.message); }
}
await fs.writeFile(path.join(outDir, 'meta.json'), JSON.stringify(saved, null, 2));
