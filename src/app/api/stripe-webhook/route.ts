import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import db, { withTransaction } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

function getTier(total: number): string | null {
  if (total >= 7500) return 'Apex';
  if (total >= 5000) return 'Drive';
  if (total >= 2500) return 'Pace';
  return null;
}

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
    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillOrder(session);
  }

  return NextResponse.json({ received: true });
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  if (session.payment_status !== 'paid') return;

  const { email, nombre, apellido, direccion, ciudad, cp, items: itemsJson, coupon_code } = session.metadata!;
  const items = JSON.parse(itemsJson);
  const total = (session.amount_total || 0) / 100;
  const subtotal = items.reduce((s: number, i: { unit_price: number; quantity: number }) =>
    s + i.unit_price * i.quantity, 0);

  try {
    await withTransaction(async (client) => {
      // 1. Upsert customer
      const { rows: [customer] } = await client.query(
        'INSERT INTO customers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING id',
        [email]
      );

      // 2. Generate order number
      const { rows: [{ order_number }] } = await client.query(
        'SELECT generate_order_number() AS order_number'
      );

      // 3. Create order
      const { rows: [order] } = await client.query(
        `INSERT INTO orders (
          order_number, customer_id, status, payment_status,
          payment_method, stripe_payment_id, stripe_session_id,
          subtotal, discount_amount, shipping_cost, tax_amount, total,
          currency, coupon_code, email, shipping_address
        ) VALUES ($1,$2,'confirmed','paid','stripe',$3,$4,$5,$6,0,0,$7,'MXN',$8,$9,$10)
        RETURNING id`,
        [
          order_number,
          customer.id,
          session.payment_intent,
          session.id,
          subtotal,
          subtotal - total,
          total,
          coupon_code || null,
          email,
          JSON.stringify({ nombre, apellido, direccion, ciudad, cp }),
        ]
      );

      // 4. Insert order items
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price)
           VALUES ($1, $2, $3, $4, $5)`,
          [order.id, item.nombre, item.cantidad, item.precio, item.precio * item.cantidad]
        );
      }

      // 5. Update coupon usage
      if (coupon_code) {
        await client.query(
          'UPDATE coupons SET used_count = used_count + 1 WHERE code = $1',
          [coupon_code.toUpperCase()]
        );
      }

      // 6. Update user total_spent and membership_tier
      const { rows: [userRow] } = await client.query(
        `UPDATE users SET total_spent = COALESCE(total_spent, 0) + $1
         WHERE email = $2 RETURNING total_spent`,
        [total, email]
      );

      if (userRow) {
        const newTier = getTier(parseFloat(userRow.total_spent));
        if (newTier) {
          await client.query(
            `UPDATE users SET membership_tier = $1 WHERE email = $2
             AND (membership_tier IS NULL OR
               CASE membership_tier
                 WHEN 'Apex' THEN 0
                 WHEN 'Drive' THEN 1
                 WHEN 'Pace' THEN 2
                 ELSE 3
               END > CASE $1
                 WHEN 'Apex' THEN 0
                 WHEN 'Drive' THEN 1
                 WHEN 'Pace' THEN 2
                 ELSE 3
               END)`,
            [newTier, email]
          );
        }
      }

      console.log('[Webhook] Order ' + order_number + ' fulfilled for ' + email);
    });
  } catch (err) {
    console.error('[Webhook] Order fulfillment failed', err);
    throw err;
  }
}
