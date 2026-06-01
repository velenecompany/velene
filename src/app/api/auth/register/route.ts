import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword, signToken, setSessionCookie } from '@/lib/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const exists = await queryOne('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
  if (exists) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

  const hash = await hashPassword(password);
  const [user] = await query<{id: string}>(
    'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1,$2,$3,$4) RETURNING id',
    [email.toLowerCase(), hash, firstName ?? null, lastName ?? null]
  );

  const token = signToken({ sub: user.id, email: email.toLowerCase(), type: 'user' });
  setSessionCookie(token);

  // Email de bienvenida
  try {
    await resend.emails.send({
      from: 'VELENÉ <hola@velene.club>',
      to: email.toLowerCase(),
      subject: 'Bienvenido a VELENÉ',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background:#F5F2ED;font-family:Georgia,serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F2ED;padding:48px 0;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#F5F2ED;max-width:560px;width:100%;">
                  
                  <!-- Logo -->
                  <tr>
                    <td align="center" style="padding-bottom:48px;">
                      <p style="margin:0;font-size:24px;letter-spacing:0.3em;font-weight:300;color:#0A0A0A;text-transform:uppercase;">VELENÉ</p>
                    </td>
                  </tr>

                  <!-- Hero -->
                  <tr>
                    <td style="background:#0A0A0A;padding:48px 40px;">
                      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#B8A87A;">Bienvenido</p>
                      <h1 style="margin:0 0 24px;font-size:36px;font-weight:300;color:#F5F2ED;line-height:1.2;">
                        ${firstName ? `Hola, ${firstName}.` : 'Hola.'}
                      </h1>
                      <p style="margin:0;font-size:14px;color:#F5F2ED;opacity:0.6;line-height:1.8;">
                        Tu cuenta VELENÉ está lista. Ahora tienes acceso a drops exclusivos, tu historial de pedidos y beneficios de membresía.
                      </p>
                    </td>
                  </tr>

                  <!-- Drop activo -->
                  <tr>
                    <td style="padding:40px;background:#E8E2D9;">
                      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#6B6560;">Colección activa</p>
                      <p style="margin:0 0 16px;font-size:28px;font-weight:300;color:#0A0A0A;">The Conclave</p>
                      <p style="margin:0 0 24px;font-size:13px;color:#6B6560;line-height:1.7;">Sets desde $719 MXN · T-Shirts desde $479 MXN<br>Edición limitada — GDL 2025</p>
                      <a href="https://velene.club/drops" style="display:inline-block;background:#0A0A0A;color:#F5F2ED;text-decoration:none;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;padding:14px 32px;">Ver colección</a>
                    </td>
                  </tr>

                  <!-- Membership -->
                  <tr>
                    <td style="padding:40px;background:#F5F2ED;">
                      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#6B6560;">Membership</p>
                      <p style="margin:0 0 12px;font-size:20px;font-weight:300;color:#0A0A0A;">Acceso anticipado a cada drop.</p>
                      <p style="margin:0 0 24px;font-size:13px;color:#6B6560;line-height:1.7;">Acumula compras y sube de tier — Pace, Drive o Apex — para obtener descuentos exclusivos y ser el primero en acceder a nuevas colecciones.</p>
                      <a href="https://velene.club/membership" style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#0A0A0A;text-decoration:underline;">Conoce los tiers</a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding:32px 40px;border-top:1px solid #E8E2D9;">
                      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#0A0A0A;">VELENÉ</p>
                      <p style="margin:0;font-size:11px;color:#6B6560;">Guadalajara, México · <a href="https://velene.club" style="color:#6B6560;">velene.club</a></p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });
  } catch (emailError) {
    console.error('Error enviando email de bienvenida:', emailError);
    // No bloqueamos el registro si falla el email
  }

  return NextResponse.json({ data: { userId: user.id } }, { status: 201 });
}