import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collection = searchParams.get('collection');
  const gender = searchParams.get('gender');
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '12');
  const offset = (page - 1) * limit;

  const conditions = ['p.is_active = true'];
  const params: unknown[] = [];

  if (collection) { params.push(collection); conditions.push(`c.slug = $${params.length}`); }
  if (gender && gender !== 'all') { params.push(gender); conditions.push(`p.gender = $${params.length}`); }

  const where = conditions.join(' AND ');

  const products = await query(
    `SELECT p.*, 
       json_agg(json_build_object('id', v.id, 'sku', v.sku, 'size', v.size, 'color', v.color, 'colorHex', v.color_hex,
         'available', (i.quantity - i.reserved))) FILTER (WHERE v.id IS NOT NULL) AS variants
     FROM products p
     LEFT JOIN collections c ON p.collection_id = c.id
     LEFT JOIN variants v ON v.product_id = p.id
     LEFT JOIN inventory i ON i.variant_id = v.id
     WHERE ${where}
     GROUP BY p.id
     ORDER BY p.is_featured DESC, p.created_at DESC
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  const [{ count }] = await query(
    `SELECT COUNT(*) FROM products p LEFT JOIN collections c ON p.collection_id = c.id WHERE ${where}`,
    params
  );

  return NextResponse.json({
    data: products,
    pagination: { page, limit, total: parseInt(count as string), pages: Math.ceil(parseInt(count as string) / limit) }
  });
}
