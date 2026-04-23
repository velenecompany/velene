import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, hashPassword, verifyPassword } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { firstName, lastName, passwordActual, passwordNuevo } = await req.json();

  await query('UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3', [firstName, lastName, user.id]);

  if (passwordActual && passwordNuevo) {
    const dbUser = await query<{password_hash: string}>('SELECT password_hash FROM users WHERE id = $1', [user.id]);
    const valid = await verifyPassword(passwordActual, dbUser[0].password_hash);
    if (!valid) return NextResponse.json({ error: 'Contrasena actual incorrecta' }, { status: 400 });
    const newHash = await hashPassword(passwordNuevo);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, user.id]);
  }

  return NextResponse.json({ data: { updated: true } });
}
