/* KUMAGateGames reusable cards. Change game data in games-config.js. */
(()=>{
  const settings=window.KUMA_GAMES;
  if(!Array.isArray(settings))return;
  const labels={maintenance:'メンテナンス中',building:'作成中',active:'開催中',planning:'企画中',preparing:'準備中',recruiting:'募集中',ended:'終了'};
  const scenes=new Set(['axisbay','rust','request']);
  function makeFittedLogo(img,background){
    const source=new Image();
    source.onload=()=>{
      try{
        const w=source.naturalWidth,h=source.naturalHeight;
        if(!w||!h)return;
        const stage=document.createElement('canvas');stage.width=w;stage.height=h;
        const ctx=stage.getContext('2d',{willReadFrequently:true});
        if(!ctx)return;
        ctx.drawImage(source,0,0);
        const pixels=ctx.getImageData(0,0,w,h).data;
        const bg=background==='#000000'?[0,0,0]:[255,255,255];
        let left=w,top=h,right=0,bottom=0;
        const stride=w>1600?2:1;
        for(let y=0;y<h;y+=stride)for(let x=0;x<w;x+=stride){
          const k=(y*w+x)*4;
          if(pixels[k+3]>40 && Math.max(Math.abs(pixels[k]-bg[0]),Math.abs(pixels[k+1]-bg[1]),Math.abs(pixels[k+2]-bg[2]))>32){
            if(x<left)left=x;if(y<top)top=y;if(x>right)right=x;if(y>bottom)bottom=y;
          }
        }
        if(right<=left||bottom<=top)return;
        const out=document.createElement('canvas');out.width=1200;out.height=675;
        const oc=out.getContext('2d');if(!oc)return;
        oc.fillStyle=background;oc.fillRect(0,0,1200,675);
        // Top-left status remains unobstructed; logo artwork is centered beneath it.
        const maxWidth=940,maxHeight=405;
        const cw=right-left+1,ch=bottom-top+1;
        const s=Math.min(maxWidth/cw,maxHeight/ch);
        const dw=Math.max(1,Math.round(cw*s)),dh=Math.max(1,Math.round(ch*s));
        const dx=Math.round((1200-dw)/2),dy=Math.round(675*0.36+(405-dh)/2);
        oc.drawImage(source,left,top,cw,ch,dx,dy,dw,dh);
        img.src=out.toDataURL('image/webp',0.87);
        img.classList.add('game-logo--normalized');
        img.style.removeProperty('--logo-scale');
      }catch(err){
        // Keep original logo visible if browser canvas processing is unavailable.
      }
    };
    source.src=img.src;
  }
  document.querySelectorAll('[data-game-card]').forEach((card,i)=>{
    const d=settings[i];if(!d)return;
    const art=card.querySelector('.game-art'),mat=card.querySelector('.logo-mat'),tag=card.querySelector('.status');
    card.querySelector('.game-info strong').textContent=String(d.title??'');
    card.querySelector('.game-info small').textContent=String(d.subtitle??'');
    const state=Object.prototype.hasOwnProperty.call(labels,d.status)?d.status:'planning';
    if(tag){tag.textContent=labels[state];tag.className='status status--'+state;}
    if(art){art.classList.remove('scene-axisbay','scene-rust','scene-request');art.classList.add('scene-'+(scenes.has(d.scene)?d.scene:'axisbay'));}
    if(mat){
      const src=typeof d.image==='string'&&/^assets\/[a-z0-9_.-]+\.(png|webp|jpg|jpeg)$/i.test(d.image)?d.image:null;
      if(src){
        let img=mat.querySelector('img');
        if(!img){mat.replaceChildren();img=document.createElement('img');img.className='game-logo';mat.appendChild(img);}
        img.classList.remove('game-logo--normalized');
        img.src=src;img.alt=String(d.alt??d.title??'ゲームロゴ');
        img.style.setProperty('--logo-scale',String(Math.max(.5,Math.min(3,Number(d.logoScale)||1))));
        if(d.trimBackground)makeFittedLogo(img,d.background==='#000000'?'#000000':'#ffffff');
      }else{
        mat.replaceChildren();const icon=document.createElement('span');icon.className='game-icon';icon.textContent=String(d.icon??'🎮');mat.appendChild(icon);
      }
    }
  });
})();
