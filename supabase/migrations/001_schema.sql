-- ══════════════════════════════════════════════════════════
-- IMPERIO DEL BARRIO — Database Schema
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT UNIQUE NOT NULL,
  avatar        TEXT DEFAULT '😎',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  last_seen     TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'Jugador_' || substring(NEW.id::text, 1, 6)),
    COALESCE(NEW.raw_user_meta_data->>'avatar', '😎')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─────────────────────────────────────────
-- GAME SAVES
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS game_saves (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Core stats (indexed for leaderboard)
  money         BIGINT DEFAULT 0,
  total_earned  BIGINT DEFAULT 0,
  level         INT DEFAULT 0,
  prestige_stars INT DEFAULT 0,
  prestige_mult  NUMERIC(6,3) DEFAULT 1.0,
  
  -- Zone
  zone          TEXT DEFAULT 'centro',
  
  -- Full game state (JSON blob)
  game_state    JSONB NOT NULL DEFAULT '{}',
  
  -- Metadata
  save_version  INT DEFAULT 1,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS game_saves_updated_at ON game_saves;
CREATE TRIGGER game_saves_updated_at
  BEFORE UPDATE ON game_saves
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────
-- LEADERBOARD (materialized from game_saves)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leaderboard (
  user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT NOT NULL,
  avatar        TEXT DEFAULT '😎',
  money         BIGINT DEFAULT 0,
  total_earned  BIGINT DEFAULT 0,
  level         INT DEFAULT 0,
  prestige_stars INT DEFAULT 0,
  zone          TEXT DEFAULT 'centro',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast ranking queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_total_earned ON leaderboard(total_earned DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_level ON leaderboard(level DESC);

-- Auto-sync leaderboard when game_saves updates
CREATE OR REPLACE FUNCTION sync_leaderboard()
RETURNS TRIGGER AS $$
DECLARE
  v_username TEXT;
  v_avatar   TEXT;
BEGIN
  SELECT username, avatar INTO v_username, v_avatar
  FROM profiles WHERE id = NEW.user_id;

  INSERT INTO leaderboard (user_id, username, avatar, money, total_earned, level, prestige_stars, zone, updated_at)
  VALUES (NEW.user_id, COALESCE(v_username, 'Jugador'), COALESCE(v_avatar, '😎'),
          NEW.money, NEW.total_earned, NEW.level, NEW.prestige_stars, NEW.zone, NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    username      = EXCLUDED.username,
    avatar        = EXCLUDED.avatar,
    money         = EXCLUDED.money,
    total_earned  = EXCLUDED.total_earned,
    level         = EXCLUDED.level,
    prestige_stars = EXCLUDED.prestige_stars,
    zone          = EXCLUDED.zone,
    updated_at    = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS sync_leaderboard_trigger ON game_saves;
CREATE TRIGGER sync_leaderboard_trigger
  AFTER INSERT OR UPDATE ON game_saves
  FOR EACH ROW EXECUTE FUNCTION sync_leaderboard();

-- ─────────────────────────────────────────
-- ACHIEVEMENTS LOG (optional: for analytics)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS achievement_log (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ach_id     TEXT NOT NULL,
  earned_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ach_id)
);

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_saves    ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard   ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_log ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only owner can update
CREATE POLICY "profiles_read"   ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Game saves: only owner can read/write
CREATE POLICY "saves_select" ON game_saves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saves_insert" ON game_saves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saves_update" ON game_saves FOR UPDATE USING (auth.uid() = user_id);

-- Leaderboard: public read, only sync function can write
CREATE POLICY "lb_read" ON leaderboard FOR SELECT USING (true);

-- Achievement log: owner only
CREATE POLICY "ach_select" ON achievement_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ach_insert" ON achievement_log FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- USEFUL VIEWS
-- ─────────────────────────────────────────

-- Top 100 ranked players
CREATE OR REPLACE VIEW leaderboard_ranked AS
SELECT
  ROW_NUMBER() OVER (ORDER BY total_earned DESC) AS rank,
  user_id, username, avatar,
  money, total_earned, level, prestige_stars, zone,
  updated_at
FROM leaderboard
ORDER BY total_earned DESC
LIMIT 100;

-- ══════════════════════════════════════════════════════════
-- DONE! Now go to Supabase Dashboard > Authentication
-- and enable Email provider (+ Google/Discord optional)
-- ══════════════════════════════════════════════════════════
