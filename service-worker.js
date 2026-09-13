const CACHE="familyhub-v8";
const ASSETS=["./","index.html","config.js","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET") return;                 // never cache writes
  if(u.origin!==location.origin) return;               // Supabase/CDN go straight to network
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{
    const copy=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return resp;
  }).catch(()=>caches.match("index.html"))));
});

/* ---------- Push notifications ---------- */
self.addEventListener("push", e=>{
  let d={};
  try{ d = e.data ? e.data.json() : {}; }catch(err){ d = { title:"Cuibul", body:(e.data&&e.data.text())||"" }; }
  const title = d.title || "Cuibul 🪹";
  const opts = {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: d.tag || undefined,          // same tag replaces an earlier one instead of stacking
    renotify: !!d.tag,
    data: { url: d.url || "./" },
    vibrate: [80,40,80]
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener("notificationclick", e=>{
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil((async()=>{
    const all = await clients.matchAll({ type:"window", includeUncontrolled:true });
    for(const c of all){ if("focus" in c){ try{ await c.focus(); if(c.navigate) await c.navigate(target); }catch(err){} return; } }
    if(clients.openWindow) await clients.openWindow(target);
  })());
});
