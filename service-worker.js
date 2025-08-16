
const VERSION='mp-v4';
const ASSETS=[
  '/', '/index.html', '/assets/styles.css','/assets/app.js','/assets/progress.js','/config.js',
  '/manifest.webmanifest','/favicon.svg','/offline.html'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k))))).then(()=>self.clients.claim());
});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.method!=='GET'){return;}
  // Network-first for pages, cache-first for assets
  if(url.origin===location.origin && (url.pathname.endsWith('.css')||url.pathname.endsWith('.js')||url.pathname.endsWith('.svg')||url.pathname.startsWith('/icons/'))){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone(); caches.open(VERSION).then(c=>c.put(e.request,copy)); return res;})));
  }else{
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)).then(r=>r||caches.match('/offline.html')));
  }
});
