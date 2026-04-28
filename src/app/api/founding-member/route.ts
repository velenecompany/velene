import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email, nombre } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 });

  const count = await queryOne<{count: string}>('SELECT COUNT(*) as count FROM founding_members');
  if (parseInt(count?.count || '0') >= 25) {
    return NextResponse.json({ error: 'Los 25 spots ya están ocupados' }, { status: 400 });
  }

  const existing = await queryOne('SELECT id FROM founding_members WHERE email = $1', [email]);
  if (existing) return NextResponse.json({ error: 'Este email ya está registrado' }, { status: 409 });

  await query('INSERT INTO founding_members (email, nombre) VALUES ($1, $2)', [email, nombre]);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const count = await queryOne<{count: string}>('SELECT COUNT(*) as count FROM founding_members');
  return NextResponse.json({ spots_taken: parseInt(count?.count || '0') });
}
