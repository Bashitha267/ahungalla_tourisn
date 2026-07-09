import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const getSecret = () =>
  new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production'
  );

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return NextResponse.json({ success: true, user: payload });
  } catch {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
