/**
 * game-bridge.js
 * Inject this script into imperio-del-barrio-v8.html
 * It patches saveGame() and loadGame() to also talk to the parent (Next.js)
 * via postMessage. Works offline-first: localStorage is always the primary.
 */
(function () {
  'use strict';

  // Wait for game to be fully ready
  window.addEventListener('load', function () {
    setTimeout(patchGame, 200);
  });

  function patchGame() {
    // ── Patch saveGame ──────────────────────────────────────
    const origSave = window.saveGame;
    window.saveGame = function () {
      // 1. Always call original (saves to localStorage)
      if (origSave) origSave();

      // 2. Send to parent (Next.js cloud save)
      if (window.parent !== window && typeof G !== 'undefined') {
        window.parent.postMessage({ type: 'GAME_SAVE', payload: JSON.parse(JSON.stringify(G)) }, '*');
      }
    };

    // ── Patch renderLeaderboard to open real leaderboard ───
    const origRenderLB = window.renderLeaderboard;
    window.renderLeaderboard = function () {
      // Open the real leaderboard modal in Next.js parent
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'OPEN_LEADERBOARD' }, '*');
      }
      // Also call original if it exists
      if (origRenderLB) origRenderLB();
    };

    // ── Listen for cloud load response ─────────────────────
    window.addEventListener('message', function (e) {
      if (!e.data?.type) return;

      if (e.data.type === 'GAME_LOAD_RESPONSE') {
        const cloudState = e.data.payload;
        const source = e.data.source;

        if (!cloudState || Object.keys(cloudState).length === 0) return;

        // Merge cloud state into G
        if (typeof G !== 'undefined' && cloudState) {
          Object.assign(G, cloudState);

          // Re-render everything
          if (typeof renderAll === 'function') renderAll();

          // Show notification
          if (typeof notify === 'function') {
            const msg = source === 'cloud'
              ? '☁️ Progreso cargado desde la nube!'
              : '💾 Progreso local cargado!';
            notify(msg);
          }
        }
      }
    });

    // ── Request cloud load on start ─────────────────────────
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'GAME_LOAD_REQUEST' }, '*');
    }

    // ── Expose auth button trigger ──────────────────────────
    window.openCloudAuth = function () {
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'OPEN_AUTH' }, '*');
      }
    };

    console.log('[Imperio Bridge] ✅ Cloud save bridge active');
  }
})();
