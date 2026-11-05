// Interaction checks: language switching, filters, mobile menu, contact links.
// Usage: BASE=http://localhost:3100 node tools/interact.mjs
import { chromium } from 'playwright';

const base = process.env.BASE || 'http://localhost:3100';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const ok = (c, m) => console.log(c ? 'PASS' : 'FAIL', m);

const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

await p.goto(`${base}/en/work/nura-skincare`);
await p.locator('header').getByRole('link', { name: 'pt', exact: true }).first().click();
await p.waitForURL('**/pt/work/nura-skincare');
ok(p.url().endsWith('/pt/work/nura-skincare'), 'language switch keeps project slug');
ok((await p.locator('html').getAttribute('lang')) === 'pt-MZ', 'html lang updates to pt-MZ');

await p.goto(`${base}/pt/work/saaj-virtual-website`);
const h1 = await p.locator('h1').innerText();
ok(h1.includes('Website') && !h1.includes('Marketing'), `project name translated: ${h1}`);

await p.goto(`${base}/en/work`);
const cards = () => p.locator('main ul > li').count();
ok((await cards()) === 11, 'work page shows 11 projects');
for (const [name, count] of [['Fitness & Wellness', 4], ['Healthcare', 3], ['Brands & Commerce', 2], ['Digital Platforms', 2], ['All Projects', 11]]) {
  await p.getByRole('button', { name }).click();
  await p.waitForTimeout(800);
  ok((await cards()) === count, `filter ${name} shows ${count}`);
  ok((await p.getByRole('button', { name }).getAttribute('aria-pressed')) === 'true', `filter ${name} pressed state`);
}

await p.goto(`${base}/en`);
ok((await p.locator('main a[href*="/work/"]:has(img)').count()) === 5, 'homepage shows 5 of 11 projects');

for (const [locale, words] of [['en', 'Hello NCAI'], ['pt', 'Olá NCAI']]) {
  await p.goto(`${base}/${locale}/contact`);
  const href = await p.locator('main a[href*="wa.me"]').getAttribute('href');
  ok(href.startsWith('https://wa.me/258846571529') && decodeURIComponent(href).includes(words), `${locale} WhatsApp: ${decodeURIComponent(href)}`);
  ok((await p.locator('main a[href="mailto:ncai.servicos@gmail.com"]').count()) === 1, `${locale} email link`);
  ok((await p.locator('main a[href="tel:+258846571529"]').count()) === 1, `${locale} phone link`);
  ok((await p.locator('form').count()) === 0, `${locale} has no form`);
}

await p.goto(`${base}/en/work`);
await p.keyboard.press('Tab');
ok((await p.evaluate(() => document.activeElement.getAttribute('href'))) === '#main', 'first Tab reaches skip link');

const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true })).newPage();
await m.goto(`${base}/en`);
const open = m.getByRole('button', { name: 'Open menu' });
await open.click();
ok(await m.locator('#mobile-menu').isVisible(), 'mobile menu opens');
await m.keyboard.press('Escape');
ok(!(await m.locator('#mobile-menu').isVisible()), 'Escape closes menu');
await open.click();
await m.locator('#mobile-menu').getByRole('link', { name: 'Work' }).click();
await m.waitForURL('**/en/work');
await m.waitForTimeout(300);
ok(!(await m.locator('#mobile-menu').isVisible()), 'menu closes after navigation');

const r = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
await r.goto(`${base}/en`);
ok((await r.evaluate(() => getComputedStyle(document.querySelector('.reveal')).opacity)) === '1', 'reduced motion shows content');

const n = await (await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })).newPage();
await n.goto(`${base}/pt`);
ok(await n.locator('h2').first().isVisible(), 'content visible without JavaScript');

await b.close();
console.log('DONE');
