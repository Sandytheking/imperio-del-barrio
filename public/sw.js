// ═══════════════════════════════════════════════════════════
// Imperio del Barrio — Service Worker
// Handles: push notifications + offline cache
// ═══════════════════════════════════════════════════════════

const CACHE   = 'imperio-v1';
const OFFLINE = ['/game/', '/game/imperio-del-barrio-v8.html'];

// ── Install: cache the game shell ──────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(OFFLINE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: network-first, fallback to cache ────────────────
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// ── Push: show notification ────────────────────────────────
self.addEventListener('push', e => {
  let data = { title: '🏘️ Imperio del Barrio', body: '¡Tu barrio te necesita!', icon: '/icon-192.png', url: '/' };
  try { data = { ...data, ...e.data.json() }; } catch (_) {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    data.icon,
      badge:   '/icon-96.png',
      tag:     'imperio-push',          // replaces previous if still visible
      renotify: true,
      vibrate: [200, 100, 200],
      data:    { url: data.url },
      actions: [
        { action: 'open',    title: '🎮 Jugar ahora' },
        { action: 'dismiss', title: 'Después'        },
      ],
    })
  );
});

// ── Scheduled reminders (sent via message from GameClient) ────
const _timers: ReturnType<typeof setTimeout>[] = [];

self.addEventListener('message', (e: MessageEvent) => {
  if (e.data?.type !== 'SCHEDULE_REMINDERS') return;

  // Clear any previous timers
  _timers.forEach(t => clearTimeout(t));
  _timers.length = 0;

  const reminders: Array<{ delayMs: number; title: string; body: string; url: string }> = e.data.reminders ?? [];

  reminders.forEach(r => {
    const t = setTimeout(() => {
      self.registration.showNotification(r.title, {
        body:    r.body,
        icon:    '/icon-192.png',
        badge:   '/icon-96.png',
        tag:     'imperio-reminder',
        renotify: true,
        vibrate: [200, 100, 200],
        data:    { url: r.url },
        actions: [
          { action: 'open',    title: '🎮 Jugar ahora' },
          { action: 'dismiss', title: 'Después'        },
        ],
      });
    }, r.delayMs);
    _timers.push(t);
  });
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;

  const target = e.notification.data?.url ?? '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clients => {
        // Focus existing tab if open
        const match = clients.find(c => c.url.includes('imperio') || c.url.includes('/game'));
        if (match) { match.focus(); return; }
        // Otherwise open new tab
        return self.clients.openWindow(target);
      })
  );
});
