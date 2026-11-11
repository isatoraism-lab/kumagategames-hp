/* Static preprocessed 16:9 logos. No canvas processing, async repositioning or scaling. */
(()=>{
  const settings=window.KUMA_GAMES;
  if(!Array.isArray(settings))return;
  const labels={maintenance:'メンテナンス中',building:'作成中',active:'開催中',planning:'企画中',preparing:'準備中',recruiting:'募集中',ended:'終了'};
  const scenes=new Set(['axisbay','rust','request']);
  document.querySelectorAll('[data-game-card]').forEach((card,i)=>{
    const d=settings[i];if(!d)return;
    const title=card.querySelector('.game-info strong'),subtitle=card.querySelector('.game-info small');
    if(title)title.textContent=String(d.title??'');
    if(subtitle)subtitle.textContent=String(d.subtitle??'');
    const state=Object.prototype.hasOwnProperty.call(labels,d.status)?d.status:'planning';
    const tag=card.querySelector('.status');
    if(tag){tag.textContent=labels[state];tag.className='status status--'+state;}
    const art=card.querySelector('.game-art');
    if(art){art.classList.remove('scene-axisbay','scene-rust','scene-request');art.classList.add('scene-'+(scenes.has(d.scene)?d.scene:'axisbay'));}
    const mat=card.querySelector('.logo-mat');
    if(mat){
      const imgPath=typeof d.image==='string'&&/^assets\/[a-z0-9_.-]+\.(png|webp|jpg|jpeg)$/i.test(d.image)?d.image:null;
      if(imgPath){
        let img=mat.querySelector('img');
        if(!img){mat.replaceChildren();img=document.createElement('img');img.className='game-logo';mat.appendChild(img);}
        if(img.getAttribute('src')!==imgPath)img.setAttribute('src',imgPath);
        img.alt=String(d.alt??d.title??'ゲームロゴ');
        img.style.removeProperty('--logo-scale');
        img.classList.remove('game-logo--normalized');
      }else{
        const icon=mat.querySelector('.game-icon');
        if(icon){icon.textContent=String(d.icon??'🎮');}
        else{mat.replaceChildren();const span=document.createElement('span');span.className='game-icon';span.textContent=String(d.icon??'🎮');mat.appendChild(span);}
      }
    }
  });
})();
