'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getSupabase } from '@/lib/supabase';
import { smartSave, smartLoad, getLeaderboard, getMyRank, signIn, signUp, signOut, subscribePush, unsubscribePush, getPushStatus, createGuild, findGuildByCode, joinGuild, getGuildMembers, leaveGuild, syncGuildMember } from '@/lib/gameService';

// ── Types ───────────────────────────────────────────────────
interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  total_earned: number;
  level: number;
  prestige_stars: number;
  zone: string;
  social_stage: number;
  influence: number;
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
  const [pushStatus, setPushStatus] = useState<'granted' | 'denied' | 'default' | 'unsupported' | 'loading'>('default');
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

  // ── Push notification setup ────────────────────────────────
  useEffect(() => {
    getPushStatus().then(s => setPushStatus(s));
  }, []);

  // ── Schedule push reminders via SW (fires when user leaves) ─
  useEffect(() => {
    if (!user || pushStatus !== 'granted') return;

    // Schedule "come back" messages at 4h, 8h, 24h after last visit
    const scheduleReminders = async () => {
      if (!('serviceWorker' in navigator)) return;
      const reg = await navigator.serviceWorker.ready;
      // Use SW message channel to schedule
      reg.active?.postMessage({
        type: 'SCHEDULE_REMINDERS',
        userId: user.id,
        reminders: [
          { delayMs: 4  * 3600 * 1000, title: '💰 Tu barrio está generando dinero', body: '¡Vuelve a cobrar antes de que se llene el límite!', url: '/' },
          { delayMs: 8  * 3600 * 1000, title: '🏘️ ¡Tu Imperio te espera!',          body: 'Llevas 8 horas sin jugar. ¡Hay dinero acumulado!',  url: '/' },
          { delayMs: 24 * 3600 * 1000, title: '👑 Alguien te superó en el ranking',  body: 'Tu clan necesita tu ayuda. ¡Entra ahora!',          url: '/' },
        ]
      });
    };
    scheduleReminders();
  }, [user, pushStatus]);

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

        case 'GUILD_REQUEST': {
          const { id, action, payload } = e.data;
          let result: unknown = null;
          try {
            if (action === 'create') {
              result = await createGuild(payload.name, payload.emoji, payload.code);
            } else if (action === 'join') {
              const guild = await findGuildByCode(payload.code);
              if (!guild) {
                result = { error: 'Código inválido — ese clan no existe' };
              } else {
                await joinGuild(guild.id, payload.code, payload.gameState);
                result = { guild };
              }
            } else if (action === 'getMembers') {
              // payload.code is the guild code string
              const guild = await findGuildByCode(payload.code);
              if (guild) {
                const members = await getGuildMembers(guild.id);
                result = { guild, members };
              } else {
                result = { guild: null, members: [] };
              }
            } else if (action === 'leave') {
              const guild = await findGuildByCode(payload.code);
              if (guild) await leaveGuild(guild.id);
              result = { ok: true };
            } else if (action === 'sync') {
              await syncGuildMember(payload.gameState);
              result = { ok: true };
            }
          } catch (err) {
            result = { error: err instanceof Error ? err.message : 'Error desconocido' };
          }
          iframeRef.current?.contentWindow?.postMessage(
            { type: 'GUILD_RESPONSE', id, result },
            '*'
          );
          break;
        }
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
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#1E1B2E' }}>

      {/* ── BARRA SUPERIOR (React HUD) ── */}
      <div style={{
        flexShrink: 0,
        height: '48px',
        background: '#16132a',
        borderBottom: '3px solid rgba(255,225,53,0.5)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: '10px',
        zIndex: 200,
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}>
        {/* Izquierda: logo + estado nube */}
        <span style={{ fontFamily: 'Fredoka One, cursive', color: '#FFE135', fontSize: '15px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
          🏘️ Imperio del Barrio
        </span>
        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
        {cloudStatus !== 'idle' && (
          <span style={{ fontSize: '10px', fontWeight: 900, color: cloudStatus === 'saved' ? '#2DC653' : cloudStatus === 'error' ? '#FF4757' : '#FFE135', whiteSpace: 'nowrap' }}>
            {cloudStatus === 'saving' ? '☁️ Guardando...' : cloudStatus === 'saved' ? '✅ Guardado' : '❌ Error'}
          </span>
        )}
        {loadSource && cloudStatus === 'idle' && (
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
            {loadSource === 'cloud' ? '☁️ Nube' : '💾 Local'}
          </span>
        )}

        {/* Espacio flexible */}
        <div style={{ flex: 1 }} />

        {/* Derecha: auth */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 900, fontFamily: 'Nunito, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '120px', textOverflow: 'ellipsis' }}>
              {user.email?.split('@')[0]}
            </span>
            <button
              onClick={handleOpenLeaderboard}
              style={{ background: 'rgba(45,198,83,0.2)', border: '2px solid #2DC653', borderRadius: '20px', padding: '5px 12px', cursor: 'pointer', color: '#2DC653', fontFamily: 'Fredoka One, cursive', fontSize: '12px', whiteSpace: 'nowrap' }}
            >🏆 Ranking</button>

            {/* Push notification bell */}
            {pushStatus !== 'unsupported' && pushStatus !== 'denied' && (
              <button
                onClick={async () => {
                  if (pushStatus === 'granted') {
                    await unsubscribePush();
                    setPushStatus('default');
                  } else {
                    setPushStatus('loading');
                    const result = await subscribePush();
                    setPushStatus(result);
                    if (result === 'granted') {
                      // Show test notification
                      new Notification('🏘️ Imperio del Barrio', {
                        body: '¡Notificaciones activadas! Te avisaremos cuando tu barrio necesite atención.',
                        icon: '/icon-192.png',
                      });
                    }
                  }
                }}
                title={pushStatus === 'granted' ? 'Notificaciones activas — click para desactivar' : 'Activar notificaciones'}
                style={{
                  background: pushStatus === 'granted' ? 'rgba(255,225,53,0.2)' : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${pushStatus === 'granted' ? 'rgba(255,225,53,0.6)' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: '6px', padding: '3px 7px',
                  cursor: pushStatus === 'loading' ? 'wait' : 'pointer',
                  color: pushStatus === 'granted' ? '#FFE135' : 'rgba(255,255,255,0.5)',
                  fontSize: '13px', lineHeight: 1,
                }}
              >
                {pushStatus === 'loading' ? '⏳' : pushStatus === 'granted' ? '🔔' : '🔕'}
              </button>
            )}

            <button
              onClick={handleSignOut}
              style={{ background: 'transparent', border: '1px solid rgba(255,71,87,0.4)', borderRadius: '6px', padding: '3px 7px', cursor: 'pointer', color: 'rgba(255,71,87,0.8)', fontSize: '10px', whiteSpace: 'nowrap' }}
            >Salir</button>
          </div>
        ) : (
          <button
            onClick={() => { setShowAuth(true); setAuthMode('login'); }}
            style={{ background: 'rgba(255,225,53,0.18)', border: '2px solid rgba(255,225,53,0.6)', borderRadius: '20px', padding: '6px 14px', cursor: 'pointer', color: '#FFE135', fontFamily: 'Fredoka One, cursive', fontSize: '12px', whiteSpace: 'nowrap', boxShadow: '0 0 12px rgba(255,225,53,0.2)' }}
          >☁️ Guardar en la nube</button>
        )}
      </div>

      {/* ── IFRAME DEL JUEGO (ocupa el resto de la pantalla) ── */}
      <iframe
        ref={iframeRef}
        src="/game/imperio-del-barrio-v8.html"
        style={{ flex: 1, width: '100%', border: 'none', display: 'block', minHeight: 0 }}
        title="Imperio del Barrio"
        allow="autoplay"
      />

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
            <div style={{ display: 'grid', gridTemplateColumns: '40px 32px 1fr 90px 60px 50px', gap: '8px', padding: '6px 12px', color: '#888', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.5px' }}>
              <span>#</span><span></span><span>Jugador</span><span style={{ textAlign: 'right' }}>Ganado</span><span style={{ textAlign: 'right' }}>Nivel</span><span style={{ textAlign: 'right' }}>⭐</span>
            </div>

            {/* Rows */}
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {leaderboard.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#555', padding: '40px', fontSize: '14px' }}>
                  Cargando ranking... 🏘️
                </div>
              ) : [...leaderboard]
                  .sort((a, b) =>
                    (b.influence * 1_000_000_000 + b.total_earned) -
                    (a.influence * 1_000_000_000 + a.total_earned)
                  )
                  .map((p, i) => {
                const isMe = user?.email?.startsWith(p.username);
                const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
                const STAGE_ICONS = ['🏠','🏡','🏖️','🏙️','🛩️','🌎'];
                const stageIcon = p.social_stage > 0 ? STAGE_ICONS[Math.min(p.social_stage - 1, 5)] : '';
                const inf = p.influence || 0;
                return (
                  <div
                    key={p.username}
                    style={{
                      display: 'grid', gridTemplateColumns: '40px 32px 1fr 90px 60px 50px', gap: '8px',
                      padding: '8px 12px', borderRadius: '10px', alignItems: 'center',
                      background: isMe ? 'rgba(255,225,53,.12)' : i < 3 ? 'rgba(255,255,255,.04)' : 'transparent',
                      border: isMe ? '1px solid rgba(255,225,53,.3)' : '1px solid transparent',
                    }}
                  >
                    <span style={{ fontFamily: 'Fredoka One', color: i < 3 ? '#FFE135' : '#666', fontSize: '14px' }}>
                      {medal || `#${i + 1}`}
                    </span>
                    <span style={{ fontSize: '1.3rem' }}>{p.avatar}</span>
                    <div>
                      <div style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>{p.username}</div>
                      <div style={{ color: '#888', fontSize: '10px' }}>
                        {ZONE_NAMES[p.zone] || p.zone}{stageIcon ? ` · ${stageIcon}` : ''}
                      </div>
                    </div>
                    <span style={{ textAlign: 'right', fontFamily: 'Fredoka One', color: '#2DC653', fontSize: '13px' }}>
                      {fmt(p.total_earned)}
                    </span>
                    <span style={{ textAlign: 'right', color: '#aaa', fontSize: '12px', fontWeight: 900 }}>
                      Nv.{p.level + 1}<br />
                      <span style={{ fontSize: '10px', color: '#666' }}>{LEVEL_NAMES[p.level] || ''}</span>
                    </span>
                    <span style={{ textAlign: 'right', color: inf > 0 ? '#FFD700' : '#555', fontSize: '13px', fontWeight: 900 }}>
                      {inf > 0 ? `⭐${inf}` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '12px', color: '#555', fontSize: '11px' }}>
              Ordenado por ⭐ Influencia · Actualizado cada 30s · Top 100 jugadores
            </div>
          </div>
        </div>
      )}
    </div>
  );
}