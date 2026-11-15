import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:4173/';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const context = await browser.createBrowserContext();
const page = await context.newPage();
const client = await page.createCDPSession();
await client.send('Network.enable');
await client.send('Network.setCacheDisabled', { cacheDisabled: true });
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await client.send('Network.emulateNetworkConditions', {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  connectionType: 'cellular4g',
});
await page.evaluateOnNewDocument(() => {
  window.__log = [];
  window.__lt = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries())
      window.__log.push({ t: Math.round(e.startTime), type: 'lcp', src: (e.url || '').split('/').pop(), size: e.size });
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__lt.push({ start: Math.round(e.startTime), dur: Math.round(e.duration) });
  }).observe({ type: 'longtask', buffered: true });
  document.addEventListener('DOMContentLoaded', () => window.__log.push({ t: Math.round(performance.now()), type: 'dcl' }));
  window.addEventListener('load', () => window.__log.push({ t: Math.round(performance.now()), type: 'load' }));
  requestAnimationFrame(() => window.__log.push({ t: Math.round(performance.now()), type: 'raf1' }));
});
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 90000 });
await new Promise((r) => setTimeout(r, 4000));
const out = await page.evaluate(() => ({
  log: window.__log,
  longTasks: window.__lt,
  heap: performance.memory
    ? { used: Math.round(performance.memory.usedJSHeapSize / 1048576), total: Math.round(performance.memory.totalJSHeapSize / 1048576) }
    : null,
  supportsContentVisibility: CSS.supports('content-visibility', 'auto'),
}));
console.log(JSON.stringify(out, null, 2));
await browser.close();
