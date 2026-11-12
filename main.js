'use strict';
// 公式Xアカウント（ホームの「最新情報」に使います）
const X_USERNAME = 'KumaGateGames';

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-menu');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く')});
nav?.addEventListener('click',(e)=>{if(e.target.closest('a')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}});

// ホームのみ：Xのタイムラインを読み込み、表示できたら代わりの紹介文と入れ替える
(()=>{
  const feed=document.getElementById('x-feed');
  const safe=String(X_USERNAME||'').replace(/^@/,'').trim();
  if(!feed||!/^[A-Za-z0-9_]{1,15}$/.test(safe))return;
  const link=document.getElementById('x-link');
  if(link)link.href=`https://x.com/${safe}`;
  const box=document.createElement('div');box.className='x-embed';
  const a=document.createElement('a');a.className='twitter-timeline';a.href=`https://twitter.com/${safe}`;
  a.dataset.theme='dark';a.dataset.chrome='noheader nofooter noborders transparent';a.dataset.height='320';a.dataset.dnt='true';a.dataset.lang='ja';
  a.textContent=`@${safe} の投稿`;
  box.append(a);feed.append(box);
  window.twttr=(function(d,s,id){const t=window.twttr||{};if(d.getElementById(id))return t;const js=d.createElement(s);js.id=id;js.async=true;js.src='https://platform.twitter.com/widgets.js';d.body.append(js);t._e=[];t.ready=f=>t._e.push(f);return t;}(document,'script','twitter-wjs'));
  window.twttr.ready(t=>t.events.bind('rendered',e=>{if(feed.contains(e.target))feed.classList.add('is-rendered')}));
})();
