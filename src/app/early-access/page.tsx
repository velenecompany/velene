'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { addToCart } from '@/store/cart';

const SETS = [
  { img: '/PORTADA-OF.jpg', color: 'Rosa', slug: 'set-conclave-rosa', precio: 899 },
  { img: '/IMG_9367.jpg', color: 'Beige', slug: 'set-conclave-beige', precio: 899 },
  { img: '/IMG_9368.jpg', color: 'Azul', slug: 'set-conclave-azul', precio: 599 },
];

const TSHIRTS = [
  { img: '/IMG_9077.jpg', color: 'Rosa', slug: 'playera-conclave-rosa', precio: 599 },
  { img: '/IMG_9367.jpg', color: 'Beige', slug: 'playera-conclave-beige', precio: 599 },
  { img: '/IMG_9368.jpg', color: 'Azul', slug: 'playera-conclave-azul', precio: 599 },
];

function getDiscount(tier: string | null): number {
  if (tier === 'Apex') return 15;
  if (tier === 'Drive') return 10;
  if (tier === 'Pace') return 5;
  return 0;
}

function precioFinal(precio: number, discount: number): number {
  return Math.round(precio * (1 - discount / 100));
}

export default function EarlyAccessPage() {
  const [tier, setTier] = useState<string | null>(null);
  const [drop, setDrop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [acceso, setAcceso] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }

    Promise.all([
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/drops?slug=the-conclave').then(r => r.json()),
    ]).then(([user, dropData]) => {
      const t = user.membership_tier;
      setTier(t);
      setDrop(dropData);
      if (dropData.public_active) { setAcceso(false); }
      else if (t === 'Apex' && dropData.apex_active) setAcceso(true);
      else if (t === 'Drive' && dropData.drive_active) setAcceso(true);
      else if (t === 'Pace' && dropData.pace_active) setAcceso(true);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const discount = getDiscount(tier);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <p className="text-xs tracking-widest uppercase text-white/30">Verificando acceso...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!acceso) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-4xl mb-8 text-white/20">◈</div>
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Acceso Restringido</p>
            <h1 className="text-2xl font-light tracking-widest uppercase text-white mb-6">No tienes acceso aún</h1>
            <p className="text-white/40 text-sm leading-loose mb-10">
              {!tier ? 'Inicia sesión para verificar tu membresía.' : `Tu tier ${tier} no tiene acceso anticipado activo en este momento.`}
            </p>
            <Link href={tier ? '/membership' : '/login'}
              className="inline-block border border-white/30 text-white text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-colors">
              {tier ? 'Ver Membresía' : 'Iniciar Sesión'}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#0a0a0a] text-white">
        <section className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6">Acceso Anticipado · {tier}</p>
          <h1 className="font-display text-7xl md:text-9xl font-light tracking-tight leading-none mb-4">The Conclave</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mt-6">GDL — 2025 — Edición limitada</p>
          <div className="mt-8 inline-block border border-white/20 px-6 py-3">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/60">✦ {discount}% de descuento exclusivo por tu membresía {tier}</p>
          </div>
        </section>

        <section className="max-w-screen-xl mx-auto px-6 pb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-6">Sets</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {SETS.map(p => (
              <div key={p.slug} className="bg-[#0a0a0a] group">
                <Link href={`/shop/${p.slug}`}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={p.img} alt={p.color} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-2">Set Conclave</p>
                  <p className="font-display text-xl font-light text-white mb-1">{p.color}</p>
                  <p className="text-[11px] text-white/40 mb-3">Bordado premium · Serigrafía alta definición</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="font-display text-sm text-white/30 line-through">${p.precio.toLocaleString('es-MX')}</p>
                    <p className="font-display text-lg text-white">${precioFinal(p.precio, discount).toLocaleString('es-MX')} <span className="text-xs text-white/40">MXN</span></p>
                    <span className="text-[9px] tracking-widest uppercase bg-white text-black px-2 py-0.5">{discount}% off</span>
                  </div>
                  <Link href={`/shop/${p.slug}`} className="text-[10px] tracking-[0.2em] uppercase border-b border-white/30 pb-px text-white/60 hover:text-white hover:border-white transition-colors">Ver pieza</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-screen-xl mx-auto px-6 pb-32 mt-12">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-6">T-Shirts</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {TSHIRTS.map(p => (
              <div key={p.slug} className="bg-[#0a0a0a] group">
                <Link href={`/shop/${p.slug}`}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={p.img} alt={p.color} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-2">T-Shirt Conclave</p>
                  <p className="font-display text-xl font-light text-white mb-1">{p.color}</p>
                  <p className="text-[11px] text-white/40 mb-3">Bordado premium · Serigrafía alta definición</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="font-display text-sm text-white/30 line-through">${p.precio.toLocaleString('es-MX')}</p>
                    <p className="font-display text-lg text-white">${precioFinal(p.precio, discount).toLocaleString('es-MX')} <span className="text-xs text-white/40">MXN</span></p>
                    <span className="text-[9px] tracking-widest uppercase bg-white text-black px-2 py-0.5">{discount}% off</span>
                  </div>
                  <Link href={`/shop/${p.slug}`} className="text-[10px] tracking-[0.2em] uppercase border-b border-white/30 pb-px text-white/60 hover:text-white hover:border-white transition-colors">Ver pieza</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}