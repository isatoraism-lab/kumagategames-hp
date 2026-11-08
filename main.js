'use strict';
// Configure only after the official KUMAGateGames X account is confirmed.
const X_USERNAME = 'KumaGateGames';
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-menu');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く')});
nav?.addEventListener('click',(e)=>{if(e.target.closest('a')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}});
if(X_USERNAME){const safe=X_USERNAME.replace(/^@/,'').trim();if(/^[A-Za-z0-9_]{1,15}$/.test(safe)){
 const feed=document.getElementById('x-feed'); const a=document.createElement('a');a.className='twitter-timeline';a.href=`https://twitter.com/${safe}`;a.dataset.height='300';a.dataset.chrome='noheader nofooter';a.textContent=`@${safe} の投稿`;feed.replaceChildren(a);
 const link=document.getElementById('x-link');link.href=`https://x.com/${safe}`;link.hidden=false;
 const script=document.createElement('script');script.async=true;script.src='https://platform.twitter.com/widgets.js';script.charset='utf-8';document.body.appendChild(script);
}}
