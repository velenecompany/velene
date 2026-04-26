import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  const { items, email, nombre, apellido, direccion, ciudad, cp } = await req.json();

  const line_items = items.map((item: { nombre: string; precio: number; cantidad: number; imagen: string }) => ({
    price_data: {
      currency: 'mxn',
      product_data: {
        name: item.nombre,
        images: item.imagen ? [`https://velene.vercel.app${item.imagen}`] : [],
      },
      unit_amount: Math.round(item.precio * 100),
    },
    quantity: item.cantidad,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    customer_email: email,
    metadata: {
      nombre,
      apellido,
      direccion,
      ciudad,
      cp,
      items: JSON.stringify(items),
    },
    shipping_options: [
      { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'mxn' }, display_name: 'Envío gratis' } }
    ],
  });

  return NextResponse.json({ url: session.url });
}
ENDOFFIcat > /Users/alainherrera/Desktop/vela/public-site/src/app/api/checkout/route.ts << 'ENDOFFILE'
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  const { items, email, nombre, apellido, direccion, ciudad, cp } = await req.json();

  const line_items = items.map((item: { nombre: string; precio: number; cantidad: number; imagen: string }) => ({
    price_data: {
      currency: 'mxn',
      product_data: {
        name: item.nombre,
        images: item.imagen ? [`https://velene.vercel.app${item.imagen}`] : [],
      },
      unit_amount: Math.round(item.precio * 100),
    },
    quantity: item.cantidad,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    customer_email: email,
    metadata: {
      nombre,
      apellido,
      direccion,
      ciudad,
      cp,
      items: JSON.stringify(items),
    },
    shipping_options: [
      { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'mxn' }, display_name: 'Envío gratis' } }
    ],
  });

  return NextResponse.json({ url: session.url });
}
