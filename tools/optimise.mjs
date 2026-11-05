// Publishes selected captures to public/images/projects as WebP at uniform ratios.
import sharp from 'sharp';
import fs from 'fs';
const raw='tools/raw/cap', dest='public/images/projects';
const pick={
 'vieiras-gym':{src:'vieiras-gym',d:['hero','schedule','pricing']},
 'olympia-gym':{src:'olympia-gym',d:['hero','modalities','pricing']},
 'fitness-365':{src:'fitness-365',d:['hero','training','packages']},
 'ir-fitness':{src:'ir-fitness',d:['hero','pillars','shop']},
 'cda':{src:'cda',d:['hero','services','hub']},
 'clinica-da-familia':{src:'clinica-da-familia',d:['hero','services','faq'],trim:true},
 'clinica-do-povo':{src:'clinica-do-povo',d:['hero','services','community']},
 'sugarbites-by-saaya':{src:'sugarbites',d:['hero','box']},
 'nura-skincare':{src:'nura-skincare',d:['hero','goals','favourites']},
 'saaj-virtual-website':{src:'saaj-site',d:['hero','guides','steps','pilot']},
};
async function fit(input,out,w,h,trim){
  let img=sharp(input); const m=await img.metadata();
  if(trim){const H=Math.round(m.height*0.92),W=Math.round(H*m.width/m.height);img=img.extract({left:Math.round((m.width-W)/2),top:0,width:W,height:H});}
  await img.resize(w,h,{fit:'cover',position:'top'}).webp({quality:80,effort:5}).toFile(out);
}
for(const [slug,c] of Object.entries(pick)){
  const dir=`${dest}/${slug}`;fs.mkdirSync(dir,{recursive:true});
  for(const n of c.d) await fit(`${raw}/${c.src}-d-${n}.png`,`${dir}/${n}.webp`,1920,1200,c.trim);
  await fit(`${raw}/${c.src}-m-hero.png`,`${dir}/mobile.webp`,780,1688,c.trim);
}
const dir=`${dest}/saaj-virtual-application`;fs.mkdirSync(dir,{recursive:true});
await fit(`${raw}/saaj-app-2c-district.png`,`${dir}/location.webp`,780,1696);
await fit(`${raw}/saaj-app-3-guide.png`,`${dir}/guide.webp`,780,1696);
const store='F:/SAAJ-Virtual-Marketing/08_launch_assets/google-play/screenshots';
for(const [a,b] of [['02_assistants','assistants'],['03_chat','chat'],['04_call','call'],['06_booking','booking']])
  await sharp(`${store}/saaj-virtual_${a}_1080x1920.png`).resize(810,1440).webp({quality:82,effort:5}).toFile(`${dir}/${b}.webp`);
await sharp(`${raw}/saaj-site-d-steps.png`).resize(1920,1200,{fit:'cover',position:'top'}).webp({quality:80}).toFile(`${dir}/overview.webp`);
console.log('done');
