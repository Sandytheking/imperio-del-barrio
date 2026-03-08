'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getSupabase } from '@/lib/supabase';
import {
  getLeaderboard, getMyRank,
  signIn, signUp, signOut,
  subscribePush, unsubscribePush, getPushStatus,
  createGuild, findGuildByCode, joinGuild,
  getGuildMembers, leaveGuild, syncGuildMember,
} from '@/lib/gameService';

interface LeaderboardEntry {
  rank: number; username: string; avatar: string;
  total_earned: number; level: number; prestige_stars: number;
  zone: string; social_stage: number; influence: number;
}
interface User { id: string; email?: string; }

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

export default function GameClient() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [user, setUser]         = useState<User | null>(null);
  const userRef                 = useRef<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard]         = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank]     = useState<number | null>(null);
  const [cloudStatus, setCloudStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle');
  const [pushStatus, setPushStatus]   = useState<'granted'|'denied'|'default'|'unsupported'|'loading'>('default');
  const [form, setForm]         = useState({ email: '', password: '', username: '', avatar: '😎' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const iframeReady             = useRef(false);

  const AVATARS = ['😎','🤑','💪','🏆','👑','🔥','⭐','🎯','💎','🦁'];
  const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // ── Enviar JWT al iframe ──────────────────────────────────
  const sendAuthToIframe = useCallback((u: User | null, jwt: string) => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'AUTH_TOKEN', jwt, userId: u?.id || '', anonKey: ANON_KEY,
    }, '*');
  }, [ANON_KEY]);

  // ── Auth state ────────────────────────────────────────────
  useEffect(() => {
    const sb = getSupabase();
    sb.auth.getSession().then(({ data }) => {
      const u   = data.session?.user ?? null;
      const jwt = data.session?.access_token ?? '';
      userRef.current = u;
      setUser(u);
    });
    const { data: listener } = sb.auth.onAuthStateChange((_e, session) => {
      const u   = session?.user ?? null;
      const jwt = session?.access_token ?? '';
      userRef.current = u;
      setUser(u);
      sendAuthToIframe(u, jwt);
    });
    return () => listener.subscription.unsubscribe();
  }, [sendAuthToIframe]);

  useEffect(() => { getPushStatus().then(setPushStatus); }, []);

  useEffect(() => {
    if (!user || pushStatus !== 'granted') return;
    (async () => {
      if (!('serviceWorker' in navigator)) return;
      const reg = await navigator.serviceWorker.ready;
      reg.active?.postMessage({
        type: 'SCHEDULE_REMINDERS', userId: user.id,
        reminders: [
          { delayMs: 4*3600000, title: '💰 Tu barrio genera dinero', body: '¡Vuelve a cobrar!', url: '/' },
          { delayMs: 8*3600000, title: '🏘️ ¡Tu Imperio te espera!', body: 'Llevas 8h sin jugar.', url: '/' },
          { delayMs: 24*3600000, title: '👑 Alguien te superó', body: '¡Entra ahora!', url: '/' },
        ],
      });
    })();
  }, [user, pushStatus]);

  // ── Message handler ───────────────────────────────────────
  useEffect(() => {
    const handle = async (e: MessageEvent) => {
      if (!e.data?.type) return;
      switch (e.data.type) {
        case 'GET_AUTH_TOKEN': {
          iframeReady.current = true;
          const sb = getSupabase();
          const { data } = await sb.auth.getSession();
          const u   = data.session?.user ?? null;
          const jwt = data.session?.access_token ?? '';
          userRef.current = u; setUser(u);
          iframeRef.current?.contentWindow?.postMessage({
            type: 'AUTH_TOKEN', jwt, userId: u?.id || '', anonKey: ANON_KEY,
          }, '*');
          break;
        }
        case 'GAME_SAVE': {
          if (!userRef.current) break;
          setCloudStatus('saving');
          syncGuildMember(e.data.payload).catch(() => {});
          break;
        }
        case 'CLOUD_SAVE_OK': {
          setCloudStatus('saved');
          setTimeout(() => setCloudStatus('idle'), 2500);
          break;
        }
        case 'OPEN_LEADERBOARD': handleOpenLeaderboard(); break;
        case 'OPEN_AUTH': setShowAuth(true); break;
        case 'GUILD_REQUEST': {
          const { id, action, payload } = e.data;
          let result: unknown = null;
          try {
            if (action === 'create') result = await createGuild(payload.name, payload.emoji, payload.code);
            else if (action === 'join') {
              const guild = await findGuildByCode(payload.code);
              if (!guild) result = { error: 'Código inválido' };
              else { await joinGuild(guild.id, payload.code, payload.gameState); result = { guild }; }
            } else if (action === 'getMembers') {
              const guild = await findGuildByCode(payload.code);
              result = guild ? { guild, members: await getGuildMembers(guild.id) } : { guild: null, members: [] };
            } else if (action === 'leave') {
              const guild = await findGuildByCode(payload.code);
              if (guild) await leaveGuild(guild.id);
              result = { ok: true };
            } else if (action === 'sync') {
              await syncGuildMember(payload.gameState); result = { ok: true };
            }
          } catch (err) { result = { error: err instanceof Error ? err.message : 'Error' }; }
          iframeRef.current?.contentWindow?.postMessage({ type: 'GUILD_RESPONSE', id, result }, '*');
          break;
        }
      }
    };
    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, [ANON_KEY]);

  const handleOpenLeaderboard = useCallback(async () => {
    setShowLeaderboard(true);
    const [lb, rank] = await Promise.all([getLeaderboard(), getMyRank()]);
    setLeaderboard(lb); setMyRank(rank);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault(); setFormError(''); setFormLoading(true);
    try {
      if (authMode === 'login') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = await signIn(form.email, form.password) as any;
        setShowAuth(false);
        const jwt = res?.data?.session?.access_token ?? '';
        const u   = res?.data?.session?.user ?? null;
        if (u) { userRef.current = u; setUser(u); }
        iframeRef.current?.contentWindow?.postMessage({
          type: 'AUTH_TOKEN', jwt, userId: u?.id || '', anonKey: ANON_KEY,
        }, '*');
      } else {
        if (form.username.length < 3) throw new Error('Username debe tener al menos 3 caracteres');
        await signUp(form.email, form.password, form.username, form.avatar);
        setShowAuth(false);
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Error desconocido');
    } finally { setFormLoading(false); }
  };

  const handleSignOut = async () => {
    await signOut();
    userRef.current = null; setUser(null);
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'AUTH_TOKEN', jwt: '', userId: '', anonKey: ANON_KEY }, '*'
    );
  };

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, padding: '16px',
  };
  const modal: React.CSSProperties = {
    background: '#1E1B2E', border: '3px solid #FFE135', borderRadius: '20px',
    padding: '28px', width: '100%', maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,.6)', fontFamily: "'Nunito', sans-serif",
  };
  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '2px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.08)',
    color: 'white', fontSize: '15px', outline: 'none', marginBottom: '12px',
    fontFamily: "'Nunito', sans-serif", boxSizing: 'border-box',
  };
  const btnStyle = (color = '#FFE135'): React.CSSProperties => ({
    width: '100%', padding: '12px', borderRadius: '12px', border: 'none',
    background: color, color: color === '#FFE135' ? '#1E1B2E' : 'white',
    fontFamily: "'Fredoka One', cursive", fontSize: '16px', cursor: 'pointer', marginTop: '4px',
  });

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#1E1B2E' }}>

      {/* ══ BARRA SUPERIOR ══ */}
      <div style={{
        flexShrink: 0, height: '44px', minHeight: '44px',
        background: '#16132a', borderBottom: '2px solid rgba(255,225,53,0.3)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: '10px',
        zIndex: 9998, position: 'relative',
      }}>
        <span style={{ fontFamily: 'Fredoka One, cursive', color: '#FFE135', fontSize: '14px', whiteSpace: 'nowrap' }}>
          🏘️ Imperio
        </span>
        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
        {cloudStatus === 'saving' && <span style={{ fontSize: '11px', color: '#FFE135', fontWeight: 900 }}>☁️ Guardando...</span>}
        {cloudStatus === 'saved'  && <span style={{ fontSize: '11px', color: '#2DC653', fontWeight: 900 }}>✅ Guardado</span>}
        {cloudStatus === 'error'  && <span style={{ fontSize: '11px', color: '#FF4757', fontWeight: 900 }}>❌ Error</span>}
        <div style={{ flex: 1 }} />
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontFamily: 'Nunito, sans-serif', whiteSpace: 'nowrap', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.email?.split('@')[0]}
            </span>
            <button onClick={handleOpenLeaderboard} style={{ background: 'rgba(45,198,83,0.2)', border: '1px solid #2DC653', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', color: '#2DC653', fontFamily: 'Fredoka One, cursive', fontSize: '12px', whiteSpace: 'nowrap' }}>
              🏆 Ranking
            </button>
            {pushStatus !== 'unsupported' && pushStatus !== 'denied' && (
              <button onClick={async () => {
                if (pushStatus === 'granted') { await unsubscribePush(); setPushStatus('default'); }
                else { setPushStatus('loading'); const r = await subscribePush(); setPushStatus(r); }
              }} style={{ background: pushStatus === 'granted' ? 'rgba(255,225,53,0.2)' : 'rgba(255,255,255,0.08)', border: `1px solid ${pushStatus === 'granted' ? '#FFE135' : 'rgba(255,255,255,0.2)'}`, borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', color: pushStatus === 'granted' ? '#FFE135' : 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                {pushStatus === 'loading' ? '⏳' : pushStatus === 'granted' ? '🔔' : '🔕'}
              </button>
            )}
            <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid rgba(255,71,87,0.5)', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', color: '#FF4757', fontSize: '11px', whiteSpace: 'nowrap', fontFamily: 'Nunito, sans-serif', fontWeight: 700 }}>
              Salir
            </button>
          </div>
        ) : (
          <button onClick={() => { setShowAuth(true); setAuthMode('login'); }} style={{ background: 'rgba(255,225,53,0.15)', border: '2px solid rgba(255,225,53,0.6)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', color: '#FFE135', fontFamily: 'Fredoka One, cursive', fontSize: '13px', whiteSpace: 'nowrap' }}>
            ☁️ Guardar en la nube
          </button>
        )}
      </div>

      {/* ══ IFRAME ══ */}
      <iframe
        ref={iframeRef}
        src="/game/imperio-del-barrio-v8.html"
        style={{ flex: 1, width: '100%', border: 'none', display: 'block', minHeight: 0 }}
        title="Imperio del Barrio"
        allow="autoplay"
        onLoad={() => {
          iframeReady.current = true;
          getSupabase().auth.getSession().then(({ data }) => {
            const jwt = data.session?.access_token ?? '';
            const u   = data.session?.user ?? null;
            iframeRef.current?.contentWindow?.postMessage({
              type: 'AUTH_TOKEN', jwt, userId: u?.id || '', anonKey: ANON_KEY,
            }, '*');
          });
        }}
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
              <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>
                {authMode === 'login' ? 'Carga tu progreso desde la nube' : 'Guarda tu progreso y compite'}
              </p>
            </div>
            <form onSubmit={handleAuth}>
              {authMode === 'register' && (
                <>
                  <input style={inp} placeholder="Nombre de jugador" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px', justifyContent: 'center' }}>
                    {AVATARS.map(av => (
                      <button key={av} type="button" onClick={() => setForm(f => ({ ...f, avatar: av }))} style={{ fontSize: '1.4rem', padding: '6px 8px', borderRadius: '10px', border: '2px solid', borderColor: form.avatar === av ? '#FFE135' : 'transparent', background: form.avatar === av ? 'rgba(255,225,53,.15)' : 'rgba(255,255,255,.05)', cursor: 'pointer' }}>{av}</button>
                    ))}
                  </div>
                </>
              )}
              <input style={inp} type="email" placeholder="Correo electrónico" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              <input style={inp} type="password" placeholder="Contraseña (mín. 6 caracteres)" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={6} />
              {formError && <div style={{ background: 'rgba(255,71,87,.15)', border: '1px solid #FF4757', borderRadius: '8px', padding: '8px 12px', marginBottom: '12px', color: '#FF4757', fontSize: '13px' }}>⚠️ {formError}</div>}
              <button type="submit" style={btnStyle()} disabled={formLoading}>
                {formLoading ? '⏳ Cargando...' : authMode === 'login' ? '🚀 Entrar al Barrio' : '🏘️ Crear mi Imperio'}
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button onClick={() => { setAuthMode(m => m === 'login' ? 'register' : 'login'); setFormError(''); }} style={{ background: 'none', border: 'none', color: '#FFE135', cursor: 'pointer', fontSize: '13px', fontFamily: 'Nunito', fontWeight: 700 }}>
                {authMode === 'login' ? '¿Sin cuenta? Regístrate gratis →' : '¿Ya tienes cuenta? Inicia sesión →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ LEADERBOARD ══ */}
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
            {myRank && myRank > 3 && (
              <div style={{ background: 'rgba(255,225,53,.1)', border: '2px solid #FFE135', borderRadius: '12px', padding: '10px 14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'Fredoka One', color: '#FFE135', fontSize: '1.1rem' }}>#{myRank}</span>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>Tu posición actual</span>
                <span style={{ marginLeft: 'auto', color: '#aaa', fontSize: '12px' }}>Sigue jugando 🚀</span>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '40px 32px 1fr 90px 60px 50px', gap: '8px', padding: '6px 12px', color: '#888', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.5px' }}>
              <span>#</span><span></span><span>Jugador</span><span style={{ textAlign: 'right' }}>Ganado</span><span style={{ textAlign: 'right' }}>Nivel</span><span style={{ textAlign: 'right' }}>⭐</span>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {leaderboard.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#555', padding: '40px', fontSize: '14px' }}>Cargando ranking... 🏘️</div>
              ) : [...leaderboard].sort((a, b) => (b.influence*1e9+b.total_earned)-(a.influence*1e9+a.total_earned)).map((p, i) => {
                const isMe = user?.email?.startsWith(p.username);
                const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
                const stageIcon = ['','🏠','🏡','🏖️','🏙️','🛩️','🌎'][Math.min(p.social_stage, 6)];
                const inf = p.influence || 0;
                return (
                  <div key={p.username} style={{ display: 'grid', gridTemplateColumns: '40px 32px 1fr 90px 60px 50px', gap: '8px', padding: '8px 12px', borderRadius: '10px', alignItems: 'center', background: isMe ? 'rgba(255,225,53,.12)' : i < 3 ? 'rgba(255,255,255,.04)' : 'transparent', border: isMe ? '1px solid rgba(255,225,53,.3)' : '1px solid transparent' }}>
                    <span style={{ fontFamily: 'Fredoka One', color: i < 3 ? '#FFE135' : '#666', fontSize: '14px' }}>{medal || `#${i+1}`}</span>
                    <span style={{ fontSize: '1.3rem' }}>{p.avatar}</span>
                    <div>
                      <div style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>{p.username}</div>
                      <div style={{ color: '#888', fontSize: '10px' }}>{ZONE_NAMES[p.zone]||p.zone}{stageIcon ? ` · ${stageIcon}` : ''}</div>
                    </div>
                    <span style={{ textAlign: 'right', fontFamily: 'Fredoka One', color: '#2DC653', fontSize: '13px' }}>{fmt(p.total_earned)}</span>
                    <span style={{ textAlign: 'right', color: '#aaa', fontSize: '12px', fontWeight: 900 }}>Nv.{p.level+1}<br/><span style={{ fontSize: '10px', color: '#666' }}>{LEVEL_NAMES[p.level]||''}</span></span>
                    <span style={{ textAlign: 'right', color: inf > 0 ? '#FFD700' : '#555', fontSize: '13px', fontWeight: 900 }}>{inf > 0 ? `⭐${inf}` : '—'}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '12px', color: '#555', fontSize: '11px' }}>Ordenado por ⭐ Influencia · Top 100 jugadores</div>
          </div>
        </div>
      )}
    </div>
  );
}