import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { code, total } = await req.json();
  if (!code) return NextResponse.json({ error: 'Codigo requerido' }, { status: 400 });

  const coupon = await queryOne<{ code: string; discount_percent: number; used_count: number }>(
    'SELECT code, discount_percent, used_count FROM coupons WHERE UPPER(code) = UPPER($1)',
    [code]
  );

  if (!coupon) return NextResponse.json({ error: 'Codigo invalido' }, { status: 404 });

  const descuento = Math.round(total * coupon.discount_percent / 100);
  const totalFinal = total - descuento;

  return NextResponse.json({
    valid: true,
    code: coupon.code,
    discount_percent: coupon.discount_percent,
    descuento,
    totalFinal,
  });
}
