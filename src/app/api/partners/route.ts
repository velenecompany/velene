import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      company_name,
      contact_name,
      email,
      phone,
      city,
      state,
      business_type,
      volume_range,
      message,
    } = body;

    if (!company_name || !contact_name || !email || !volume_range) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO partner_applications
        (company_name, contact_name, email, phone, city, state, business_type, volume_range, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [company_name, contact_name, email, phone, city, state, business_type, volume_range, message]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error('Partners API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}