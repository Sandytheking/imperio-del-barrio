/**
 * game-bridge.js
 * Puente entre el juego HTML y el padre Next.js.
 * 
 * NOTA: El guardado ya está integrado directamente en el HTML del juego.
 * Este bridge solo maneja: leaderboard, auth, y guild requests.
 */
(function () {
  'use strict';

  window.addEventListener('load', function () {
    setTimeout(patchGame, 100);
  });

  function patchGame() {
    // ── Patch renderLeaderboard → abre el modal real de Next.js ───
    const origRenderLB = window.renderLeaderboard;
    window.renderLeaderboard = function () {
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'OPEN_LEADERBOARD' }, '*');
      }
      if (origRenderLB) origRenderLB();
    };

    // ── Expose auth trigger ─────────────────────────────────────
    window.openCloudAuth = function () {
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'OPEN_AUTH' }, '*');
      }
    };

    console.log('[Imperio Bridge] ✅ Bridge active (save handled by game)');
  }
})();