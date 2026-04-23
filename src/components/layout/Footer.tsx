'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Countdown() {
  const target = new Date('2026-07-12T00:00:00');
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-4 mt-3">
      {[{ v: time.d, l: 'días' }, { v: time.h, l: 'hrs' }, { v: time.m, l: 'min' }, { v: time.s, l: 'seg' }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <p className="font-display text-2xl font-light text-white">{String(v).padStart(2, '0')}</p>
          <p className="text-[9px] tracking-[0.15em] uppercase text-stone-600">{l}</p>
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'footer' }) });
    setSubmitted(true);
  }

  return (
    <footer className="bg-[#0A0A0A] text-white mt-24">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display text-3xl font-light tracking-[0.2em] uppercase mb-4">VELENÉ</p>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs mb-6">Nace de la disciplina. Athleisure premium fundado en Guadalajara, México.</p>
            <form onSubmit={subscribe} className="flex gap-2">
              {submitted ? (
                <p className="text-sm tracking-wider text-stone-400">Gracias por suscribirte.</p>
              ) : (
                <>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" type="email" required
                    className="flex-1 bg-transparent border border-stone-700 px-4 py-2.5 text-sm placeholder:text-stone-600 focus:outline-none focus:border-stone-400" />
                  <button type="submit" className="px-5 py-2.5 bg-white text-black text-xs tracking-wider uppercase hover:bg-stone-200 transition-colors">Unirse</button>
                </>
              )}
            </form>
            {/* Social */}
            <div className="flex gap-5 mt-8">
              <a href="https://instagram.com/velenecompany" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@velenecompany" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-4">Collections</p>
            <Link href="/drops" className="block text-sm text-stone-400 hover:text-white transition-colors py-1">
              The Conclave <span className="text-[9px] text-stone-600 ml-1">Current Drop</span>
            </Link>
            <div className="mt-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-2">Next Drop</p>
              <Countdown />
            </div>
            <div className="mt-6">
              <Link href="/about" className="block text-sm text-stone-400 hover:text-white transition-colors py-1">About</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-4">Support</p>
            <Link href="#size-guide" className="block text-sm text-stone-400 hover:text-white transition-colors py-1">Size Guide</Link>
            <details className="py-1">
              <summary className="text-sm text-stone-400 hover:text-white transition-colors cursor-pointer list-none">Returns</summary>
              <p className="text-[11px] text-stone-600 leading-relaxed mt-2 pr-2">
                Debido a que trabajamos mediante drops limitados, actualmente no aceptamos devoluciones por cambio de opinión. Si existe algún defecto de fabricación o error en el pedido, contáctanos dentro de las primeras 48 horas.
              </p>
            </details>
            <details className="py-1">
              <summary className="text-sm text-stone-400 hover:text-white transition-colors cursor-pointer list-none">FAQ</summary>
              <div className="mt-2 space-y-3">
                <div>
                  <p className="text-[11px] text-stone-400">¿Cuándo se envían los pedidos?</p>
                  <p className="text-[11px] text-stone-600">2–5 días hábiles.</p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400">¿Los drops son limitados?</p>
                  <p className="text-[11px] text-stone-600">Sí, todas las colecciones son limitadas.</p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400">¿Habrá
                  restock?</p>
                  <p className="text-[11px] text-stone-600">No garantizamos restock una vez finalizado un drop.</p>
                </div>
              </div>
            </details>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-stone-600 tracking-wider">© 2026 VELENÉ. Todos los derechos reservados.</p>
          <p className="text-[11px] text-stone-600 tracking-wider">Guadalajara, México</p>
        </div>
      </div>
    </footer>
  );
}
