'use client';

// GameClient — solo renderiza el iframe.
// El save cloud está integrado DIRECTAMENTE en el HTML del juego.
// No necesita manejar GAME_SAVE ni GAME_LOAD_REQUEST.

export default function GameClient() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#1E1B2E',
    }}>
      <iframe
        src="/game/imperio-del-barrio-v8.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="Imperio del Barrio"
        allow="autoplay"
      />
    </div>
  );
}