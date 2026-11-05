// Re-captures authentic portfolio imagery from the live sites. Usage: node tools/capture.mjs [slug ...]
// Output goes to tools/raw/cap (gitignored); tools/optimise.mjs publishes selected frames.
import { chromium } from 'playwright';
import fs from 'fs';
const P = {
 'vieiras-gym':{url:'https://vieiras-gym-s9vp.vercel.app/',s:{modalities:'ESCOLHA O SEU CAMINHO',schedule:'HORÁRIOS DAS AULAS',pricing:'MENSALIDADES POR PACOTES'}},
 'olympia-gym':{url:'https://olympiagym-phi.vercel.app/',s:{modalities:'TREINA COM MÉTODO',pricing:'PLANOS TRANSPARENTES',community:'A ENERGIA QUE MOVE'}},
 'fitness-365':{url:'https://365fitness.vercel.app/',s:{training:'TREINA COM ENERGIA',tips:'APRENDE. APLICA',packages:'ESCOLHE COMO QUERES TREINAR'}},
 'ir-fitness':{url:'https://irfitness.vercel.app/',s:{pillars:'PILARES DO ECOSSISTEMA',plans:'PLANOS DESENHADOS',shop:'SUPLEMENTAÇÃO DE ELITE'}},
 'cda':{url:'https://preview-health-flow.lovable.app/',s:{services:'Cuidados clínicos com',hub:'Aprender é o primeiro passo',steps:'Começar é simples'}},
 'clinica-da-familia':{url:'https://v0-clinica-da-familia-website-tan.vercel.app/',s:{services:'Nossos Serviços',faq:'Perguntas Frequentes'}},
 'clinica-do-povo':{url:'https://clinic-website-redesign-lime.vercel.app/',s:{services:'Como podemos cuidar de si',community:'A Clínica que Cuida',fund:'A sua ajuda transforma'}},
 'sugarbites':{url:'https://sugarbites-by-saaya.vercel.app/',s:{categories:'Shop by Category',favourites:'Atelier Favorites',box:'Build your perfect dessert box'}},
 'nura-skincare':{url:'https://nura-skincare-t8te.vercel.app/',s:{goals:'Comprar por Objectivo',favourites:'Favoritos da Nura',guide:'Guia de skincare'}},
 'saaj-site':{url:'https://saaj-virtual-site.vercel.app/',s:{guides:'Escolhe com quem queres falar',steps:'Em três passos',pilot:'Em Maxixe e Massinga'}},
};
const out='tools/raw/cap'; fs.mkdirSync(out,{recursive:true});
const only=process.argv.slice(2);
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const hideFloats=()=>{for(const e of document.querySelectorAll('body *')){const c=getComputedStyle(e);if(c.position!=='fixed')continue;const r=e.getBoundingClientRect();
  if(r.height<220&&r.width<460&&r.top>innerHeight*0.45)e.style.setProperty('visibility','hidden','important');}
  for(const e of document.querySelectorAll('[id*=lovable i],[class*=lovable i],a[href*="lovable.dev"]'))e.style.setProperty('visibility','hidden','important');};
async function settle(p){await p.waitForLoadState('networkidle',{timeout:6000}).catch(()=>{});
  await p.evaluate(async()=>{await Promise.all([...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight*1.5&&!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,5000)})))});
  await p.waitForTimeout(1800);}
async function run(slug,cfg,vp){
  const ctx=await browser.newContext(vp==='d'?{viewport:{width:1440,height:900},deviceScaleFactor:1.5}:{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const p=await ctx.newPage();
  await p.goto(cfg.url,{waitUntil:'domcontentloaded',timeout:45000});
  await p.waitForLoadState('networkidle',{timeout:12000}).catch(()=>{});await p.waitForTimeout(3000);
  await p.evaluate(hideFloats);await p.screenshot({path:`${out}/${slug}-${vp}-hero.png`});
  // walk the page slowly so lazy media and scroll reveals fire
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<H;y+=500){await p.evaluate(v=>window.scrollTo({top:v,behavior:'instant'}),y);await p.waitForTimeout(350);}
  for(const [k,txt] of Object.entries(cfg.s)){
    const ok=await p.evaluate(t=>{const e=[...document.querySelectorAll('h1,h2,h3')].find(h=>h.innerText.replace(/\s+/g,' ').toLowerCase().includes(t.toLowerCase()));
      if(!e)return false;const y=e.getBoundingClientRect().top+scrollY-110;window.scrollTo({top:y,behavior:'instant'});return true},txt);
    if(!ok){console.log('MISS',slug,vp,k);continue}
    await settle(p);await p.evaluate(hideFloats);
    await p.screenshot({path:`${out}/${slug}-${vp}-${k}.png`});
    if(vp==='m')break;
  }
  await ctx.close();console.log('ok',slug,vp);
}
const q=Object.entries(P).filter(([s])=>!only.length||only.includes(s)).flatMap(([s,c])=>[[s,c,'d'],[s,c,'m']]);
await Promise.all(Array.from({length:3},async()=>{while(q.length){const [s,c,v]=q.shift();try{await run(s,c,v)}catch(e){console.log('FAIL',s,v,e.message.split('\n')[0])}}}));
await browser.close();console.log('DONE');
