import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email, nombre, apellido, direccion, ciudad, cp, items, total } = await req.json();

  const orderNumber = 'VL-' + Date.now().toString().slice(-6);

  await query(
    `INSERT INTO orders (order_number, email, status, shipping_address, subtotal_mxn, total_mxn)
     VALUES ($1, $2, 'confirmed', $3, $4, $4)`,
    [
      orderNumber,
      email,
      JSON.stringify({ nombre, apellido, direccion, ciudad, cp }),
      total,
    ]
  );

  return NextResponse.json({ data: { orderNumber } });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 });

  const orders = await query(
    `SELECT order_number, status, total_mxn, created_at, shipping_address
     FROM orders WHERE email = $1 ORDER BY created_at DESC`,
    [email]
  );

  return NextResponse.json({ data: orders });
}
