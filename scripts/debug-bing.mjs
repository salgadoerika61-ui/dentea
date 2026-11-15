const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const r = await fetch('https://www.bing.com/images/search?q=dental+clinic+interior+pexels&first=1&count=35', { headers: { 'User-Agent': UA } });
const h = (await r.text()).replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const i = h.indexOf('images.pexels.com');
console.log(h.slice(Math.max(0, i - 800), i + 400));
