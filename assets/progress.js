
(function(){
  const CFG=(window.MP_CONFIG||{}); const GA_ID=CFG.gaId||'G-XXXXXXX';
  window.dataLayer=window.dataLayer||[]; function gtag(){dataLayer.push(arguments)}; window.gtag=window.gtag||gtag;
  function loadGA(){ if(!GA_ID||document.getElementById('ga-tag'))return; const s=document.createElement('script'); s.async=true; s.id='ga-tag';
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID; s.onload=()=>{gtag('js',new Date()); gtag('config',GA_ID)}; document.head.appendChild(s); }
  if(localStorage.getItem('mp_ga_consent')==='1') loadGA();

  const LS='mp_state_v1'; const DEF={gamesPlayed:[],badges:[],quests:{},visits:[],session:{limitMin:0,start:0}};
  function load(){ try{return Object.assign({},DEF,JSON.parse(localStorage.getItem(LS)||'{}'))}catch(e){return {...DEF}} }
  function save(s){ localStorage.setItem(LS,JSON.stringify(s)) }

  window.mpEvent=function(name,payload){
    const s=load();
    if(name==='game_open'&&payload&&payload.game){ if(!s.gamesPlayed.includes(payload.game)) s.gamesPlayed.push(payload.game) }
    if(name==='puzzle_solved'){ s.quests.puzzle=true }
    if(name==='matching_complete'){ s.quests.matching=true }
    save(s); renderSession();
  };
  window.mpSetSessionLimit=function(min){ const s=load(); s.session.limitMin=Math.max(0,+min||0); s.session.start=Date.now(); save(s); renderSession(); };
  function sessionStatus(){ const s=load(); if(!s.session.limitMin) return null; const ms=s.session.limitMin*60000; const left=Math.max(0,(s.session.start?ms-(Date.now()-s.session.start):ms)); return {leftMs:left}; }
  function renderSession(){ const el=document.getElementById('sessionbar'); if(!el) return; const st=sessionStatus(); if(!st){ el.innerHTML=''; return }
    const mins=Math.ceil(st.leftMs/60000); el.innerHTML=`<div class="pad"><strong>Session limit:</strong> ${mins} min left</div>`; if(st.leftMs<=0){ alert('Time for a mini-pause!'); mpSetSessionLimit(0); } else setTimeout(renderSession,10000); }

  window.mpLoadGA=function(){ localStorage.setItem('mp_ga_consent','1'); loadGA(); };
  document.addEventListener('DOMContentLoaded',renderSession);
})();
