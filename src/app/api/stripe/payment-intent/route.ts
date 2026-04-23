import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  const { totalMxn } = await req.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalMxn * 100),
    currency: 'mxn',
    automatic_payment_methods: { enabled: true },
  });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
