import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, asunto, mensaje } = await req.json();

    await resend.emails.send({
      from: 'VELENÉ <onboarding@resend.dev>',
      to: 'velacontacto2@gmail.com',
      subject: `📩 Nuevo mensaje — ${asunto || 'Contacto'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:40px;background:#0a0a0a;font-family:Georgia,serif;color:#fff">
          <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#444">VELENÉ — Nuevo Mensaje</p>
          <h1 style="font-size:24px;font-weight:300;margin:16px 0">${name}</h1>
          <table style="width:100%;margin-top:24px;border-collapse:collapse">
            <tr><td style="color:#444;font-size:12px;padding:10px 0;border-bottom:1px solid #1a1a1a;width:120px">Email</td><td style="color:#fff;font-size:13px;padding:10px 0;border-bottom:1px solid #1a1a1a">${email}</td></tr>
            <tr><td style="color:#444;font-size:12px;padding:10px 0;border-bottom:1px solid #1a1a1a">Asunto</td><td style="color:#fff;font-size:13px;padding:10px 0;border-bottom:1px solid #1a1a1a">${asunto}</td></tr>
            <tr><td style="color:#444;font-size:12px;padding:10px 0">Mensaje</td><td style="color:#fff;font-size:13px;padding:10px 0;line-height:1.8">${mensaje}</td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}