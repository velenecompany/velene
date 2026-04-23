import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { verifyPassword, signToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  const user = await queryOne<{id: string; email: string; password_hash: string}>(
    'SELECT id, email, password_hash FROM users WHERE email = $1', [email.toLowerCase()]
  );
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
  const token = signToken({ sub: user.id, email: user.email, type: 'user' });
  setSessionCookie(token);
  return NextResponse.json({ data: { userId: user.id } });
}
