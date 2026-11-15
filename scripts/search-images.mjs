const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

async function tryFetch(url, headers = {}) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9', ...headers } });
    const t = await r.text();
    return { status: r.status, text: t };
  } catch (e) { return { status: 0, text: '', err: e.message }; }
}

// 1. Bing image search
const q = 'modern dental clinic interior';
const bing = await tryFetch(`https://www.bing.com/images/search?q=${encodeURIComponent(q)}&form=HDRSC2&first=1`, { Referer: 'https://www.bing.com/' });
console.log('BING', bing.status, bing.text.length);
const murls = [...bing.text.matchAll(/murl&quot;:&quot;(.*?)&quot;/g)].map((m) => m[1]);
console.log('murls', murls.length);
console.log(murls.slice(0, 12).join('\n'));

// 2. DuckDuckGo
const ddg = await tryFetch('https://duckduckgo.com/?q=' + encodeURIComponent(q) + '&iax=images&ia=images');
const vqd = ddg.text.match(/vqd="?([^"&]+)"?/)?.[1];
console.log('DDG', ddg.status, 'vqd', vqd);
if (vqd) {
  const r = await tryFetch(`https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(q)}&vqd=${vqd}&f=,,,,,&p=1`, {
    Referer: 'https://duckduckgo.com/',
    Accept: 'application/json',
  });
  console.log('DDG i.js', r.status, r.text.slice(0, 200));
  try {
    const j = JSON.parse(r.text);
    console.log(j.results.slice(0, 8).map((x) => `${x.width}x${x.height} ${x.image}`).join('\n'));
  } catch {}
}

// 3. unsplash napi
const napi = await tryFetch('https://unsplash.com/napi/search/photos?query=dental%20clinic&per_page=10', { Accept: 'application/json' });
console.log('NAPI', napi.status, napi.text.slice(0, 200));
