import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:4173/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

async function measure({ name, width, height, mobile, cpu, network }) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const client = await page.createCDPSession();
  await client.send('Network.enable');
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  if (cpu) await client.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  if (network) await client.send('Network.emulateNetworkConditions', network);

  await page.evaluateOnNewDocument(() => {
    window.__perf = { lcp: 0, lcpEl: '', cls: 0 };
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      window.__perf.lcp = last.startTime;
      window.__perf.lcpEl = last.element
        ? `${last.element.tagName.toLowerCase()}.${(last.element.className || '').toString().split(' ')[0]}`
        : last.url || '';
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });

  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 90000 });
  await new Promise((r) => setTimeout(r, 2500));
  const data = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paints = performance.getEntriesByType('paint');
    const fcp = paints.find((p) => p.name === 'first-contentful-paint')?.startTime ?? 0;
    const resources = performance.getEntriesByType('resource');
    const sum = (filter) =>
      Math.round(resources.filter(filter).reduce((a, r) => a + (r.transferSize || 0), 0) / 1024);
    return {
      fcp: Math.round(fcp),
      lcp: Math.round(window.__perf.lcp),
      lcpEl: window.__perf.lcpEl,
      cls: Math.round(window.__perf.cls * 1000) / 1000,
      dcl: Math.round(nav.domContentLoadedEventEnd),
      load: Math.round(nav.loadEventEnd),
      requests: resources.length,
      totalKB: sum(() => true),
      jsKB: sum((r) => r.name.endsWith('.js')),
      fontKB: sum((r) => r.name.endsWith('.woff2')),
      imgKB: sum((r) => /\.(webp|png|jpe?g|svg)$/.test(r.name)),
      heroLoaded: document.querySelector('.hero-frame img')?.complete ?? false,
      slowest: resources
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5)
        .map((r) => `${r.name.split('/').pop()} ${Math.round(r.duration)}ms`),
    };
  });
  await context.close();
  return { name, width, ...data };
}

const slow4g = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
  connectionType: 'cellular4g',
};
const fast3g = {
  offline: false,
  latency: 40,
  downloadThroughput: (10 * 1024 * 1024) / 8,
  uploadThroughput: (5 * 1024 * 1024) / 8,
  connectionType: 'wifi',
};

const rows = [];
rows.push(await measure({ name: 'desktop-cold', width: 1440, height: 900 }));
rows.push(await measure({ name: 'mobile-cold', width: 390, height: 844, mobile: true }));
rows.push(await measure({ name: 'mobile-fast3g-cpu2x', width: 390, height: 844, mobile: true, cpu: 2, network: fast3g }));
rows.push(await measure({ name: 'mobile-slow4g-cpu4x', width: 390, height: 844, mobile: true, cpu: 4, network: slow4g }));

await browser.close();
console.log(JSON.stringify(rows, null, 2));
