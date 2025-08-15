(function(){
  const MID = "G-NJ5ZPT51K2";
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + MID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MID, { send_page_view: true });

  // Track clicks on game cards in the hub
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.card');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const game = href.split('/').pop().replace('.html','');
    gtag('event', 'select_content', { content_type: 'game', item_id: game });
  });

  // Game page events
  const path = (location.pathname.split('/').pop() || 'index.html');
  if (path !== 'index.html' && path.endsWith('.html')) {
    const game = path.replace('.html','');
    gtag('event', 'game_open', { game });

    const labels = ['start','Start','new','New','shuffle','Shuffle','reset','Reset','go','Go','rs','RS'];
    const isPrimary = (el) => {
      if (!el) return false;
      if (el.tagName !== 'BUTTON') return false;
      const id = (el.id||'').toLowerCase();
      const txt = (el.textContent||'').toLowerCase();
      return labels.some(l => id.includes(l.toLowerCase()) || txt.includes(l.toLowerCase()));
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (isPrimary(btn)) {
        gtag('event', 'game_start', { game, button_id: btn.id || null, button_text: btn.textContent || null });
      }
    }, true);
  }
})();
