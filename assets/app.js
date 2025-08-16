
let GAMES=[];

async function loadGames(){
  const res=await fetch('assets/games.json'); const data=await res.json();
  GAMES=data.all.map(g=>({...g, category:g.tag}));
  render();
}

function render(){
  const q=(document.getElementById('search').value||'').toLowerCase();
  const fCore=document.getElementById('fCore').checked;
  const fMicro=document.getElementById('fMicro').checked;
  const kid=document.getElementById('kidtoggle').checked;

  let list=GAMES.filter(g=>{
    if(g.category==='Core' && !fCore) return false;
    if(g.category==='Micro' && !fMicro) return false;
    if(q && !g.name.toLowerCase().includes(q)) return false;
    if(kid){ /* all are kid-friendly for now */ }
    return true;
  });

  const mk=g=>`<a class="card" href="${g.href}">
      <div><span class="badge ${g.category==='Core'?'':'kid'}">${g.category}</span></div>
      <div style="font-weight:800">${g.name}</div>
      <div class="note">Play</div>
    </a>`;

  document.getElementById('alllist').innerHTML=list.map(mk).join('');
}

function showConsent(){if(localStorage.getItem('mp_ga_consent')===null){document.getElementById('consent').style.display='block'}}
function acceptAnalytics(){localStorage.setItem('mp_ga_consent','1');document.getElementById('consent').style.display='none'; if(window.mpLoadGA) mpLoadGA()}
function denyAnalytics(){localStorage.setItem('mp_ga_consent','0');document.getElementById('consent').style.display='none'}

window.addEventListener('DOMContentLoaded',()=>{
  ['search','fCore','fMicro','kidtoggle'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.addEventListener('input',render);
  });
  const btn=document.getElementById('sessStart'); if(btn) btn.onclick=()=>{ const v=parseInt(document.getElementById('sessMin').value||'0',10); if(window.mpSetSessionLimit) mpSetSessionLimit(v) };
  const acc=document.getElementById('accept'); if(acc) acc.onclick=acceptAnalytics;
  const den=document.getElementById('deny'); if(den) den.onclick=denyAnalytics;
  showConsent(); loadGames();
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); }
});
