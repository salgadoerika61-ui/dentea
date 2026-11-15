import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:5173/';
const outDir = 'C:\\Users\\guillermo\\AppData\\Local\\Temp\\opencode\\dentea-shots';
await fs.mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});

const results = [];
const errors = [];

for (const vp of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-sm', width: 360, height: 740 },
]) {
  const page = await browser.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push({ vp: vp.name, type: 'console', text: m.text() });
  });
  page.on('pageerror', (e) => errors.push({ vp: vp.name, type: 'pageerror', text: String(e) }));
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1, isMobile: vp.width < 500, hasTouch: vp.width < 500 });
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1800));

  const data = await page.evaluate(() => {
    const vw = window.innerWidth;
    const scaleY = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top + scrollY) };
    };
    const overflow = [];
    document.querySelectorAll('body *').forEach((el) => {
      if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.right > vw + 1.5 || r.left < -1.5) {
        const style = getComputedStyle(el);
        if (style.position === 'fixed') return;
        overflow.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && typeof el.className === 'string' ? el.className : '').slice(0, 50),
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width),
        });
      }
    });
    const imgs = [...document.images].map((i) => ({
      src: i.currentSrc.split('/').pop(),
      ok: i.complete && i.naturalWidth > 0,
      w: i.naturalWidth,
      loading: i.loading,
    }));
    return {
      viewport: { w: vw, h: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      overflow: overflow.slice(0, 14),
      images: imgs,
      sections: {
        hero: scaleY('.hero'),
        manifesto: scaleY('#filosofia'),
        services: scaleY('#tratamientos'),
        clinic: scaleY('#clinica'),
        process: scaleY('#proceso'),
        faq: scaleY('#preguntas'),
        contact: scaleY('#cita'),
        footer: scaleY('.site-footer'),
      },
      fontLoaded: document.fonts.check('16px "Manrope Variable"') && document.fonts.check('16px "Fraunces Variable"'),
      title: document.title,
      waLinks: [...document.querySelectorAll('a[href*="wa.me"]')].length,
      heroTitleSize: getComputedStyle(document.querySelector('.hero-title')).fontSize,
      bodyFont: getComputedStyle(document.body).fontFamily,
      pageHeight: document.documentElement.scrollHeight,
    };
  });

  await page.screenshot({ path: path.join(outDir, `${vp.name}.png`) });
  // full page screenshot for desktop only (large)
  if (vp.name === 'desktop') {
    await page.screenshot({ path: path.join(outDir, `${vp.name}-full.png`), fullPage: true });
  }

  results.push({ name: vp.name, ...data });
  await page.close();
}

// interaction test on mobile
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 1200));
const interactions = {};
interactions.menuBtnVisible = await page.$eval('.menu-btn', (el) => getComputedStyle(el).display !== 'none');
await page.click('.menu-btn');
await new Promise((r) => setTimeout(r, 900));
interactions.menuOpen = await page.$eval('#mobile-menu', (el) => Boolean(el)).catch(() => false);
interactions.menuScrollLocked = await page.evaluate(() => getComputedStyle(document.body).overflow === 'hidden');
await page.screenshot({ path: path.join(outDir, 'mobile-menu.png') });
await page.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 800));
interactions.menuClosedOnEscape = await page.evaluate(() => !document.getElementById('mobile-menu'));

// faq interaction
const faqButtons = await page.$$('.faq-item button');
interactions.faqCount = faqButtons.length;
await faqButtons[1].click();
await new Promise((r) => setTimeout(r, 700));
interactions.faqOpenPanelHeight = await page.evaluate(() => {
  const panels = [...document.querySelectorAll('.faq-panel')];
  return panels.map((p) => Math.round(p.getBoundingClientRect().height));
});

// scroll to bottom to trigger lazy images + fab
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const t = setInterval(() => {
      y += 700;
      window.scrollTo(0, y);
      if (y > document.body.scrollHeight) {
        clearInterval(t);
        resolve();
      }
    }, 60);
  });
});
await new Promise((r) => setTimeout(r, 1500));
interactions.fabVisible = await page.evaluate(() => Boolean(document.querySelector('.wa-fab')));
interactions.lazyImages = await page.evaluate(() =>
  [...document.images].map((i) => ({ file: i.currentSrc.split('/').pop(), ok: i.complete && i.naturalWidth > 0 })),
);
await page.close();

await browser.close();
console.log(JSON.stringify({ results, interactions, errors }, null, 2));
