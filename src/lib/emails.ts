import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'VELENÉ <onboarding@resend.dev>';
const BRAND_EMAIL = 'velacontacto2@gmail.com';

// 1. Confirmación de pedido al cliente
export async function sendOrderConfirmation({
  to,
  firstName,
  orderNumber,
  items,
  total,
  shippingAddress,
}: {
  to: string;
  firstName: string;
  orderNumber: string;
  items: { product_name: string; quantity: number; unit_price: number }[];
  total: number;
  shippingAddress: any;
}) {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#999">${item.product_name}</td>
      <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#999;text-align:center">x${item.quantity}</td>
      <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#fff;text-align:right">$${(item.unit_price * item.quantity).toLocaleString('es-MX')}</td>
    </tr>
  `).join('');

  const address = typeof shippingAddress === 'string' ? JSON.parse(shippingAddress) : shippingAddress;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Pedido confirmado — #${orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px">
            <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

              <!-- Header -->
              <tr><td style="padding:40px 0 32px;border-bottom:1px solid #1a1a1a">
                <p style="margin:0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#444">VELENÉ</p>
              </td></tr>

              <!-- Body -->
              <tr><td style="padding:40px 0">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#444">Pedido Confirmado</p>
                <h1 style="margin:0 0 32px;font-size:28px;font-weight:300;color:#fff;letter-spacing:0.05em">Gracias, ${firstName}.</h1>
                <p style="margin:0 0 32px;font-size:13px;color:#666;line-height:1.8">Tu pedido <span style="color:#fff">#${orderNumber}</span> está confirmado. En cuanto sea enviado te avisamos con el número de rastreo.</p>

                <!-- Items -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
                  <tr>
                    <td style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#444;padding-bottom:12px">Producto</td>
                    <td style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#444;padding-bottom:12px;text-align:center">Cant.</td>
                    <td style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#444;padding-bottom:12px;text-align:right">Total</td>
                  </tr>
                  ${itemsHtml}
                  <tr>
                    <td colspan="2" style="padding-top:16px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#444">Total</td>
                    <td style="padding-top:16px;font-size:16px;color:#fff;text-align:right">$${total.toLocaleString('es-MX')} MXN</td>
                  </tr>
                </table>

                <!-- Dirección -->
                <div style="border:1px solid #1a1a1a;padding:20px;margin-top:32px">
                  <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#444">Dirección de Envío</p>
                  <p style="margin:0;font-size:13px;color:#666;line-height:1.8">
                    ${address?.name || ''}<br>
                    ${address?.line1 || ''} ${address?.line2 || ''}<br>
                    ${address?.city || ''}, ${address?.state || ''} ${address?.postal_code || ''}<br>
                    ${address?.country || ''}
                  </p>
                </div>
              </td></tr>

              <!-- Footer -->
              <tr><td style="padding:32px 0;border-top:1px solid #1a1a1a">
                <p style="margin:0;font-size:11px;color:#333;text-align:center;letter-spacing:0.1em">VELENÉ · Guadalajara, México</p>
              </td></tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// 2. Notificación de pedido nuevo a la marca
export async function sendOrderNotification({
  orderNumber,
  email,
  items,
  total,
}: {
  orderNumber: string;
  email: string;
  items: { product_name: string; quantity: number; unit_price: number }[];
  total: number;
}) {
  const itemsList = items.map(i => `• ${i.product_name} x${i.quantity} — $${(i.unit_price * i.quantity).toLocaleString('es-MX')}`).join('\n');

  await resend.emails.send({
    from: FROM,
    to: BRAND_EMAIL,
    subject: `🛍 Nuevo pedido #${orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:40px;background:#0a0a0a;font-family:Georgia,serif;color:#fff">
        <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#444">VELENÉ — Nuevo Pedido</p>
        <h1 style="font-size:24px;font-weight:300;margin:16px 0">#${orderNumber}</h1>
        <p style="color:#666;font-size:13px">Cliente: <span style="color:#fff">${email}</span></p>
        <pre style="color:#999;font-size:13px;line-height:1.8;background:#111;padding:20px;margin:24px 0">${itemsList}</pre>
        <p style="font-size:16px;color:#fff">Total: $${total.toLocaleString('es-MX')} MXN</p>
        <p style="margin-top:32px"><a href="https://velene.vercel.app/admin" style="color:#666;font-size:11px;letter-spacing:0.2em;text-transform:uppercase">Ver en dashboard</a></p>
      </body>
      </html>
    `,
  });
}

// 3. Confirmación de aplicación de partner
export async function sendPartnerConfirmation({
  to,
  contactName,
  companyName,
}: {
  to: string;
  contactName: string;
  companyName: string;
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Tu aplicación como Partner VELENÉ fue recibida',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px">
            <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

              <tr><td style="padding:40px 0 32px;border-bottom:1px solid #1a1a1a">
                <p style="margin:0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#444">VELENÉ</p>
              </td></tr>

              <tr><td style="padding:40px 0">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#444">Aplicación Recibida</p>
                <h1 style="margin:0 0 32px;font-size:28px;font-weight:300;color:#fff;letter-spacing:0.05em">Gracias, ${contactName}.</h1>
                <p style="margin:0 0 16px;font-size:13px;color:#666;line-height:1.8">
                  Recibimos la aplicación de <span style="color:#fff">${companyName}</span> para convertirse en Partner Autorizado VELENÉ.
                </p>
                <p style="margin:0 0 32px;font-size:13px;color:#666;line-height:1.8">
                  Revisamos cada solicitud manualmente. Te contactamos en menos de 72 horas con una respuesta.
                </p>
                <div style="border:1px solid #1a1a1a;padding:24px">
                  <p style="margin:0;font-size:12px;color:#444;line-height:1.8;font-style:italic">
                    "No buscamos revendedores. Buscamos personas que entiendan lo que estamos construyendo."
                  </p>
                </div>
              </td></tr>

              <tr><td style="padding:32px 0;border-top:1px solid #1a1a1a">
                <p style="margin:0;font-size:11px;color:#333;text-align:center;letter-spacing:0.1em">VELENÉ · Guadalajara, México</p>
              </td></tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// 4. Notificación de nueva aplicación de partner a la marca
export async function sendPartnerNotification({
  contactName,
  companyName,
  email,
  phone,
  volumeRange,
  businessType,
}: {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  volumeRange: string;
  businessType: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: BRAND_EMAIL,
    subject: `🤝 Nueva aplicación de partner — ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:40px;background:#0a0a0a;font-family:Georgia,serif;color:#fff">
        <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#444">VELENÉ — Nueva Aplicación Partner</p>
        <h1 style="font-size:24px;font-weight:300;margin:16px 0">${companyName}</h1>
        <table style="width:100%;margin-top:24px">
          <tr><td style="color:#444;font-size:12px;padding:8px 0;border-bottom:1px solid #1a1a1a">Contacto</td><td style="color:#fff;font-size:13px;padding:8px 0;border-bottom:1px solid #1a1a1a">${contactName}</td></tr>
          <tr><td style="color:#444;font-size:12px;padding:8px 0;border-bottom:1px solid #1a1a1a">Email</td><td style="color:#fff;font-size:13px;padding:8px 0;border-bottom:1px solid #1a1a1a">${email}</td></tr>
          <tr><td style="color:#444;font-size:12px;padding:8px 0;border-bottom:1px solid #1a1a1a">Teléfono</td><td style="color:#fff;font-size:13px;padding:8px 0;border-bottom:1px solid #1a1a1a">${phone}</td></tr>
          <tr><td style="color:#444;font-size:12px;padding:8px 0;border-bottom:1px solid #1a1a1a">Tipo</td><td style="color:#fff;font-size:13px;padding:8px 0;border-bottom:1px solid #1a1a1a">${businessType}</td></tr>
          <tr><td style="color:#444;font-size:12px;padding:8px 0">Volumen</td><td style="color:#fff;font-size:13px;padding:8px 0">${volumeRange}</td></tr>
        </table>
      </body>
      </html>
    `,
  });
}