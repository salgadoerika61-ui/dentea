import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:5173/';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

const rows = [];
for (const vp of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-sm', width: 360, height: 740 },
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.width < 500, hasTouch: vp.width < 500 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));
  const d = await page.evaluate(() => {
    const vw = innerWidth;
    const offenders = [];
    document.querySelectorAll('body *').forEach((el) => {
      if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
      if (el.closest('.ticker') || el.closest('.hero-glow')) return;
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      if (r.right > vw + 1.5 || r.left < -1.5) {
        if (getComputedStyle(el).position === 'fixed') return;
        offenders.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} [${Math.round(r.left)}..${Math.round(r.right)}]`);
      }
    });
    const box = (s) => {
      const el = document.querySelector(s);
      if (!el) return '-';
      const r = el.getBoundingClientRect();
      return `${Math.round(r.height)}`;
    };
    return {
      vw,
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      offenders: offenders.slice(0, 8),
      heroTitle: getComputedStyle(document.querySelector('.hero-title')).fontSize,
      height: document.documentElement.scrollHeight,
      heroH: box('.hero'),
      servicesH: box('#tratamientos'),
      galleryCols: getComputedStyle(document.querySelector('.gallery')).gridTemplateColumns.split(' ').length,
      processCols: getComputedStyle(document.querySelector('.process-list')).gridTemplateColumns.split(' ').length,
      navDisplay: getComputedStyle(document.querySelector('.main-nav')).display,
      heroFrame: box('.hero-frame'),
      contactCardW: box('.contact-card'),
    };
  });
  rows.push({ name: vp.name, ...d });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(rows, null, 2));
