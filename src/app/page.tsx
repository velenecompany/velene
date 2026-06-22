'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroParallax from '@/components/home/HeroParallax';
import Link from 'next/link';

const HOT_SALE_END = new Date('2026-06-07T23:59:00-06:00').getTime();
const SHALOM_DATE = new Date('2026-08-28T00:00:00-06:00').getTime();
const DESCUENTO = 0.20;

function precioHotSale(precio: number) {
  return Math.round(precio * (1 - DESCUENTO));
}

const PRODUCTOS = [
  { img: '/PORTADA-OF.jpg', hover: '/IMG_9077.jpg', nombre: 'Set Conclave Rosa', slug: 'set-conclave-rosa', precio: 899 },
  { img: '/IMG_9367.jpg', hover: '/IMG_9083.jpg', nombre: 'Set Conclave Beige', slug: 'set-conclave-beige', precio: 899 },
  { img: '/IMG_9377.jpg', hover: '/IMG_9370.jpg', nombre: 'Set Conclave Azul', slug: 'set-conclave-azul', precio: 599 },
  { img: '/IMG_9077.jpg', hover: '/IMG_9371.jpg', nombre: 'T-Shirt Conclave Rosa', slug: 'playera-conclave-rosa', precio: 599 },
  { img: '/IMG_9367.jpg', hover: '/IMG_9083.jpg', nombre: 'T-Shirt Conclave Beige', slug: 'playera-conclave-beige', precio: 599 },
  { img: '/IMG_9368.jpg', hover: '/IMG_9370.jpg', nombre: 'T-Shirt Conclave Azul', slug: 'playera-conclave-azul', precio: 599 },
];

function Carrusel() {
  const [current, setCurrent] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const visible = 3;
  const total = PRODUCTOS.length;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visible; i++) {
      items.push(PRODUCTOS[(current + i) % total]);
    }
    return items;
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getVisible().map((p, i) => (
          <div key={`${p.slug}-${i}`} className="bg-[#F5F2ED]">
            <Link href={`/shop/${p.slug}`} className="group block">
              <div
                className="aspect-[3/4] overflow-hidden bg-stone-100 relative"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className="absolute top-3 left-3 z-10 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 bg-[#B8A87A] text-[#0A0A0A]">−20%</span>
                <span className="absolute top-3 right-3 z-10 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 bg-[#0A0A0A] text-[#F5F2ED]">Hot Sale</span>
                <img src={hoveredIdx === i ? p.hover : p.img} alt={p.nombre} className="w-full h-full object-cover transition-all duration-500" />
              </div>
            </Link>
            <div className="p-5">
              <p className="font-display text-base font-light text-stone-900 mb-1">{p.nombre}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <p className="text-sm text-stone-400 line-through">${p.precio.toLocaleString('es-MX')}</p>
                <p className="font-display text-lg text-stone-900">${precioHotSale(p.precio).toLocaleString('es-MX')} <span className="text-xs text-stone-400">MXN</span></p>
              </div>
              <Link href={`/shop/${p.slug}`} className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={prev} className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:border-stone-900 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">{current + 1} — {total}</p>
        <button onClick={next} className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:border-stone-900 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}

function ShalomCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = SHALOM_DATE - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-6">
      {[
        { val: timeLeft.days, label: 'días' },
        { val: timeLeft.hours, label: 'hrs' },
        { val: timeLeft.minutes, label: 'min' },
        { val: timeLeft.seconds, label: 'seg' },
      ].map(({ val, label }) => (
        <div key={label} className="text-center">
          <p className="font-display text-5xl md:text-6xl font-light text-white leading-none">{String(val).padStart(2, '0')}</p>
          <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mt-2">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [hotSaleActive, setHotSaleActive] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);

  useEffect(() => {
    setHotSaleActive(Date.now() < HOT_SALE_END);
  }, []);

  async function handleShalom() {
    if (!phone.trim() || phone.length < 10) return;
    setLoadingPhone(true);
    try {
      await fetch('/api/shalom-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      setSubmitted(true);
    } catch {}
    setLoadingPhone(false);
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero principal */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{minHeight:"100vh"}}>
          <HeroParallax />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-6">
            {hotSaleActive && (
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#B8A87A] mb-4">✦ Hot Sale — 20% off en toda la colección</p>
            )}
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/60 mb-6">The Conclave · Drop 001</p>
            <h1 className="font-display text-[clamp(64px,10vw,140px)] font-light text-white leading-none mb-10">
              Luxury in<br />Defiance.
            </h1>
            <Link href="/drops" className="inline-block px-10 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors">
              Ver colección
            </Link>
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 z-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40">GDL — México</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40">Drop 001 — 2025</p>
          </div>
        </section>

        {/* The Shalom — Drop 002 */}
        <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
          <div className="absolute inset-0">
            <img src="/shalom-bg.jpg" alt="The Shalom" className="w-full h-full object-cover object-center opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-screen-xl mx-auto px-6">
            <div className="max-w-lg">
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#B8A87A] mb-4">Drop 002</p>
              <h2 className="font-display text-6xl md:text-8xl font-light text-white leading-none mb-6">The Shalom</h2>
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-12">GDL — 28 ago 2026 — Edición limitada</p>
              <Link href="/the-shalom" className="inline-block px-10 py-4 border border-white text-white text-sm tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors">
                Ver colección
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Hot Sale */}
        {hotSaleActive && (
          <section className="py-20 bg-[#0A0A0A] text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
              <p className="text-[20vw] font-display font-light tracking-tight whitespace-nowrap">HOT SALE</p>
            </div>
            <div className="max-w-screen-xl mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#B8A87A] mb-4">20% off — Oferta limitada</p>
                  <h2 className="font-display text-6xl md:text-8xl font-light leading-none">Hot Sale<br />2025.</h2>
                </div>
                <div className="md:text-right">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-2">Termina en</p>
                  <HotSaleCountdown />
                  <Link href="/drops" className="inline-block mt-6 px-8 py-3 border border-[#B8A87A] text-[#B8A87A] text-[10px] tracking-[0.25em] uppercase hover:bg-[#B8A87A] hover:text-black transition-colors">
                    Ver todas las piezas
                  </Link>
                </div>
              </div>
              <Carrusel />
            </div>
          </section>
        )}

        {/* Productos grid */}
        <section className="py-20 bg-[#F5F2ED]">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex justify-between items-baseline mb-12">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Drop 001</p>
                <p className="font-display text-4xl font-light">The Conclave</p>
              </div>
              {hotSaleActive && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#B8A87A]">✦ 20% off Hot Sale</span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/shop/set-conclave-rosa" className="group bg-white block relative">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">Nuevo</span>
                  {hotSaleActive && <span className="absolute top-3 right-3 z-10 bg-[#B8A87A] text-[#0A0A0A] text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">−20%</span>}
                  <img src="/PORTADA-OF.jpg" alt="Set Conclave Rosa" className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                  <img src="/IMG_9077.jpg" alt="Set Conclave Rosa hover" className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm mb-2">Set Conclave Rosa</p>
                  <div className="flex items-center gap-2">
                    {hotSaleActive && <p className="text-sm text-stone-400 line-through">$899</p>}
                    <p className="font-display text-lg">${hotSaleActive ? precioHotSale(899).toLocaleString('es-MX') : '899'}</p>
                  </div>
                  <p className="text-[10px] text-emerald-600 mt-1">✓ Envío gratis</p>
                </div>
              </Link>
              <Link href="/shop/set-conclave-beige" className="group bg-white block relative">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">Nuevo</span>
                  {hotSaleActive && <span className="absolute top-3 right-3 z-10 bg-[#B8A87A] text-[#0A0A0A] text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">−20%</span>}
                  <img src="/IMG_9367.jpg" alt="Set Conclave Beige" className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                  <img src="/IMG_9083.jpg" alt="Set Conclave Beige hover" className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm mb-2">Set Conclave Beige</p>
                  <div className="flex items-center gap-2">
                    {hotSaleActive && <p className="text-sm text-stone-400 line-through">$899</p>}
                    <p className="font-display text-lg">${hotSaleActive ? precioHotSale(899).toLocaleString('es-MX') : '899'}</p>
                  </div>
                  <p className="text-[10px] text-emerald-600 mt-1">✓ Envío gratis</p>
                </div>
              </Link>
              <Link href="/shop/set-conclave-azul" className="group bg-white block relative">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1" style={{background:'#8FA3B1', color:'#1a2530'}}>Oferta</span>
                  {hotSaleActive && <span className="absolute top-3 right-3 z-10 bg-[#B8A87A] text-[#0A0A0A] text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">−20%</span>}
                  <img src="/IMG_9377.jpg" alt="Set Conclave Azul" className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                  <img src="/IMG_9370.jpg" alt="Set Conclave Azul hover" className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm mb-2">Set Conclave Azul</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-stone-400 line-through">$899</p>
                    <p className="font-display text-lg">${hotSaleActive ? precioHotSale(599).toLocaleString('es-MX') : '599'}</p>
                    {!hotSaleActive && <p className="text-sm text-stone-400 line-through">$899</p>}
                  </div>
                  <p className="text-[10px] text-emerald-600 mt-1">✓ Envío gratis</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-28 bg-[#E8E2D9]">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-6">Filosofía</p>
                <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">Diseñado para<br />quienes no paran.</h2>
                <p className="text-sm text-stone-600 leading-relaxed max-w-md">VELENÉ nace de la disciplina. Cada pieza construida para quien entiende que el movimiento no es opcional — es un estado mental.</p>
                <Link href="/about" className="inline-block mt-8 text-[11px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Conoce VELENÉ</Link>
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <img src="/IMG_9364.jpg" alt="Luxury in Defiance" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#3D3935] text-white">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">The Conclave · Drop 001</p>
            <h2 className="font-display text-5xl md:text-7xl font-light mb-8">Luxury in Defiance.</h2>
            <p className="text-sm text-white/50 mb-10 max-w-md mx-auto">Edición limitada. Tres colorways. Una sola oportunidad.</p>
            <Link href="/drops" className="inline-block px-10 py-4 border border-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors">Ver The Conclave</Link>
          </div>
        </section>

        <section className="py-24 bg-[#3D3935] text-white border-t border-white/10">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Distribución Autorizada</p>
            <h2 className="font-display text-5xl md:text-7xl font-light mb-8">Conviértete en<br />Partner Autorizado.</h2>
            <p className="text-sm text-white/50 mb-10 max-w-md mx-auto">Acceso anticipado a cada drop, precios de mayoreo y zona exclusiva. Seleccionamos a nuestros distribuidores con cuidado.</p>
            <Link href="/partners" className="inline-block px-10 py-4 border border-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors">Aplica Ahora</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function HotSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = HOT_SALE_END - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-4">
      {[
        { val: timeLeft.days, label: 'días' },
        { val: timeLeft.hours, label: 'hrs' },
        { val: timeLeft.minutes, label: 'min' },
        { val: timeLeft.seconds, label: 'seg' },
      ].map(({ val, label }) => (
        <div key={label} className="text-center">
          <p className="font-display text-4xl font-light leading-none">{String(val).padStart(2, '0')}</p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}