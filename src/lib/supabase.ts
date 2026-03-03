import { createBrowserClient } from '@supabase/ssr';

// Singleton pattern — one client for the whole app
let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabase() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return client;
}

// ── Types matching the DB schema ──────────────────────────
export interface GameSave {
  user_id: string;
  money: number;
  total_earned: number;
  level: number;
  prestige_stars: number;
  prestige_mult: number;
  zone: string;
  social_stage: number;   // Etapa Ascenso Social (0-6)
  influence: number;      // Total influencia acumulada
  game_state: Record<string, unknown>;
  updated_at?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar: string;
  money: number;
  total_earned: number;
  level: number;
  prestige_stars: number;
  zone: string;
  social_stage: number;
  influence: number;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar: string;
  last_seen: string;
}

export interface Guild {
  id: string;
  code: string;
  name: string;
  emoji: string;
  owner_id: string;
  total_earned: number;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface GuildMember {
  id: string;
  guild_id: string;
  user_id: string;
  username: string;
  avatar: string;
  total_earned: number;
  level: number;
  social_stage: number;
  influence: number;
  joined_at: string;
  last_seen: string;
}

export interface GuildLeaderboardEntry {
  rank: number;
  id: string;
  code: string;
  name: string;
  emoji: string;
  total_earned: number;
  member_count: number;
  updated_at: string;
}