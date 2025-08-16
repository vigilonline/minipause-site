
const I={
  en:{title:'MiniPause Arcade',subtitle:'112+ kid-friendly games. No ads. Parent-first controls.',playNow:'Play Now',explore:'Explore Games',searchPh:'Search games...',quests:'Quests',badges:'Badges',support:'Support MiniPause',parentControls:'Parent Controls',sessLabel:'Set session limit (minutes)',start:'Start',allow:'Allow analytics',deny:'Essentials only'},
  ro:{title:'MiniPause Arcade',subtitle:'112+ jocuri pentru copii. Fara reclame.',playNow:'Joaca acum',explore:'Vezi jocurile',searchPh:'Cauta jocuri...',quests:'Misiuni',badges:'Insigne',support:'Sustine MiniPause',parentControls:'Control parinti',sessLabel:'Limita sesiune (minute)',start:'Porneste',allow:'Permite analytics',deny:'Doar esentiale'}
};
let lang=localStorage.getItem('mp_lang')||'en';
function t(k){return (I[lang]&&I[lang][k])||I.en[k]||k}
function setLang(l){lang=l;localStorage.setItem('mp_lang',l);renderText()}
function renderText(){document.querySelectorAll('[data-i]').forEach(el=>el.textContent=t(el.dataset.i)); const s=document.getElementById('search'); if(s) s.placeholder=t('searchPh')}

async function loadGames(){
  const res=await fetch('assets/games.json'); const data=await res.json();
  const mk=g=>`<a class="card" href="${g.href}"><span class="badge">${g.tag||'Game'}</span><h3>${g.name}</h3></a>`;
  document.getElementById('alllist').innerHTML=data.all.map(mk).join('');
}

function showConsent(){if(localStorage.getItem('mp_ga_consent')===null){document.getElementById('consent').style.display='block'}}
function acceptAnalytics(){localStorage.setItem('mp_ga_consent','1');document.getElementById('consent').style.display='none'; if(window.mpLoadGA) mpLoadGA()}
function denyAnalytics(){localStorage.setItem('mp_ga_consent','0');document.getElementById('consent').style.display='none'}

window.addEventListener('DOMContentLoaded',()=>{
  const sel=document.getElementById('langsel'); if(sel){ sel.value=lang; sel.onchange=()=>setLang(sel.value); }
  renderText(); showConsent(); loadGames();
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); }
  const btn=document.getElementById('sessStart'); if(btn) btn.onclick=()=>{ const v=parseInt(document.getElementById('sessMin').value||'0',10); if(window.mpSetSessionLimit) mpSetSessionLimit(v) };
});
