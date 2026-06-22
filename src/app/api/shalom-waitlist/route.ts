import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();
    if (!phone || phone.length < 10) {
      return NextResponse.json({ error: 'Número inválido' }, { status: 400 });
    }

    await query(
      `INSERT INTO shalom_waitlist (phone, created_at) 
       VALUES ($1, NOW()) 
       ON CONFLICT (phone) DO NOTHING`,
      [phone]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Shalom waitlist error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}