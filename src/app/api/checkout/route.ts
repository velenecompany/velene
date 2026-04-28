import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  const { items, email, nombre, apellido, direccion, ciudad, cp, coupon_code, descuento } = await req.json();

  const subtotal = items.reduce((a: number, i: any) => a + i.precio * i.cantidad, 0);
  const total = subtotal - (descuento || 0);

  const line_items = items.map((item: any) => ({
    price_data: {
      currency: 'mxn',
      product_data: { name: item.nombre },
      unit_amount: Math.round(item.precio * 100),
    },
    quantity: item.cantidad,
  }));

  const sessionData: any = {
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'https://velene.vercel.app/checkout?success=true',
    cancel_url: 'https://velene.vercel.app/cart',
    customer_email: email,
    metadata: {
      nombre, apellido, direccion, ciudad, cp,
      items: JSON.stringify(items),
      coupon_code: coupon_code || '',
    },
  };

  if (descuento && descuento > 0) {
    const couponStripe = await stripe.coupons.create({
      amount_off: Math.round(descuento * 100),
      currency: 'mxn',
      name: coupon_code || 'Descuento',
      max_redemptions: 1,
    });
    sessionData.discounts = [{ coupon: couponStripe.id }];
  }

  const session = await stripe.checkout.sessions.create(sessionData);
  return NextResponse.json({ url: session.url });
}
