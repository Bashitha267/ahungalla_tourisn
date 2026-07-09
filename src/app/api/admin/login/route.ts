import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const getSecret = () =>
  new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production'
  );

export async function POST(req: NextRequest) {
  // ── 1. Validate environment variables ────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // The URL must start with https:// not sb_publishable_
  const urlOk = supabaseUrl?.startsWith('https://');
  const keyOk = serviceKey && serviceKey !== 'your_supabase_service_role_key';

  if (!urlOk || !keyOk) {
    const hint = !urlOk
      ? 'NEXT_PUBLIC_SUPABASE_URL must be your Project URL (https://xxxx.supabase.co)'
      : 'SUPABASE_SERVICE_ROLE_KEY is missing or still a placeholder';
    console.error('[Admin Login] Configuration error:', hint);
    return NextResponse.json(
      { error: `Server configuration error: ${hint}` },
      { status: 500 }
    );
  }

  // ── 2. Parse request body ─────────────────────────────────────────────────
  let username: string;
  let password: string;
  try {
    const body = await req.json();
    username = (body.username || '').trim().toLowerCase();
    password = body.password || '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  // ── 3. Query admin_users via service-role client ──────────────────────────
  try {
    const supabase = createClient(supabaseUrl!, serviceKey!, {
      auth: { persistSession: false },
    });

    const { data: user, error: dbError } = await supabase
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .maybeSingle();            // maybeSingle → returns null instead of throwing when 0 rows

    if (dbError) {
      console.error('[Admin Login] DB error:', dbError.message);
      // Table might not exist yet — give a helpful message
      if (dbError.message.includes('does not exist') || dbError.code === '42P01') {
        return NextResponse.json(
          { error: 'admin_users table not found. Run the SQL setup in Supabase first.' },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: 'Database error: ' + dbError.message }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // ── 4. Compare password ───────────────────────────────────────────────
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // ── 5. Issue JWT cookie ───────────────────────────────────────────────
    const token = await new SignJWT({ userId: user.id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(getSecret());

    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return res;

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Admin Login] Unexpected error:', message);
    return NextResponse.json({ error: 'Unexpected server error: ' + message }, { status: 500 });
  }
}
