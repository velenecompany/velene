import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  const { items, email, nombre, apellido, direccion, ciudad, cp } = await req.json();

  const line_items = items.map((item: any) => ({
    price_data: {
      currency: 'mxn',
      product_data: { name: item.nombre },
      unit_amount: Math.round(item.precio * 100),
    },
    quantity: item.cantidad,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'https://velene.vercel.app/checkout?success=true',
    cancel_url: 'https://velene.vercel.app/cart',
    customer_email: email,
    metadata: { nombre, apellido, direccion, ciudad, cp, items: JSON.stringify(items) },
  });

  return NextResponse.json({ url: session.url });
}
