import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// GET — consulta estado de un drop
export async function GET(req: NextRequest) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    if (!slug) return NextResponse.json({ error: 'Falta slug' }, { status: 400 });

    const { rows } = await pool.query(
      'SELECT * FROM drops WHERE slug = $1',
      [slug]
    );

    if (!rows.length) return NextResponse.json({ error: 'Drop no encontrado' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  } finally {
    await pool.end();
  }
}

// PATCH — activa una fase del drop (solo desde admin)
export async function PATCH(req: NextRequest) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const adminKey = req.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { slug, apex_active, drive_active, pace_active, public_active } = await req.json();

    await pool.query(
      `UPDATE drops SET
        apex_active = COALESCE($1, apex_active),
        drive_active = COALESCE($2, drive_active),
        pace_active = COALESCE($3, pace_active),
        public_active = COALESCE($4, public_active)
       WHERE slug = $5`,
      [apex_active, drive_active, pace_active, public_active, slug]
    );

    const { rows } = await pool.query('SELECT * FROM drops WHERE slug = $1', [slug]);
    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  } finally {
    await pool.end();
  }
}