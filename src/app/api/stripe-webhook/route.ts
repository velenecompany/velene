import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { withTransaction } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[Webhook] Signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession;
    await fulfillOrder(session);
  }

  return NextResponse.json({ received: true });
}

async function fulfillOrder(session: Stripe.CheckoutSession) {
  if (session.payment_status !== 'paid') return;

  const { email, user_id, items: itemsJson, coupon_code } = session.metadata!;
  const items = JSON.parse(itemsJson);
  const total = (session.amount_total || 0) / 100;
  const subtotal = items.reduce((s: number, i: { unit_price: number; quantity: number }) =>
    s + i.unit_price * i.quantity, 0);

  try {
    await withTransaction(async (client) => {
      // 1. Upsert customer
      const { rows: [customer] } = await client.query(
        `INSERT INTO customers (email) VALUES ($1)
         ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
         RETURNING id`,
        [email]
      );

      // 2. Generate order number
      const { rows: [{ order_number }] } = await client.query(
        'SELECT generate_order_number() AS order_number'
      );

      // 3. Create order
      const { rows: [order] } = await client.query(
        `INSERT INTO orders (
          order_number, customer_id, user_id, status, payment_status,
          payment_method, stripe_payment_id, stripe_session_id,
          subtotal, discount_amount, shipping_cost, tax_amount, total,
          currency, coupon_code
        ) VALUES ($1,$2,$3,'confirmed','paid','stripe',$4,$5,$6,$7,$8,$9,$10,'MXN',$11)
        RETURNING id`,
        [
          order_number,
          customer.id,
          user_id || null,
          session.payment_intent,
          session.id,
          subtotal,
          subtotal - total,
          0,
          0,
          total,
          coupon_code || null,
        ]
      );

      // 4. Insert order items + decrement stock
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, variant_id, product_name, variant_sku, size, quantity, unit_price, total_price)
           SELECT $1, $2, $3, $4, pv.sku, pv.size, $5, $6, $7
           FROM product_variants pv WHERE pv.id = $3`,
          [order.id, item.product_id, item.variant_id, item.product_name, item.quantity, item.unit_price, item.unit_price * item.quantity]
        );

        // Decrement stock
        await client.query(
          'UPDATE product_variants SET stock = GREATEST(stock - $1, 0) WHERE id = $2',
          [item.quantity, item.variant_id]
        );
      }

      // 5. Update coupon usage
      if (coupon_code) {
        await client.query(
          'UPDATE coupons SET used_count = used_count + 1 WHERE code = $1',
          [coupon_code.toUpperCase()]
        );
      }

      console.log(`[Webhook] Order ${order_number} fulfilled for ${email}`);
    });
  } catch (err) {
    console.error('[Webhook] Order fulfillment failed', err);
    throw err; // Stripe will retry
  }
}
