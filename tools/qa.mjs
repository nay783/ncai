// Route, layout and metadata checks against a running production server.
// Usage: BASE=http://localhost:3100 node tools/qa.mjs
import { chromium } from 'playwright';
import fs from 'fs';
const base = process.env.BASE || 'http://localhost:3100';
const slugs = ['saaj-virtual-application','saaj-virtual-website','fitness-365','nura-skincare','clinica-do-povo','sugarbites-by-saaya','vieiras-gym','olympia-gym','ir-fitness','cda','clinica-da-familia'];
const paths = ['', '/work', '/services', '/about', '/contact', '/privacy', ...slugs.map((s) => `/work/${s}`)];
const viewports = { mobile: [390, 844], tablet: [768, 1024], desktop: [1440, 900] };
const out = 'tools/raw/qa'; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const problems = []; let checked = 0;

const jobs = [];
for (const locale of ['en', 'pt']) for (const path of paths) for (const [vp, size] of Object.entries(viewports)) jobs.push({ locale, path, vp, size });

async function worker() {
  while (jobs.length) {
    const { locale, path, vp, size } = jobs.shift();
    const ctx = await b.newContext({ viewport: { width: size[0], height: size[1] } });
    const p = await ctx.newPage();
    const url = `${base}/${locale}${path}`; const label = `${locale}${path || '/'} @${vp}`;
    const errs = [];
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
    p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
    p.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(base)) errs.push(`${r.status()} ${r.url()}`); });
    const res = await p.goto(url, { waitUntil: 'load' });
    if (res.status() !== 200) problems.push(`${label}: status ${res.status()}`);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y); await p.waitForTimeout(40); }
    await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    const r = await p.evaluate(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')].filter((e) => {
        if (e.closest('[class*="overflow-x-auto"]') || e.closest('.hairlines') || e.closest('[hidden]')) return false;
        const b = e.getBoundingClientRect();
        return b.width > 0 && b.right > de.clientWidth + 1;
      }).slice(0, 3).map((e) => e.tagName + '.' + String(e.className).slice(0, 50));
      const links = (rel) => [...document.querySelectorAll(`link[rel="${rel}"]`)];
      return {
        lang: de.lang, title: document.title, desc: document.querySelector('meta[name=description]')?.content,
        overflow: de.scrollWidth - de.clientWidth, wide, h1: document.querySelectorAll('h1').length,
        broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src).slice(0, 3),
        noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
        canonical: links('canonical')[0]?.href, hreflang: links('alternate').filter((l) => l.hreflang).map((l) => l.hreflang),
        forms: document.querySelectorAll('form').length,
        smallTargets: [...document.querySelectorAll('main a, main button, header a, header button')].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.height < 24; }).length,
      };
    });
    if (r.overflow > 0) problems.push(`${label}: overflow ${r.overflow}px ${r.wide.join(' | ')}`);
    if (r.h1 !== 1) problems.push(`${label}: ${r.h1} h1`);
    if (r.broken.length) problems.push(`${label}: broken ${r.broken}`);
    if (r.noAlt) problems.push(`${label}: ${r.noAlt} images without alt`);
    if (r.forms) problems.push(`${label}: contains a form`);
    if (!r.title || !r.desc) problems.push(`${label}: missing title/description`);
    if (new URL(r.canonical).pathname !== `/${locale}${path}`) problems.push(`${label}: canonical ${r.canonical}`);
    if (!['en', 'pt', 'x-default'].every((l) => r.hreflang.includes(l))) problems.push(`${label}: hreflang ${r.hreflang}`);
    if (!r.lang.startsWith(locale)) problems.push(`${label}: lang ${r.lang}`);
    if (errs.length) problems.push(`${label}: ${[...new Set(errs)].slice(0, 3).join(' || ')}`);
    if (path === '' || path === '/work' || path === '/contact' || path === '/work/saaj-virtual-application') {
      if (vp !== 'tablet') {
        await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(300);
        await p.addStyleTag({ content: '.stack-pin{position:relative!important}' });
        await p.screenshot({ path: `${out}/${locale}${path.replace(/\//g, '_') || '_home'}-${vp}.png`, fullPage: true });
      }
    }
    checked++; await ctx.close();
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
await b.close();
console.log(`checked ${checked} page views`);
console.log(problems.length ? [...new Set(problems)].join('\n') : 'no problems found');
console.log('DONE');
