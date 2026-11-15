import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://127.0.0.1:4173/';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

async function report(page, label) {
  const d = await page.evaluate(() => {
    const target = document.querySelector('#preguntas');
    const r = target.getBoundingClientRect();
    return {
      scrollY: Math.round(scrollY),
      faqTop: Math.round(r.top),
      faqH: Math.round(r.height),
      hash: location.hash,
      docH: document.documentElement.scrollHeight,
    };
  });
  return { label, ...d };
}

const out = [];

// 1) deep link
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(BASE + '#preguntas', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2500));
  out.push(await report(page, 'deeplink-load'));
  await page.close();
}

// 2) click nav
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(BASE, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));
  await page.click('.main-nav a[href="#preguntas"]');
  await new Promise((r) => setTimeout(r, 2500));
  out.push(await report(page, 'nav-click'));
  await page.close();
}

// 3) mobile menu click
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(BASE, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));
  await page.click('.menu-btn');
  await new Promise((r) => setTimeout(r, 800));
  await page.click('.mobile-nav a[href="#preguntas"]');
  await new Promise((r) => setTimeout(r, 2500));
  out.push(await report(page, 'mobile-nav-click'));
  await page.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
