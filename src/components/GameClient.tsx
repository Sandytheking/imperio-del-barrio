'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getSupabase } from '@/lib/supabase';
import {
  signIn, signUp, signOut,
  getLeaderboard, getMyRank,
  subscribePush, unsubscribePush, getPushStatus,
  createGuild, findGuildByCode, joinGuild,
  getGuildMembers, leaveGuild, syncGuildMember,
} from '@/lib/gameService';

interface User { id: string; email?: string; }
interface LeaderboardEntry {
  rank: number; username: string; avatar: string;
  total_earned: number; level: number; prestige_stars: number;
  zone: string; social_stage: number; influence: number;
}

function fmt(n: number) {
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(1)}k`;
  return `$${Math.floor(n)}`;
}
const ZONE_NAMES: Record<string,string> = {
  centro:'Barrio Centro', norte:'Zona Norte', sur:'Zona Sur',
  este:'Zona Este', premium:'Zona Premium', aeropuerto:'Aeropuerto',
};
const LEVEL_NAMES = ['Principiante','Emprendedor','Comerciante','Empresario','Magnate','Tycoon','Leyenda','Barrio Boss'];
const AVATARS = ['😎','🤑','💪','🏆','👑','🔥','⭐','🎯','💎','🦁'];

// ─────────────────────────────────────────────────────────────
// Cargar save directamente desde Supabase (sin abstracción)
// ─────────────────────────────────────────────────────────────
async function fetchCloudSave(userId: string): Promise<Record<string,unknown> | null> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('game_saves')
    .select('game_state, total_earned, updated_at')
    .eq('user_id', userId)
    .single();
  if (error || !data) return null;
  return (data.game_state as Record<string,unknown>) ?? null;
}

async function pushCloudSave(userId: string, G: Record<string,unknown>): Promise<void> {
  const sb = getSupabase();
  await sb.rpc('upsert_game_save', {
    p_money:          Math.floor((G.money as number) || 0),
    p_total_earned:   Math.floor((G.totalEarned as number) || 0),
    p_level:          (G.level as number) || 0,
    p_prestige_stars: (G.prestigeStars as number) || 0,
    p_prestige_mult:  (G.prestigeMult as number) || 1,
    p_zone:           (G.zone as string) || 'centro',
    p_game_state:     G,
    p_save_version:   1,
    p_social_stage:   (G.socialStage as number) || 0,
    p_influence:      Math.floor((G.totalInfluence as number) || 0),
    p_guild_code:     (G.guildCode as string) ?? null,
  });
}

// ─────────────────────────────────────────────────────────────
export default function GameClient() {
  const iframeRef  = useRef<HTMLIFrameElement>(null);
  const userRef    = useRef<User | null>(null);
  const [user, setUser]         = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login'|'register'>('login');
  const [showLB, setShowLB]     = useState(false);
  const [lb, setLb]             = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank]     = useState<number|null>(null);
  const [cloudStatus, setCloudStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle');
  const [pushStatus, setPushStatus]   = useState<'granted'|'denied'|'default'|'unsupported'|'loading'>('default');
  const [form, setForm]   = useState({ email:'', password:'', username:'', avatar:'😎' });
  const [formErr, setFormErr]   = useState('');
  const [formLoad, setFormLoad] = useState(false);

  // ── Enviar save de la nube al iframe ──────────────────────
  const sendCloudToIframe = useCallback(async (u: User) => {
    try {
      const cloudState = await fetchCloudSave(u.id);
      if (!cloudState) {
        // No hay save en la nube — decirle al juego que use local
        iframeRef.current?.contentWindow?.postMessage(
          { type: 'GAME_LOAD_RESPONSE', payload: null, source: 'new' }, '*'
        );
        return;
      }
      // Mandar con source: 'cloud' para que el juego lo aplique
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'GAME_LOAD_RESPONSE', payload: cloudState, source: 'cloud' }, '*'
      );
    } catch {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'GAME_LOAD_RESPONSE', payload: null, source: 'new' }, '*'
      );
    }
  }, []);

  // ── Auth state ────────────────────────────────────────────
  useEffect(() => {
    const sb = getSupabase();
    sb.auth.getUser().then(({ data }) => {
      const u = data.user ?? null;
      userRef.current = u;
      setUser(u);
    });
    const { data: listener } = sb.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      userRef.current = u;
      setUser(u);
      // Si acaba de hacer login, cargar save de la nube al iframe
      if (u && _e === 'SIGNED_IN') {
        sendCloudToIframe(u);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [sendCloudToIframe]);

  useEffect(() => { getPushStatus().then(setPushStatus); }, []);

  // ── Message handler ───────────────────────────────────────
  useEffect(() => {
    const handle = async (e: MessageEvent) => {
      if (!e.data?.type) return;

      switch (e.data.type) {

        // El juego pide su save al arrancar
        case 'GAME_LOAD_REQUEST': {
          const u = userRef.current;
          if (!u) {
            // Sin usuario: usar localStorage del juego
            iframeRef.current?.contentWindow?.postMessage(
              { type: 'GAME_LOAD_RESPONSE', payload: null, source: 'new' }, '*'
            );
          } else {
            await sendCloudToIframe(u);
          }
          break;
        }

        // El juego manda su estado para guardar
        case 'GAME_SAVE': {
          const u = userRef.current;
          if (!u) break;
          setCloudStatus('saving');
          try {
            await pushCloudSave(u.id, e.data.payload);
            setCloudStatus('saved');
            setTimeout(() => setCloudStatus('idle'), 2500);
          } catch {
            setCloudStatus('error');
            setTimeout(() => setCloudStatus('idle'), 3000);
          }
          syncGuildMember(e.data.payload).catch(() => {});
          break;
        }

        case 'OPEN_LEADERBOARD': {
          setShowLB(true);
          const [lbData, rank] = await Promise.all([getLeaderboard(), getMyRank()]);
          setLb(lbData); setMyRank(rank);
          break;
        }

        case 'OPEN_AUTH': setShowAuth(true); break;

        case 'GUILD_REQUEST': {
          const { id, action, payload } = e.data;
          let result: unknown = null;
          try {
            if (action === 'create') result = await createGuild(payload.name, payload.emoji, payload.code);
            else if (action === 'join') {
              const g = await findGuildByCode(payload.code);
              if (!g) result = { error: 'Código inválido' };
              else { await joinGuild(g.id, payload.code, payload.gameState); result = { guild: g }; }
            } else if (action === 'getMembers') {
              const g = await findGuildByCode(payload.code);
              result = g ? { guild: g, members: await getGuildMembers(g.id) } : { guild: null, members: [] };
            } else if (action === 'leave') {
              const g = await findGuildByCode(payload.code);
              if (g) await leaveGuild(g.id);
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
  }, [sendCloudToIframe]);

  // ── Auth handlers ─────────────────────────────────────────
  const handleAuth = async (ev: React.FormEvent) => {
    ev.preventDefault(); setFormErr(''); setFormLoad(true);
    try {
      if (authMode === 'login') {
        await signIn(form.email, form.password);
        setShowAuth(false);
        // onAuthStateChange con SIGNED_IN mandará el save automáticamente
      } else {
        if (form.username.length < 3) throw new Error('Username mínimo 3 caracteres');
        await signUp(form.email, form.password, form.username, form.avatar);
        setShowAuth(false);
      }
    } catch (err: unknown) {
      setFormErr(err instanceof Error ? err.message : 'Error');
    } finally { setFormLoad(false); }
  };

  const handleSignOut = async () => {
    await signOut();
    userRef.current = null; setUser(null);
  };

  // ── Styles ────────────────────────────────────────────────
  const overlay: React.CSSProperties = {
    position:'fixed', inset:0, background:'rgba(0,0,0,.8)',
    display:'flex', alignItems:'center', justifyContent:'center',
    zIndex:9999, padding:'16px',
  };
  const modal: React.CSSProperties = {
    background:'#1E1B2E', border:'3px solid #FFE135', borderRadius:'20px',
    padding:'28px', width:'100%', maxWidth:'420px',
    boxShadow:'0 20px 60px rgba(0,0,0,.6)', fontFamily:"'Nunito',sans-serif",
  };
  const inp: React.CSSProperties = {
    width:'100%', padding:'10px 14px', borderRadius:'10px',
    border:'2px solid rgba(255,255,255,.15)', background:'rgba(255,255,255,.08)',
    color:'white', fontSize:'15px', outline:'none', marginBottom:'12px',
    fontFamily:"'Nunito',sans-serif", boxSizing:'border-box',
  };
  const btnS = (c='#FFE135'): React.CSSProperties => ({
    width:'100%', padding:'12px', borderRadius:'12px', border:'none',
    background:c, color:c==='#FFE135'?'#1E1B2E':'white',
    fontFamily:"'Fredoka One',cursive", fontSize:'16px', cursor:'pointer', marginTop:'4px',
  });

  return (
    <div style={{ width:'100vw', height:'100vh', overflow:'hidden', display:'flex', flexDirection:'column', background:'#1E1B2E' }}>

      {/* ══ BARRA SUPERIOR ══ */}
      <div style={{
        flexShrink:0, height:'44px', minHeight:'44px',
        background:'#16132a', borderBottom:'2px solid rgba(255,225,53,0.3)',
        display:'flex', alignItems:'center', padding:'0 14px', gap:'10px',
        zIndex:9998,
      }}>
        <span style={{ fontFamily:'Fredoka One,cursive', color:'#FFE135', fontSize:'14px', whiteSpace:'nowrap' }}>
          🏘️ Imperio
        </span>
        <div style={{ width:'1px', height:'18px', background:'rgba(255,255,255,0.15)' }} />

        {cloudStatus==='saving' && <span style={{ fontSize:'11px', color:'#FFE135', fontWeight:900 }}>☁️ Guardando...</span>}
        {cloudStatus==='saved'  && <span style={{ fontSize:'11px', color:'#2DC653', fontWeight:900 }}>✅ Guardado</span>}
        {cloudStatus==='error'  && <span style={{ fontSize:'11px', color:'#FF4757', fontWeight:900 }}>❌ Error al guardar</span>}

        <div style={{ flex:1 }} />

        {user ? (
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.7)', fontWeight:700, fontFamily:'Nunito,sans-serif', whiteSpace:'nowrap', maxWidth:'130px', overflow:'hidden', textOverflow:'ellipsis' }}>
              {user.email?.split('@')[0]}
            </span>
            <button onClick={async () => {
              setShowLB(true);
              const [lbData, rank] = await Promise.all([getLeaderboard(), getMyRank()]);
              setLb(lbData); setMyRank(rank);
            }} style={{ background:'rgba(45,198,83,0.2)', border:'1px solid #2DC653', borderRadius:'8px', padding:'5px 10px', cursor:'pointer', color:'#2DC653', fontFamily:'Fredoka One,cursive', fontSize:'12px', whiteSpace:'nowrap' }}>
              🏆 Ranking
            </button>
            {pushStatus!=='unsupported' && pushStatus!=='denied' && (
              <button onClick={async () => {
                if (pushStatus==='granted') { await unsubscribePush(); setPushStatus('default'); }
                else { setPushStatus('loading'); setPushStatus(await subscribePush()); }
              }} style={{ background:pushStatus==='granted'?'rgba(255,225,53,0.2)':'rgba(255,255,255,0.08)', border:`1px solid ${pushStatus==='granted'?'#FFE135':'rgba(255,255,255,0.2)'}`, borderRadius:'8px', padding:'5px 8px', cursor:'pointer', color:pushStatus==='granted'?'#FFE135':'rgba(255,255,255,0.5)', fontSize:'14px' }}>
                {pushStatus==='loading'?'⏳':pushStatus==='granted'?'🔔':'🔕'}
              </button>
            )}
            <button onClick={handleSignOut} style={{ background:'transparent', border:'1px solid rgba(255,71,87,0.5)', borderRadius:'8px', padding:'5px 10px', cursor:'pointer', color:'#FF4757', fontSize:'11px', whiteSpace:'nowrap', fontFamily:'Nunito,sans-serif', fontWeight:700 }}>
              Salir
            </button>
          </div>
        ) : (
          <button onClick={() => { setShowAuth(true); setAuthMode('login'); }} style={{ background:'rgba(255,225,53,0.15)', border:'2px solid rgba(255,225,53,0.6)', borderRadius:'8px', padding:'6px 14px', cursor:'pointer', color:'#FFE135', fontFamily:'Fredoka One,cursive', fontSize:'13px', whiteSpace:'nowrap' }}>
            ☁️ Guardar en la nube
          </button>
        )}
      </div>

      {/* ══ IFRAME ══ */}
      <iframe
        ref={iframeRef}
        src="/game/imperio-del-barrio-v8.html"
        style={{ flex:1, width:'100%', border:'none', display:'block', minHeight:0 }}
        title="Imperio del Barrio"
        allow="autoplay"
      />

      {/* ══ AUTH MODAL ══ */}
      {showAuth && (
        <div style={overlay} onClick={e => e.target===e.currentTarget && setShowAuth(false)}>
          <div style={modal}>
            <div style={{ textAlign:'center', marginBottom:'20px' }}>
              <div style={{ fontSize:'2.5rem' }}>🏘️</div>
              <h2 style={{ fontFamily:'Fredoka One', color:'#FFE135', fontSize:'1.6rem', margin:'4px 0' }}>
                {authMode==='login'?'¡Bienvenido de vuelta!':'¡Únete al Barrio!'}
              </h2>
              <p style={{ color:'#aaa', fontSize:'13px', margin:0 }}>
                {authMode==='login'?'Carga tu progreso desde la nube':'Guarda tu progreso y compite'}
              </p>
            </div>
            <form onSubmit={handleAuth}>
              {authMode==='register' && (
                <>
                  <input style={inp} placeholder="Nombre de jugador" value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))} required />
                  <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'12px', justifyContent:'center' }}>
                    {AVATARS.map(av=>(
                      <button key={av} type="button" onClick={()=>setForm(f=>({...f,avatar:av}))} style={{ fontSize:'1.4rem', padding:'6px 8px', borderRadius:'10px', border:'2px solid', borderColor:form.avatar===av?'#FFE135':'transparent', background:form.avatar===av?'rgba(255,225,53,.15)':'rgba(255,255,255,.05)', cursor:'pointer' }}>{av}</button>
                    ))}
                  </div>
                </>
              )}
              <input style={inp} type="email" placeholder="Correo electrónico" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
              <input style={inp} type="password" placeholder="Contraseña (mín. 6 caracteres)" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required minLength={6} />
              {formErr && <div style={{ background:'rgba(255,71,87,.15)', border:'1px solid #FF4757', borderRadius:'8px', padding:'8px 12px', marginBottom:'12px', color:'#FF4757', fontSize:'13px' }}>⚠️ {formErr}</div>}
              <button type="submit" style={btnS()} disabled={formLoad}>
                {formLoad?'⏳ Cargando...':authMode==='login'?'🚀 Entrar al Barrio':'🏘️ Crear mi Imperio'}
              </button>
            </form>
            <div style={{ textAlign:'center', marginTop:'16px' }}>
              <button onClick={()=>{setAuthMode(m=>m==='login'?'register':'login');setFormErr('');}} style={{ background:'none', border:'none', color:'#FFE135', cursor:'pointer', fontSize:'13px', fontFamily:'Nunito', fontWeight:700 }}>
                {authMode==='login'?'¿Sin cuenta? Regístrate gratis →':'¿Ya tienes cuenta? Inicia sesión →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ LEADERBOARD ══ */}
      {showLB && (
        <div style={overlay} onClick={e=>e.target===e.currentTarget&&setShowLB(false)}>
          <div style={{ ...modal, maxWidth:'560px', maxHeight:'80vh', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
              <div>
                <h2 style={{ fontFamily:'Fredoka One', color:'#FFE135', fontSize:'1.5rem', margin:0 }}>🏆 Ranking del Barrio</h2>
                {myRank && <p style={{ color:'#aaa', fontSize:'12px', margin:'2px 0 0' }}>Tu posición: #{myRank}</p>}
              </div>
              <button onClick={()=>setShowLB(false)} style={{ background:'none', border:'none', color:'#aaa', fontSize:'1.5rem', cursor:'pointer' }}>✕</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'40px 32px 1fr 90px 60px 50px', gap:'8px', padding:'6px 12px', color:'#888', fontSize:'11px', fontWeight:900, textTransform:'uppercase' }}>
              <span>#</span><span></span><span>Jugador</span><span style={{textAlign:'right'}}>Ganado</span><span style={{textAlign:'right'}}>Nivel</span><span style={{textAlign:'right'}}>⭐</span>
            </div>
            <div style={{ overflowY:'auto', flex:1, display:'flex', flexDirection:'column', gap:'4px' }}>
              {lb.length===0 ? (
                <div style={{ textAlign:'center', color:'#555', padding:'40px' }}>Cargando... 🏘️</div>
              ) : [...lb].sort((a,b)=>(b.influence*1e9+b.total_earned)-(a.influence*1e9+a.total_earned)).map((p,i)=>{
                const isMe = user?.email?.startsWith(p.username);
                const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':null;
                const stageIcon = ['','🏠','🏡','🏖️','🏙️','🛩️','🌎'][Math.min(p.social_stage,6)];
                return (
                  <div key={p.username} style={{ display:'grid', gridTemplateColumns:'40px 32px 1fr 90px 60px 50px', gap:'8px', padding:'8px 12px', borderRadius:'10px', alignItems:'center', background:isMe?'rgba(255,225,53,.12)':i<3?'rgba(255,255,255,.04)':'transparent', border:isMe?'1px solid rgba(255,225,53,.3)':'1px solid transparent' }}>
                    <span style={{ fontFamily:'Fredoka One', color:i<3?'#FFE135':'#666', fontSize:'14px' }}>{medal||`#${i+1}`}</span>
                    <span style={{ fontSize:'1.3rem' }}>{p.avatar}</span>
                    <div>
                      <div style={{ color:'white', fontWeight:900, fontSize:'13px' }}>{p.username}</div>
                      <div style={{ color:'#888', fontSize:'10px' }}>{ZONE_NAMES[p.zone]||p.zone}{stageIcon?` · ${stageIcon}`:''}</div>
                    </div>
                    <span style={{ textAlign:'right', fontFamily:'Fredoka One', color:'#2DC653', fontSize:'13px' }}>{fmt(p.total_earned)}</span>
                    <span style={{ textAlign:'right', color:'#aaa', fontSize:'12px', fontWeight:900 }}>Nv.{p.level+1}<br/><span style={{ fontSize:'10px', color:'#666' }}>{LEVEL_NAMES[p.level]||''}</span></span>
                    <span style={{ textAlign:'right', color:p.influence>0?'#FFD700':'#555', fontSize:'13px', fontWeight:900 }}>{p.influence>0?`⭐${p.influence}`:'—'}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign:'center', marginTop:'12px', color:'#555', fontSize:'11px' }}>Ordenado por ⭐ Influencia · Top 100</div>
          </div>
        </div>
      )}
    </div>
  );
}