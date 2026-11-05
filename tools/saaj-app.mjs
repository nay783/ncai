// Walks the public SAAJ Virtual onboarding up to a guide profile. Stops there on purpose:
// it never opens a chat, starts a call, or requests an appointment, so nothing reaches the live service.
import { chromium } from 'playwright';
import fs from 'fs';
const out='tools/raw/cap'; fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const c=await b.newContext({viewport:{width:402,height:874},deviceScaleFactor:2.5,isMobile:true,hasTouch:true});
const p=await c.newPage();
const shot=async n=>{await p.waitForTimeout(1600);await p.screenshot({path:`${out}/saaj-app-${n}.png`});console.log('shot',n,(await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').slice(0,260));};
await p.goto('https://saajvirtual.vercel.app/',{waitUntil:'networkidle',timeout:45000}).catch(()=>{});
await shot('1-welcome');
await p.getByRole('button',{name:/Começar/}).click();await shot('2-location');
const sel=p.locator('select').first(); console.log('selects',await p.locator('select').count());
if(await sel.count()){console.log(await sel.locator('option').allTextContents());await sel.selectOption({label:'Inhambane'});await shot('2b-province');
  const s2=p.locator('select').nth(1); if(await s2.count()){console.log(await s2.locator('option').allTextContents());await s2.selectOption({label:'Maxixe'}).catch(e=>console.log(e.message));await shot('2c-district');}}
else{console.log((await p.content()).slice(0,1500))}
const cont=p.getByRole('button',{name:/Continuar/});console.log('continue enabled',await cont.isEnabled().catch(()=>'na'));await cont.click();await shot('3-guide');
await b.close();console.log('DONE');
