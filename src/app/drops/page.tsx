'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SETS = [
  { img: '/PORTADA-OF.jpg', hover: '/IMG_9077.jpg', color: 'Rosa', slug: 'set-conclave-rosa', precio: 899 },
  { img: '/IMG_9367.jpg', hover: '/IMG_9083.jpg', color: 'Beige', slug: 'set-conclave-beige', precio: 899 },
  { img: '/IMG_9377.jpg', hover: '/IMG_9370.jpg', color: 'Azul', slug: 'set-conclave-azul', precio: 599 },
];

const TSHIRTS = [
  { img: '/IMG_9077.jpg', hover: '/IMG_9371.jpg', color: 'Rosa', slug: 'playera-conclave-rosa', precio: 599 },
  { img: '/IMG_9367.jpg', hover: '/IMG_9083.jpg', color: 'Beige', slug: 'playera-conclave-beige', precio: 599 },
  { img: '/IMG_9368.jpg', hover: '/IMG_9370.jpg', color: 'Azul', slug: 'playera-conclave-azul', precio: 599 },
];

function getDiscount(tier: string | null): number {
  if (tier === 'Apex') return 15;
  if (tier === 'Drive') return 10;
  if (tier === 'Pace') return 5;
  return 0;
}

function precioConDescuento(precio: number, discount: number): string {
  if (discount === 0) return `$${precio.toLocaleString('es-MX')}`;
  const final = Math.round(precio * (1 - discount / 100));
  return `$${final.toLocaleString('es-MX')}`;
}

export default function DropsPage() {
  const [drop, setDrop] = useState<any>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(data => { if (data.membership_tier) setTier(data.membership_tier); })
        .catch(() => {});
    }
    fetch('/api/drops?slug=the-conclave')
      .then(r => r.json())
      .then(data => { setDrop(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function tieneAcceso(): boolean {
    if (!drop) return false;
    if (drop.public_active) return true;
    if (tier === 'Apex' && drop.apex_active) return true;
    if (tier === 'Drive' && drop.drive_active) return true;
    if (tier === 'Pace' && drop.pace_active) return true;
    return false;
  }

  function mensajeAccesoAnticipado(): string | null {
    if (!drop || drop.public_active) return null;
    if (tier === 'Apex' && drop.apex_active) return 'Acceso anticipado Apex — 15% off';
    if (tier === 'Drive' && drop.drive_active) return 'Acceso anticipado Drive — 10% off';
    if (tier === 'Pace' && drop.pace_active) return 'Acceso anticipado Pace — 5% off';
    return null;
  }

  const discount = getDiscount(tier);
  const acceso = tieneAcceso();
  const mensajeEarly = mensajeAccesoAnticipado();

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 bg-[#FAFAF8] min-h-screen flex items-center justify-center">
          <p className="text-xs tracking-widest uppercase text-stone-400">Cargando...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-[#FAFAF8] min-h-screen">
        <section className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-6">Colección activa</p>
          <h1 className="font-display text-7xl md:text-9xl font-light tracking-tight text-stone-900 leading-none mb-4">The Conclave</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mt-6">GDL — 2025 — Edición limitada</p>
          {mensajeEarly && (
            <div className="mt-8 inline-block border border-stone-900 px-6 py-3">
              <p className="text-[11px] tracking-[0.2em] uppercase text-stone-900">✦ {mensajeEarly}</p>
            </div>
          )}
        </section>

        {!acceso ? (
          <section className="max-w-screen-xl mx-auto px-6 pb-32 text-center">
            <div className="border border-stone-200 py-24 px-6">
              <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6">Acceso Restringido</p>
              <h2 className="font-display text-4xl font-light mb-6">Este drop aún no está disponible.</h2>
              <p className="text-sm text-stone-500 max-w-md mx-auto mb-10 leading-relaxed">
                {tier ? `Tu tier ${tier} tendrá acceso pronto. Te avisaremos cuando sea tu momento.` : 'Inicia sesión con tu cuenta VELENÉ para ver si tienes acceso anticipado.'}
              </p>
              {!tier && (
                <Link href="/login" className="inline-block px-10 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </section>
        ) : (
          <>
            <section className="max-w-screen-xl mx-auto px-6 pb-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">Sets</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
                {SETS.map(p => (
                  <div key={p.slug} className="bg-[#FAFAF8]">
                    <Link href={`/shop/${p.slug}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
                        <img src={p.img} alt={p.color} className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                        <img src={p.hover} alt={`${p.color} hover`} className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>
                    <div className="p-6">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Set Conclave</p>
                      <p className="font-display text-xl font-light text-stone-900 mb-1">{p.color}</p>
                      <p className="text-[11px] text-stone-500 mb-2">Bordado premium · Serigrafía alta definición</p>
                      <div className="flex items-baseline gap-2 mb-4">
                        {discount > 0 && (
                          <p className="font-display text-sm text-stone-400 line-through">${p.precio.toLocaleString('es-MX')}</p>
                        )}
                        <p className="font-display text-lg text-stone-900">{precioConDescuento(p.precio, discount)} <span className="text-xs text-stone-400">MXN</span></p>
                        {discount > 0 && (
                          <span className="text-[9px] tracking-widest uppercase bg-black text-white px-2 py-0.5">{discount}% off</span>
                        )}
                      </div>
                      <Link href={`/shop/${p.slug}`} className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-screen-xl mx-auto px-6 pb-24 mt-12">
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">T-Shirts</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
                {TSHIRTS.map(p => (
                  <div key={p.slug} className="bg-[#FAFAF8]">
                    <Link href={`/shop/${p.slug}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
                        <img src={p.img} alt={p.color} className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                        <img src={p.hover} alt={`${p.color} hover`} className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>
                    <div className="p-6">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">T-Shirt Conclave</p>
                      <p className="font-display text-xl font-light text-stone-900 mb-1">{p.color}</p>
                      <p className="text-[11px] text-stone-500 mb-2">Bordado premium · Serigrafía alta definición</p>
                      <div className="flex items-baseline gap-2 mb-4">
                        {discount > 0 && (
                          <p className="font-display text-sm text-stone-400 line-through">${p.precio.toLocaleString('es-MX')}</p>
                        )}
                        <p className="font-display text-lg text-stone-900">{precioConDescuento(p.precio, discount)} <span className="text-xs text-stone-400">MXN</span></p>
                        {discount > 0 && (
                          <span className="text-[9px] tracking-widest uppercase bg-black text-white px-2 py-0.5">{discount}% off</span>
                        )}
                      </div>
                      <Link href={`/shop/${p.slug}`} className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}