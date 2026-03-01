'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getSupabase } from '@/lib/supabase';
import { smartSave, smartLoad, getLeaderboard, getMyRank, signIn, signUp, signOut } from '@/lib/gameService';

// ── Types ───────────────────────────────────────────────────
interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  total_earned: number;
  level: number;
  prestige_stars: number;
  zone: string;
}

interface User {
  id: string;
  email?: string;
}

// ── Helpers ─────────────────────────────────────────────────
function fmt(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}k`;
  return `$${Math.floor(n)}`;
}

const ZONE_NAMES: Record<string, string> = {
  centro: 'Barrio Centro', norte: 'Zona Norte', sur: 'Zona Sur',
  este: 'Zona Este', premium: 'Zona Premium', aeropuerto: 'Aeropuerto',
};
const LEVEL_NAMES = ['Principiante','Emprendedor','Comerciante','Empresario','Magnate','Tycoon','Leyenda','Barrio Boss'];

// ════════════════════════════════════════════════════════════
export default function GameClient() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [cloudStatus, setCloudStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [loadSource, setLoadSource] = useState<string>('');
  const [form, setForm] = useState({ email: '', password: '', username: '', avatar: '😎' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const AVATARS = ['😎','🤑','💪','🏆','👑','🔥','⭐','🎯','💎','🦁'];

  // ── Auth state ─────────────────────────────────────────────
  useEffect(() => {
    const sb = getSupabase();
    sb.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = sb.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // ── Listen for messages from the game iframe ───────────────
  useEffect(() => {
    const handle = async (e: MessageEvent) => {
      if (!e.data?.type) return;
      switch (e.data.type) {
        case 'GAME_SAVE':
          setCloudStatus('saving');
          smartSave(e.data.payload);
          setTimeout(() => setCloudStatus('saved'), 800);
          setTimeout(() => setCloudStatus('idle'), 3000);
          break;

        case 'GAME_LOAD_REQUEST':
          if (user) {
            const { state, source } = await smartLoad();
            setLoadSource(source);
            iframeRef.current?.contentWindow?.postMessage(
              { type: 'GAME_LOAD_RESPONSE', payload: state, source },
              '*'
            );
          }
          break;

        case 'OPEN_LEADERBOARD':
          handleOpenLeaderboard();
          break;

        case 'OPEN_AUTH':
          setShowAuth(true);
          break;
      }
    };

    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, [user]);

  // ── Leaderboard ────────────────────────────────────────────
  const handleOpenLeaderboard = useCallback(async () => {
    setShowLeaderboard(true);
    const [lb, rank] = await Promise.all([getLeaderboard(), getMyRank()]);
    setLeaderboard(lb);
    setMyRank(rank);
  }, []);

  // ── Auth handlers ──────────────────────────────────────────
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      if (authMode === 'login') {
        await signIn(form.email, form.password);
        setShowAuth(false);
        setCloudStatus('saving');
        // After login, load cloud save
        const { state, source } = await smartLoad();
        setLoadSource(source);
        iframeRef.current?.contentWindow?.postMessage(
          { type: 'GAME_LOAD_RESPONSE', payload: state, source },
          '*'
        );
        setCloudStatus('saved');
        setTimeout(() => setCloudStatus('idle'), 2000);
      } else {
        if (form.username.length < 3) throw new Error('Username debe tener al menos 3 caracteres');
        await signUp(form.email, form.password, form.username, form.avatar);
        setShowAuth(false);
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  // ── Styles ─────────────────────────────────────────────────
  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '16px',
  };
  const modal: React.CSSProperties = {
    background: '#1E1B2E', border: '3px solid #FFE135',
    borderRadius: '20px', padding: '28px', width: '100%',
    maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,.6)',
    fontFamily: "'Nunito', sans-serif",
  };
  const input: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '2px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.08)',
    color: 'white', fontSize: '15px', fontFamily: "'Nunito', sans-serif",
    outline: 'none', marginBottom: '12px',
  };
  const btn = (color = '#FFE135'): React.CSSProperties => ({
    width: '100%', padding: '12px', borderRadius: '12px',
    border: 'none', background: color, color: color === '#FFE135' ? '#1E1B2E' : 'white',
    fontFamily: "'Fredoka One', cursive", fontSize: '16px',
    cursor: 'pointer', marginTop: '4px',
  });

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#1E1B2E' }}>

      {/* ── GAME IFRAME ── */}
      <iframe
        ref={iframeRef}
        src="/game/imperio-del-barrio-v8.html"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Imperio del Barrio"
        allow="autoplay"
      />

      {/* ── FLOATING HUD BAR ── */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '6px 10px', zIndex: 100,
        background: 'rgba(30,27,46,.85)', backdropFilter: 'blur(8px)',
        borderBottom: '2px solid #FFE135', borderLeft: '2px solid #FFE135',
        borderBottomLeftRadius: '12px',
      }}>
        {/* Cloud save indicator */}
        {cloudStatus !== 'idle' && (
          <span style={{ fontSize: '11px', fontWeight: 900, color: cloudStatus === 'saved' ? '#2DC653' : cloudStatus === 'error' ? '#FF4757' : '#FFE135' }}>
            {cloudStatus === 'saving' ? '☁️ Guardando...' : cloudStatus === 'saved' ? '✅ Guardado' : '❌ Error'}
          </span>
        )}
        {loadSource && <span style={{ fontSize: '10px', color: '#aaa' }}>{loadSource === 'cloud' ? '☁️ Nube' : '💾 Local'}</span>}

        {/* Auth button */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: '#FFE135', fontWeight: 900, fontFamily: 'Nunito' }}>
              {user.email?.split('@')[0]}
            </span>
            <button
              onClick={handleOpenLeaderboard}
              style={{ background: '#2DC653', border: 'none', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', color: 'white', fontFamily: 'Fredoka One', fontSize: '12px' }}
            >🏆 Ranking</button>
            <button
              onClick={handleSignOut}
              style={{ background: 'rgba(255,71,87,.3)', border: '1px solid #FF4757', borderRadius: '8px', padding: '4px 8px', cursor: 'pointer', color: '#FF4757', fontSize: '11px' }}
            >Salir</button>
          </div>
        ) : (
          <button
            onClick={() => { setShowAuth(true); setAuthMode('login'); }}
            style={{ background: '#FFE135', border: 'none', borderRadius: '8px', padding: '5px 14px', cursor: 'pointer', color: '#1E1B2E', fontFamily: 'Fredoka One', fontSize: '13px' }}
          >☁️ Iniciar Sesión</button>
        )}
      </div>

      {/* ══ AUTH MODAL ══ */}
      {showAuth && (
        <div style={overlay} onClick={e => e.target === e.currentTarget && setShowAuth(false)}>
          <div style={modal}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '2.5rem' }}>🏘️</div>
              <h2 style={{ fontFamily: 'Fredoka One', color: '#FFE135', fontSize: '1.6rem', margin: '4px 0' }}>
                {authMode === 'login' ? '¡Bienvenido de vuelta!' : '¡Únete al Barrio!'}
              </h2>
              <p style={{ color: '#aaa', fontSize: '13px' }}>
                {authMode === 'login' ? 'Carga tu progreso desde la nube' : 'Guarda tu progreso y compite en el ranking'}
              </p>
            </div>

            <form onSubmit={handleAuth}>
              {authMode === 'register' && (
                <>
                  <input
                    style={input}
                    placeholder="Nombre de jugador (ej: ElBarrioJefe)"
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    required
                  />
                  {/* Avatar picker */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px', justifyContent: 'center' }}>
                    {AVATARS.map(av => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, avatar: av }))}
                        style={{
                          fontSize: '1.4rem', padding: '6px 8px', borderRadius: '10px', border: '2px solid',
                          borderColor: form.avatar === av ? '#FFE135' : 'transparent',
                          background: form.avatar === av ? 'rgba(255,225,53,.15)' : 'rgba(255,255,255,.05)',
                          cursor: 'pointer',
                        }}
                      >{av}</button>
                    ))}
                  </div>
                </>
              )}

              <input
                style={input}
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <input
                style={input}
                type="password"
                placeholder="Contraseña (mín. 6 caracteres)"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
              />

              {formError && (
                <div style={{ background: 'rgba(255,71,87,.15)', border: '1px solid #FF4757', borderRadius: '8px', padding: '8px 12px', marginBottom: '12px', color: '#FF4757', fontSize: '13px' }}>
                  ⚠️ {formError}
                </div>
              )}

              <button type="submit" style={btn()} disabled={formLoading}>
                {formLoading ? '⏳ Cargando...' : authMode === 'login' ? '🚀 Entrar al Barrio' : '🏘️ Crear mi Imperio'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                onClick={() => { setAuthMode(m => m === 'login' ? 'register' : 'login'); setFormError(''); }}
                style={{ background: 'none', border: 'none', color: '#FFE135', cursor: 'pointer', fontSize: '13px', fontFamily: 'Nunito', fontWeight: 700 }}
              >
                {authMode === 'login' ? '¿Sin cuenta? Regístrate gratis →' : '¿Ya tienes cuenta? Inicia sesión →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ LEADERBOARD MODAL ══ */}
      {showLeaderboard && (
        <div style={overlay} onClick={e => e.target === e.currentTarget && setShowLeaderboard(false)}>
          <div style={{ ...modal, maxWidth: '560px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontFamily: 'Fredoka One', color: '#FFE135', fontSize: '1.5rem', margin: 0 }}>🏆 Ranking del Barrio</h2>
                {myRank && <p style={{ color: '#aaa', fontSize: '12px', margin: '2px 0 0' }}>Tu posición: #{myRank}</p>}
              </div>
              <button onClick={() => setShowLeaderboard(false)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            {/* My rank highlight */}
            {myRank && myRank > 3 && (
              <div style={{ background: 'rgba(255,225,53,.1)', border: '2px solid #FFE135', borderRadius: '12px', padding: '10px 14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'Fredoka One', color: '#FFE135', fontSize: '1.1rem' }}>#{myRank}</span>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>Tu posición actual</span>
                <span style={{ marginLeft: 'auto', color: '#aaa', fontSize: '12px' }}>Sigue jugando para subir 🚀</span>
              </div>
            )}

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '40px 32px 1fr 90px 60px', gap: '8px', padding: '6px 12px', color: '#888', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.5px' }}>
              <span>#</span><span></span><span>Jugador</span><span style={{ textAlign: 'right' }}>Ganado</span><span style={{ textAlign: 'right' }}>Nivel</span>
            </div>

            {/* Rows */}
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {leaderboard.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#555', padding: '40px', fontSize: '14px' }}>
                  Cargando ranking... 🏘️
                </div>
              ) : leaderboard.map((p, i) => {
                const isMe = user?.email?.startsWith(p.username);
                const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
                return (
                  <div
                    key={p.username}
                    style={{
                      display: 'grid', gridTemplateColumns: '40px 32px 1fr 90px 60px', gap: '8px',
                      padding: '8px 12px', borderRadius: '10px', alignItems: 'center',
                      background: isMe ? 'rgba(255,225,53,.12)' : i < 3 ? 'rgba(255,255,255,.04)' : 'transparent',
                      border: isMe ? '1px solid rgba(255,225,53,.3)' : '1px solid transparent',
                    }}
                  >
                    <span style={{ fontFamily: 'Fredoka One', color: i < 3 ? '#FFE135' : '#666', fontSize: '14px' }}>
                      {medal || `#${p.rank}`}
                    </span>
                    <span style={{ fontSize: '1.3rem' }}>{p.avatar}</span>
                    <div>
                      <div style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>{p.username}</div>
                      <div style={{ color: '#888', fontSize: '10px' }}>
                        {ZONE_NAMES[p.zone] || p.zone} · {'⭐'.repeat(Math.min(p.prestige_stars, 5))}
                      </div>
                    </div>
                    <span style={{ textAlign: 'right', fontFamily: 'Fredoka One', color: '#2DC653', fontSize: '13px' }}>
                      {fmt(p.total_earned)}
                    </span>
                    <span style={{ textAlign: 'right', color: '#aaa', fontSize: '12px', fontWeight: 900 }}>
                      Nv.{p.level + 1}<br />
                      <span style={{ fontSize: '10px', color: '#666' }}>{LEVEL_NAMES[p.level] || ''}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '12px', color: '#555', fontSize: '11px' }}>
              Actualizado cada 30 segundos · Top 100 jugadores
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
