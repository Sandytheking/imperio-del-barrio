/**
 * game-bridge.js
 * Puente mínimo entre el juego HTML y Next.js.
 * El cloud save está integrado directamente en el HTML del juego.
 * Este bridge NO toca openCloudAuth ni el sistema de saves.
 */
(function () {
  'use strict';

  window.addEventListener('load', function () {
    setTimeout(patchGame, 100);
  });

  function patchGame() {
    // ── Patch renderLeaderboard → abre el modal de Next.js ───
    const origRenderLB = window.renderLeaderboard;
    window.renderLeaderboard = function () {
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'OPEN_LEADERBOARD' }, '*');
      }
      if (origRenderLB) origRenderLB();
    };

    // NO tocar openCloudAuth — está manejado por el HTML del juego directamente.

    console.log('[Imperio Bridge] ✅ Bridge active (cloud save: direct)');
  }
})();