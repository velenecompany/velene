import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

const PRICE_IDS: Record<string, string> = {
  Pace: 'price_1TR05IHvSN1KsVhF6iDbFtsj',
  Drive: 'price_1TR05dHvSN1KsVhFi3PmIG7Y',
  Apex: 'price_1TR05vHvSN1KsVhF2nEdvGcR',
};

export async function POST(req: NextRequest) {
  const { tier } = await req.json();
  const priceId = PRICE_IDS[tier];
  if (!priceId) return NextResponse.json({ error: 'Tier inválido' }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?membership=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership`,
  });

  return NextResponse.json({ url: session.url });
}
