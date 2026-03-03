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
}