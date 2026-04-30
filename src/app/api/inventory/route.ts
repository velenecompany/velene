import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET(req: NextRequest) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    if (!slug) return NextResponse.json({ error: 'Falta slug' }, { status: 400 });

    const { rows } = await pool.query(
      `SELECT size, stock FROM product_variants WHERE sku LIKE $1 ORDER BY size`,
      [slug + '-%']
    );

    const inventory: Record<string, number> = {};
    for (const row of rows) {
      inventory[row.size] = parseInt(row.stock);
    }

    return NextResponse.json(inventory);
  } catch (err: any) {
    console.error('Inventory API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  } finally {
    await pool.end();
  }
}