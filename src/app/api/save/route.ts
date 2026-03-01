import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gameState } = body;

    if (!gameState) {
      return NextResponse.json({ error: 'Missing gameState' }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => cookieStore.get(name)?.value,
          set: () => {},
          remove: () => {},
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const G = gameState as Record<string, unknown>;
    const { error } = await supabase
      .from('game_saves')
      .upsert({
        user_id:        user.id,
        money:          Math.floor((G.money as number) || 0),
        total_earned:   Math.floor((G.totalEarned as number) || 0),
        level:          (G.level as number) || 0,
        prestige_stars: (G.prestigeStars as number) || 0,
        prestige_mult:  (G.prestigeMult as number) || 1,
        zone:           (G.zone as string) || 'centro',
        game_state:     G,
        save_version:   1,
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('[Save API]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
