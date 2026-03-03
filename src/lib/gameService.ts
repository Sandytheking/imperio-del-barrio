/**
 * gameService.ts
 * All Supabase interactions for Imperio del Barrio
 */

import { getSupabase, GameSave, LeaderboardEntry } from './supabase';

const SAVE_VERSION = 1;

// ══════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════

export async function signUp(email: string, password: string, username: string, avatar = '😎') {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      data: { username, avatar },
    },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const sb = getSupabase();
  await sb.auth.signOut();
}

export async function getUser() {
  const sb = getSupabase();
  const { data } = await sb.auth.getUser();
  return data.user;
}

export function onAuthChange(callback: (user: unknown) => void) {
  const sb = getSupabase();
  return sb.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}

// ══════════════════════════════════════════════
// SAVE GAME
// ══════════════════════════════════════════════

/**
 * Saves the full game state G to Supabase.
 * Also updates the indexed columns for fast leaderboard queries.
 * Falls back silently — never blocks gameplay.
 */
export async function saveToCloud(G: Record<string, unknown>): Promise<boolean> {
  try {
    const user = await getUser();
    if (!user) return false;

    const sb = getSupabase();
    const { error } = await sb
      .from('game_saves')
      .upsert({
        user_id:       user.id,
        money:         Math.floor((G.money as number) || 0),
        total_earned:  Math.floor((G.totalEarned as number) || 0),
        level:         (G.level as number) || 0,
        prestige_stars:(G.prestigeStars as number) || 0,
        prestige_mult: (G.prestigeMult as number) || 1,
        zone:          (G.zone as string) || 'centro',
        // Influencia — columnas nuevas (requiere migración 002)
        social_stage:  (G.socialStage as number) || 0,
        influence:     Math.floor((G.totalInfluence as number) || 0),
        guild_code:    (G.guildCode as string) || null,
        game_state:    G,
        save_version:  SAVE_VERSION,
      }, { onConflict: 'user_id' });

    if (error) {
      // Si las columnas aún no existen, guardar sin ellas (fallback seguro)
      if (error.message?.includes('social_stage') || error.message?.includes('influence')) {
        const { error: error2 } = await sb
          .from('game_saves')
          .upsert({
            user_id:       user.id,
            money:         Math.floor((G.money as number) || 0),
            total_earned:  Math.floor((G.totalEarned as number) || 0),
            level:         (G.level as number) || 0,
            prestige_stars:(G.prestigeStars as number) || 0,
            prestige_mult: (G.prestigeMult as number) || 1,
            zone:          (G.zone as string) || 'centro',
            game_state:    G,
            save_version:  SAVE_VERSION,
          }, { onConflict: 'user_id' });
        if (error2) { console.warn('[Imperio] Cloud save failed:', error2.message); return false; }
      } else {
        console.warn('[Imperio] Cloud save failed:', error.message);
        return false;
      }
    }
    return true;
  } catch (e) {
    console.warn('[Imperio] Cloud save error:', e);
    return false;
  }
}

// ══════════════════════════════════════════════
// LOAD GAME
// ══════════════════════════════════════════════

/**
 * Loads the game state from Supabase.
 * Returns null if not found or not logged in.
 */
export async function loadFromCloud(): Promise<Record<string, unknown> | null> {
  try {
    const user = await getUser();
    if (!user) return null;

    const sb = getSupabase();
    const { data, error } = await sb
      .from('game_saves')
      .select('game_state, updated_at')
      .eq('user_id', user.id)
      .single();

    if (error || !data) return null;
    return data.game_state as Record<string, unknown>;
  } catch (e) {
    console.warn('[Imperio] Cloud load error:', e);
    return null;
  }
}

// ══════════════════════════════════════════════
// LEADERBOARD
// ══════════════════════════════════════════════

/** Fetch top 100 players ranked by total_earned */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('leaderboard_ranked')
      .select('*')
      .limit(100);

    if (error || !data) return [];
    return data as LeaderboardEntry[];
  } catch (e) {
    console.warn('[Imperio] Leaderboard error:', e);
    return [];
  }
}

/** Get the current user's rank */
export async function getMyRank(): Promise<number | null> {
  try {
    const user = await getUser();
    if (!user) return null;

    const sb = getSupabase();
    const { data } = await sb
      .from('leaderboard_ranked')
      .select('rank')
      .eq('user_id', user.id)
      .single();

    return (data as { rank: number } | null)?.rank ?? null;
  } catch {
    return null;
  }
}

// ══════════════════════════════════════════════
// SYNC STRATEGY: Local-first with cloud backup
// ══════════════════════════════════════════════

/**
 * Smart load: tries cloud first, merges with localStorage.
 * Elige el save con más progreso (totalEarned).
 * PROTEGE la Influencia — siempre conserva el valor más alto de cualquier save.
 */
export async function smartLoad(): Promise<{ state: Record<string, unknown>; source: 'cloud' | 'local' | 'new' }> {
  // 1. Cargar localStorage (rápido, sin red)
  let localState: Record<string, unknown> | null = null;
  try {
    const raw = localStorage.getItem('idb2_save');
    if (raw) localState = JSON.parse(raw);
  } catch { /* ignore */ }

  // 2. Intentar nube
  const cloudState = await loadFromCloud();

  // 3. Elegir el mejor save y proteger influencia
  if (cloudState && localState) {
    const cloudEarned = (cloudState.totalEarned as number) || 0;
    const localEarned = (localState.totalEarned as number) || 0;

    // Base: el que tiene más dinero ganado
    let base: Record<string, unknown>;
    let source: 'cloud' | 'local';
    if (cloudEarned >= localEarned) {
      base = cloudState;
      source = 'cloud';
    } else {
      base = localState;
      source = 'local';
    }

    // SIEMPRE preservar el MAYOR valor de influencia entre ambos saves
    // (el jugador no debe perder influencia al cambiar de dispositivo)
    const cloudInfluence      = (cloudState.influence as number) || 0;
    const localInfluence      = (localState.influence as number) || 0;
    const cloudTotalInfluence = (cloudState.totalInfluence as number) || 0;
    const localTotalInfluence = (localState.totalInfluence as number) || 0;
    const cloudStage          = (cloudState.socialStage as number) || 0;
    const localStage          = (localState.socialStage as number) || 0;

    if (localInfluence > cloudInfluence || localStage > cloudStage) {
      base = {
        ...base,
        influence:         Math.max(cloudInfluence, localInfluence),
        totalInfluence:    Math.max(cloudTotalInfluence, localTotalInfluence),
        socialStage:       Math.max(cloudStage, localStage),
        // Unión de influenceUpgrades — conservar todo lo comprado
        influenceUpgrades: {
          ...((cloudState.influenceUpgrades as Record<string, boolean>) || {}),
          ...((localState.influenceUpgrades as Record<string, boolean>) || {}),
        },
      };
    }

    // Actualizar localStorage con el mejor estado fusionado
    localStorage.setItem('idb2_save', JSON.stringify(base));
    return { state: base, source };
  }

  if (cloudState) return { state: cloudState, source: 'cloud' };
  if (localState) return { state: localState, source: 'local' };
  return { state: {}, source: 'new' };
}

/**
 * Full save: writes to both localStorage AND cloud.
 * Cloud save is non-blocking (fire & forget).
 */
export function smartSave(G: Record<string, unknown>) {
  // Always save locally first (instant, no network needed)
  try {
    localStorage.setItem('idb2_save', JSON.stringify({ ...G, lastSave: Date.now() }));
  } catch { /* ignore */ }

  // Cloud save async (don't await — never block the game)
  saveToCloud(G).catch(() => { /* silent fail */ });
  // Sync guild stats async
  syncGuildMember(G).catch(() => { /* silent fail */ });
}

// ══════════════════════════════════════════════
// GUILD SYSTEM
// ══════════════════════════════════════════════

import type { Guild, GuildMember, GuildLeaderboardEntry } from './supabase';

/**
 * Crea un clan nuevo. El código se genera en el cliente y se verifica
 * que sea único en la DB antes de insertarlo.
 */
export async function createGuild(
  name: string,
  emoji: string,
  code: string
): Promise<Guild> {
  const user = await getUser();
  if (!user) throw new Error('Debes iniciar sesión para crear un clan');

  const sb = getSupabase();
  const { data, error } = await sb
    .from('guilds')
    .insert({ name, emoji, code, owner_id: user.id })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') throw new Error('Ese código ya existe, intenta otro nombre');
    throw error;
  }
  return data as Guild;
}

/**
 * Busca un clan por código de invitación.
 */
export async function findGuildByCode(code: string): Promise<Guild | null> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('guilds')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();

  if (error || !data) return null;
  return data as Guild;
}

/**
 * Une al usuario actual al clan con ese guild_id.
 * Actualiza game_saves.guild_code también.
 */
export async function joinGuild(
  guildId: string,
  guildCode: string,
  G: Record<string, unknown>
): Promise<void> {
  const user = await getUser();
  if (!user) throw new Error('Debes iniciar sesión');

  const sb = getSupabase();

  // Upsert membership
  const { error: memberError } = await sb
    .from('guild_members')
    .upsert({
      guild_id:     guildId,
      user_id:      user.id,
      username:     (G.companyName as string) || 'Jugador',
      avatar:       (G.avatar as string) || '😎',
      total_earned: Math.floor((G.totalEarned as number) || 0),
      level:        (G.level as number) || 0,
      social_stage: (G.socialStage as number) || 0,
      influence:    Math.floor((G.totalInfluence as number) || 0),
      last_seen:    new Date().toISOString(),
    }, { onConflict: 'guild_id,user_id' });

  if (memberError) throw memberError;

  // Save guild_code to game_saves
  await sb
    .from('game_saves')
    .update({ guild_code: guildCode })
    .eq('user_id', user.id);
}

/**
 * Sincroniza las stats del jugador en su clan.
 * Llamar junto con saveToCloud().
 */
export async function syncGuildMember(G: Record<string, unknown>): Promise<void> {
  try {
    const user = await getUser();
    if (!user) return;

    const guildCode = G.guildCode as string | null;
    if (!guildCode) return;

    const guild = await findGuildByCode(guildCode);
    if (!guild) return;

    const sb = getSupabase();
    await sb
      .from('guild_members')
      .upsert({
        guild_id:     guild.id,
        user_id:      user.id,
        username:     (G.companyName as string) || 'Jugador',
        avatar:       (G.avatar as string) || '😎',
        total_earned: Math.floor((G.totalEarned as number) || 0),
        level:        (G.level as number) || 0,
        social_stage: (G.socialStage as number) || 0,
        influence:    Math.floor((G.totalInfluence as number) || 0),
        last_seen:    new Date().toISOString(),
      }, { onConflict: 'guild_id,user_id' });
  } catch (e) {
    console.warn('[Imperio] Guild sync error:', e);
  }
}

/**
 * Obtiene los miembros del clan ordenados por total_earned.
 */
export async function getGuildMembers(guildId: string): Promise<GuildMember[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('guild_members')
    .select('*')
    .eq('guild_id', guildId)
    .order('total_earned', { ascending: false })
    .limit(20);

  if (error || !data) return [];
  return data as GuildMember[];
}

/**
 * Leaderboard global de clanes por total_earned.
 */
export async function getGuildLeaderboard(): Promise<GuildLeaderboardEntry[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('guild_leaderboard')
    .select('*')
    .limit(50);

  if (error || !data) return [];
  return data as GuildLeaderboardEntry[];
}

/**
 * Sale del clan actual.
 */
export async function leaveGuild(guildId: string): Promise<void> {
  const user = await getUser();
  if (!user) return;

  const sb = getSupabase();
  await sb
    .from('guild_members')
    .delete()
    .eq('guild_id', guildId)
    .eq('user_id', user.id);

  await sb
    .from('game_saves')
    .update({ guild_code: null })
    .eq('user_id', user.id);
}

// ══════════════════════════════════════════════
// PUSH NOTIFICATIONS
// ══════════════════════════════════════════════

const VAPID_PUBLIC_KEY = 'BKuRMZlUR0zNVo7Fn9AJJzTy-FhUeSuK8ayYBkBXc9zw8wVO49PwLwN1LB_VRA1B5c_j05t9I51Ay4QKjPRg-Us';

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const pad = '='.repeat((4 - base64.length % 4) % 4);
  const b64 = (base64 + pad).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from({ length: raw.length }, (_, i) => raw.charCodeAt(i));
}

/** Register SW, ask permission, subscribe to push, save to Supabase. */
export async function subscribePush(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return 'unsupported';

  // 1. Register SW
  const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  await navigator.serviceWorker.ready;

  // 2. Ask permission
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') return 'denied';

  // 3. Subscribe to push
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  // 4. Save subscription to Supabase
  const user = await getUser();
  if (!user) return 'denied';

  const key  = sub.getKey('p256dh');
  const auth = sub.getKey('auth');
  if (!key || !auth) return 'unsupported';

  const sb = getSupabase();
  await sb.from('push_subscriptions').upsert({
    user_id:    user.id,
    endpoint:   sub.endpoint,
    p256dh:     btoa(String.fromCharCode(...new Uint8Array(key)))
                  .replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
    auth_key:   btoa(String.fromCharCode(...new Uint8Array(auth)))
                  .replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
    user_agent: navigator.userAgent.slice(0, 200),
  }, { onConflict: 'user_id,endpoint' });

  return 'granted';
}

/** Unsubscribe and remove from Supabase. */
export async function unsubscribePush(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;

  const user = await getUser();
  if (user) {
    const sb = getSupabase();
    await sb.from('push_subscriptions').delete()
      .eq('user_id', user.id).eq('endpoint', sub.endpoint);
  }
  await sub.unsubscribe();
}

/** Check current push permission state. */
export async function getPushStatus(): Promise<'granted' | 'denied' | 'default' | 'unsupported'> {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return 'unsupported';
  return Notification.permission as 'granted' | 'denied' | 'default';
}

/**
 * Trigger a push to specific users (called server-side or from admin).
 * In production this would be a server action — here it calls the Edge Function.
 */
export async function sendPushToUser(
  userIds: string[],
  title: string,
  body: string,
  url = '/'
): Promise<void> {
  const sb = getSupabase();
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return;

  await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-push`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ user_ids: userIds, title, body, url }),
  });
}