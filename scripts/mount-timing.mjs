import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:4173/';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const client = await page.createCDPSession();
await client.send('Network.enable');
await client.send('Network.setCacheDisabled', { cacheDisabled: true });
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await client.send('Network.emulateNetworkConditions', {
  offline: false, latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  connectionType: 'cellular4g',
});
await page.evaluateOnNewDocument(() => {
  window.__t = [];
  const t = (label) => window.__t.push({ t: Math.round(performance.now()), label });
  new MutationObserver(() => {
    if (document.getElementById('filosofia') && !window.__filosofia) {
      window.__filosofia = true;
      t('manifesto-mounted');
    }
    if (document.getElementById('cita') && !window.__cita) {
      window.__cita = true;
      t('contact-mounted');
    }
    if (document.querySelector('.site-footer') && !window.__footer) {
      window.__footer = true;
      t('footer-mounted');
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', () => t('dcl'));
  window.addEventListener('load', () => t('load'));
});
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 90000 });
await new Promise((r) => setTimeout(r, 6000));
const out = await page.evaluate(() => ({
  timeline: window.__t,
  chunks: performance
    .getEntriesByType('resource')
    .filter((r) => r.name.endsWith('.js'))
    .map((r) => ({ f: r.name.split('/').pop(), end: Math.round(r.responseEnd), dur: Math.round(r.duration) })),
  heights: {
    doc: document.documentElement.scrollHeight,
    manifesto: Math.round(document.querySelector('#filosofia').getBoundingClientRect().height),
  },
}));
console.log(JSON.stringify(out, null, 2));
await browser.close();
