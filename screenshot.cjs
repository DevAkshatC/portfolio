const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'ss-hero.png' });

  await page.evaluate(() => { const el = document.getElementById('about'); if(el) el.scrollIntoView(); });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ss-about.png' });

  await page.evaluate(() => { const el = document.getElementById('skills'); if(el) el.scrollIntoView(); });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ss-skills.png' });

  await page.evaluate(() => { const el = document.getElementById('projects'); if(el) el.scrollIntoView(); });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'ss-projects.png' });

  await page.evaluate(() => { const el = document.getElementById('education'); if(el) el.scrollIntoView(); });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ss-education.png' });

  await page.evaluate(() => { const el = document.getElementById('contact'); if(el) el.scrollIntoView(); });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ss-contact.png' });

  // Console errors
  const errors = [];
  page.on('console', msg => { if(msg.type() === 'error') errors.push(msg.text()); });
  await page.evaluate(() => window.scrollTo(0,0));
  await page.waitForTimeout(1000);

  await browser.close();
  if(errors.length) console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
  console.log('SCREENSHOTS_DONE');
})().catch(e => { console.error(e.message); process.exit(1); });
