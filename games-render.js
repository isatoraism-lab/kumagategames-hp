/* games-config.js の内容からホームのゲームカード（最大3枚）を作ります。 */
(()=>{
  const list=window.KUMA_GAMES;
  const grid=document.getElementById('game-grid');
  if(!Array.isArray(list)||!grid)return;
  const labels={maintenance:'メンテナンス中',building:'作成中',active:'開催中',planning:'企画中',preparing:'準備中',recruiting:'募集中',ended:'終了'};
  const scenes=new Set(['axisbay','rust','request','light','dark']);
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=String(text);return n;};
  const safeImage=p=>typeof p==='string'&&/^assets\/[a-z0-9_.-]+\.(png|webp|jpg|jpeg)$/i.test(p)?p:null;

  const cards=list.slice(0,3).map(d=>{
    d=d||{};
    const scene=scenes.has(d.scene)?d.scene:'axisbay';
    const image=safeImage(d.image);
    const card=el('article','game-card scene-'+scene);
    if(scene==='request'||!image){
      card.classList.add('game-card--request');
      const top=el('div','req-top');
      const icon=el('span','req-icon');icon.setAttribute('aria-hidden','true');
      top.append(icon,el('strong','req-title',d.title??'ゲーム募集中'));
      card.append(top);
      if(d.subtitle)card.append(el('p','req-text',d.subtitle));
    }else{
      card.classList.add('game-card--game');
      const art=el('div','game-art');
      const img=el('img');img.src=image;img.alt=String(d.alt??d.title??'ゲームのロゴ');img.decoding='async';
      art.append(img);
      const state=Object.prototype.hasOwnProperty.call(labels,d.status)?d.status:'planning';
      card.append(art,el('span','status status--'+state,labels[state]),el('strong','game-title',d.title??''));
    }
    return card;
  });
  grid.replaceChildren(...cards);
})();
