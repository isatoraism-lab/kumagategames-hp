'use strict';
// 公式Xアカウント（ホームの「最新情報」に使います）
const X_USERNAME = 'KumaGateGames';

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-menu');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く')});
nav?.addEventListener('click',(e)=>{if(e.target.closest('a')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}});

// ホームのみ：x-config.js に書いた投稿を「X（旧Twitter）最新情報」に表示する
// （Xのタイムライン埋め込みは、Xにログインしていない人には表示されないため使っていません）
(()=>{
  const feed=document.getElementById('x-feed');
  const safe=String(X_USERNAME||'').replace(/^@/,'').trim();
  if(!feed||!/^[A-Za-z0-9_]{1,15}$/.test(safe))return;
  const link=document.getElementById('x-link');
  if(link)link.href=`https://x.com/${safe}`;
  const post=window.KUMA_X_POST||{};
  const url=String(post.url||'').trim().replace(/^https:\/\/twitter\.com\//,'https://x.com/').replace(/\?.*$/,'');
  const text=String(post.text||'').trim();
  if(!new RegExp(`^https://x\\.com/${safe}/status/\\d+$`,'i').test(url)||!text){
    // 投稿が未設定のときは、これまでどおりタイムライン埋め込みを試す（Xにログイン中の人にだけ表示される）
    const box=document.createElement('div');box.className='x-embed';
    const a=document.createElement('a');a.className='twitter-timeline';a.href=`https://twitter.com/${safe}`;
    a.dataset.theme='dark';a.dataset.chrome='noheader nofooter noborders transparent';a.dataset.height='320';a.dataset.dnt='true';a.dataset.lang='ja';
    a.textContent=`@${safe} の投稿`;
    box.append(a);feed.append(box);
    window.twttr=(function(d,s,id){const t=window.twttr||{};if(d.getElementById(id))return t;const js=d.createElement(s);js.id=id;js.async=true;js.src='https://platform.twitter.com/widgets.js';d.body.append(js);t._e=[];t.ready=f=>t._e.push(f);return t;}(document,'script','twitter-wjs'));
    window.twttr.ready(t=>t.events.bind('rendered',e=>{if(feed.contains(e.target))feed.classList.add('is-rendered')}));
    return;
  }
  const el=(tag,cls,t)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(t!=null)n.textContent=t;return n;};
  let when='';
  const m=String(post.date||'').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if(m)when=`${Number(m[2])}月${Number(m[3])}日`;
  const card=el('a','x-post');card.href=url;card.target='_blank';card.rel='noopener noreferrer';
  card.setAttribute('aria-label','KUMAGateGamesの最新の投稿をXで見る（新しいタブで開きます）');
  const av=el('img','x-post-avatar');av.src='assets/x-avatar.webp';av.alt='';av.width=40;av.height=40;
  const main=el('div','x-post-main');
  const head=el('div','x-post-head');
  head.append(el('strong','x-post-name','KUMAGateGames'),el('span','x-post-meta',`@KUMAGateGames${when?' · '+when:''}`));
  main.append(head,el('p','x-post-text',text),el('span','x-post-more','Xで続きを見る ›'));
  card.append(av,main);
  feed.append(card);
  feed.classList.add('has-post');
})();
