import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword, signToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const exists = await queryOne('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
  if (exists) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  const hash = await hashPassword(password);
  const [user] = await query<{id: string}>(
    'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1,$2,$3,$4) RETURNING id',
    [email.toLowerCase(), hash, firstName ?? null, lastName ?? null]
  );
  const token = signToken({ sub: user.id, email: email.toLowerCase(), type: 'user' });
  setSessionCookie(token);
  return NextResponse.json({ data: { userId: user.id } }, { status: 201 });
}
