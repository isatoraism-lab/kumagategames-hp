/* Fixed rendering logic — edit games-config.js only when games rotate. */
(()=>{
 const settings=window.KUMA_GAMES;if(!Array.isArray(settings))return;
 const labels={maintenance:'メンテナンス中',building:'作成中',active:'開催中',planning:'企画中',preparing:'準備中',recruiting:'募集中',ended:'終了'};
 const scenes=new Set(['axisbay','rust','request']);
 document.querySelectorAll('[data-game-card]').forEach((card,i)=>{
  const d=settings[i];if(!d)return;
  const art=card.querySelector('.game-art'), mat=card.querySelector('.logo-mat'),tag=card.querySelector('.status');
  card.querySelector('.game-info strong').textContent=String(d.title??'');
  card.querySelector('.game-info small').textContent=String(d.subtitle??'');
  const state=Object.prototype.hasOwnProperty.call(labels,d.status)?d.status:'planning';
  if(tag){tag.textContent=labels[state];tag.className='status status--'+state;}
  if(art){art.classList.remove('scene-axisbay','scene-rust','scene-request');art.classList.add('scene-'+(scenes.has(d.scene)?d.scene:'axisbay'));}
  if(mat){
   const src=typeof d.image==='string'&&/^assets\/[a-z0-9_.-]+\.(png|webp|jpg|jpeg)$/i.test(d.image)?d.image:null;
   if(src){let img=mat.querySelector('img');if(!img){mat.replaceChildren();img=document.createElement('img');img.className='game-logo';mat.appendChild(img);}img.src=src;img.alt=String(d.alt??d.title??'ゲームロゴ');img.style.setProperty('--logo-scale',String(Math.max(.5,Math.min(3,Number(d.logoScale)||1))));}
   else {mat.replaceChildren();const span=document.createElement('span');span.className='game-icon';span.textContent=String(d.icon??'🎮');mat.appendChild(span);}
  }
 });
})();