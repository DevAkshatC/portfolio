const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'ss-hero-full.png', fullPage: false });
  await browser.close();
  console.log('DONE');
})().catch(e => { console.error(e.message); process.exit(1); });
