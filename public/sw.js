// Imperio del Barrio — Service Worker (plain JS)

var CACHE   = 'imperio-v1';
var OFFLINE = ['/'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c) { return c.addAll(OFFLINE).catch(function(){}); })
      .then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  // Only cache http/https — ignore chrome-extension:// and others
  if (!e.request.url.startsWith('http')) return;
  e.respondWith(
    fetch(e.request).then(function(res) {
      var clone = res.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
      return res;
    }).catch(function(){ return caches.match(e.request); })
  );
});

// Push — show notification
self.addEventListener('push', function(e) {
  var data = { title: '🏘️ Imperio del Barrio', body: '¡Tu barrio te necesita!', icon: '/icon-192.png', url: '/' };
  try { data = Object.assign({}, data, e.data.json()); } catch(_) {}
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body, icon: data.icon, badge: '/icon-192.png',
      tag: 'imperio-push', renotify: true, vibrate: [200,100,200],
      data: { url: data.url },
      actions: [
        { action: 'open',    title: '🎮 Jugar ahora' },
        { action: 'dismiss', title: 'Después' }
      ]
    })
  );
});

// Notification click — focus or open tab
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  if (e.action === 'dismiss') return;
  var target = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients) {
      var match = clients.find(function(c){ return c.url.indexOf('imperio') !== -1; });
      if (match) return match.focus();
      return self.clients.openWindow(target);
    })
  );
});

// Scheduled reminders — set via postMessage from the app
var _timers = [];
self.addEventListener('message', function(e) {
  if (!e.data || e.data.type !== 'SCHEDULE_REMINDERS') return;
  _timers.forEach(function(t){ clearTimeout(t); });
  _timers = [];
  var reminders = e.data.reminders || [];
  reminders.forEach(function(r) {
    _timers.push(setTimeout(function() {
      self.registration.showNotification(r.title, {
        body: r.body, icon: '/icon-192.png', badge: '/icon-192.png',
        tag: 'imperio-reminder', renotify: true, vibrate: [200,100,200],
        data: { url: r.url || '/' },
        actions: [
          { action: 'open',    title: '🎮 Jugar ahora' },
          { action: 'dismiss', title: 'Después' }
        ]
      });
    }, r.delayMs));
  });
});