import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { sendPartnerConfirmation, sendPartnerNotification } from '@/lib/emails';

export async function POST(req: NextRequest) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const body = await req.json();
    const {
      contact_name,
      email,
      phone,
      company_name,
      city_state,
      instagram_website,
      business_type,
      volume_range,
      customer_type,
      message,
    } = body;

    if (!contact_name || !email || !volume_range) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO partner_applications
        (contact_name, email, phone, company_name, city_state, instagram_website,
         business_type, volume_range, customer_type, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [contact_name, email, phone, company_name, city_state, instagram_website,
       business_type, volume_range, customer_type, message]
    );

    await Promise.allSettled([
      sendPartnerConfirmation({
        to: email,
        contactName: contact_name,
        companyName: company_name || contact_name,
      }),
      sendPartnerNotification({
        contactName: contact_name,
        companyName: company_name || 'Sin nombre',
        email,
        phone: phone || 'No proporcionado',
        volumeRange: volume_range,
        businessType: business_type || 'No especificado',
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error('Partners API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  } finally {
    await pool.end();
  }
}