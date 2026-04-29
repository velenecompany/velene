'use client';
import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getCart, limpiar, CartItem } from '@/store/cart';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const TIER_DISCOUNTS: Record<string, number> = { Pace: 5, Drive: 10, Apex: 15 };

function Field({ label, placeholder, type = 'text', value, onChange }: {
  label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 bg-white transition-colors" />
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [cp, setCp] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponValido, setCouponValido] = useState(false);
  const [descuento, setDescuento] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [membershipTier, setMembershipTier] = useState<string | null>(null);

  useEffect(() => {
    setItems(getCart());
    if (success) limpiar();
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          setMembershipTier(d.data.membership_tier || null);
          setEmail(d.data.email || '');
        }
      });
  }, [success]);

  const subtotal = items.reduce((a, i) => a + i.precio * i.cantidad, 0);
  const memberDiscount = membershipTier ? Math.round(subtotal * TIER_DISCOUNTS[membershipTier] / 100) : 0;
  const totalFinal = subtotal - memberDiscount - descuento;

  async function aplicarCupon() {
    if (!coupon.trim()) return;
    const res = await fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: coupon.trim(), total: subtotal - memberDiscount }),
    });
    const data = await res.json();
    if (data.valid) {
      setDescuento(data.descuento);
      setCouponCode(data.code);
      setCouponValido(true);
      setCouponMsg('Cupon aplicado: -' + data.discount_percent + '%');
    } else {
      setDescuento(0);
      setCouponValido(false);
      setCouponCode('');
      setCouponMsg('Codigo invalido');
    }
  }

  async function handlePagar() {
    if (!nombre || !email || !direccion || !ciudad || !cp) { alert('Llena todos los campos'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email, nombre, apellido, direccion, ciudad, cp, coupon_code: couponCode, descuento: memberDiscount + descuento }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert('Error al procesar. Intenta de nuevo.');
    }
    setLoading(false);
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center mx-auto mb-8 text-2xl">✓</div>
            <h1 className="font-display text-5xl font-light mb-4">Pedido confirmado</h1>
            <p className="text-sm text-stone-500 max-w-sm mx-auto mb-8">Gracias por tu compra.</p>
            <Link href="/" className="text-[11px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Continuar comprando</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-screen-lg mx-auto px-6 py-12">
          <h1 className="font-display text-4xl font-light mb-10">Checkout</h1>
          <div className="grid md:grid-cols-[1fr_360px] gap-16">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre" placeholder="Tu nombre" value={nombre} onChange={setNombre} />
                <Field label="Apellido" placeholder="Tu apellido" value={apellido} onChange={setApellido} />
              </div>
              <Field label="Email" placeholder="tu@email.com" type="email" value={email} onChange={setEmail} />
              <Field label="Direccion" placeholder="Calle y numero" value={direccion} onChange={setDireccion} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ciudad" placeholder="Guadalajara" value={ciudad} onChange={setCiudad} />
                <Field label="Codigo postal" placeholder="45000" value={cp} onChange={setCp} />
              </div>
              <button onClick={handlePagar} disabled={loading}
                className="w-full mt-4 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors disabled:opacity-50">
                {loading ? 'Redirigiendo...' : 'Pagar $' + totalFinal.toLocaleString('es-MX') + ' MXN'}
              </button>
              <p className="text-[10px] text-center text-stone-400 tracking-wide">Pago seguro · Powered by Stripe</p>
            </div>
            <div className="bg-[#F5F2ED] p-6 h-fit">
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-4">Tu pedido</p>
              {items.map((item, k) => (
                <div key={k} className="flex gap-3 items-center py-3 border-b border-stone-200">
                  <img src={item.imagen} alt={item.nombre} className="w-14 h-14 object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs">{item.nombre}</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider">Talla {item.talla} x{item.cantidad}</p>
                  </div>
                  <p className="font-display text-lg">${(item.precio * item.cantidad).toLocaleString('es-MX')}</p>
                </div>
              ))}
              <div className="mt-4 pt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[11px] tracking-wider uppercase text-stone-500">Subtotal</span>
                  <span className="font-display text-lg">${subtotal.toLocaleString('es-MX')}</span>
                </div>
                {memberDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[11px] tracking-wider uppercase text-emerald-600">{membershipTier} -{TIER_DISCOUNTS[membershipTier!]}%</span>
                    <span className="font-display text-lg text-emerald-600">-${memberDiscount.toLocaleString('es-MX')}</span>
                  </div>
                )}
                {descuento > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[11px] tracking-wider uppercase text-emerald-600">Cupon</span>
                    <span className="font-display text-lg text-emerald-600">-${descuento.toLocaleString('es-MX')}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-stone-200 pt-2">
                  <span className="text-[11px] tracking-wider uppercase text-stone-500">Total</span>
                  <span className="font-display text-2xl">${totalFinal.toLocaleString('es-MX')}</span>
                </div>
              </div>
              <p className="text-[10px] text-emerald-600 mt-2">Envio gratis</p>
              <div className="mt-6 pt-4 border-t border-stone-200">
                <p className="text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Codigo de descuento</p>
                <div className="flex gap-2">
                  <input value={coupon} onChange={e => { setCoupon(e.target.value); setCouponMsg(''); }} placeholder="VELENE10"
                    className="flex-1 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-500 bg-white" disabled={couponValido} />
                  <button onClick={aplicarCupon} disabled={couponValido}
                    className="px-4 py-2 bg-stone-900 text-white text-[10px] tracking-[0.15em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-40">
                    Aplicar
                  </button>
                </div>
                {couponMsg && <p className={'text-[10px] mt-1 ' + (couponValido ? 'text-emerald-600' : 'text-red-500')}>{couponMsg}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}