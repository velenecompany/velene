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
  const [showContact, setShowContact] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'footer' }) });
    setSubmitted(true);
  }

  return (
    <footer className="bg-[#0A0A0A] text-white mt-24">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand + Email */}
          <div className="md:col-span-2">
            <p className="font-display text-3xl font-light tracking-[0.2em] uppercase mb-4">VELENÉ</p>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs mb-6">Nace de la disciplina. Athleisure premium fundado en Guadalajara, México.</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-3">Contacto</p>
            <a href="mailto:velacontacto2@gmail.com" className="text-sm text-stone-400 hover:text-white transition-colors">velacontacto2@gmail.com</a>

            {/* Síguenos */}
            <div className="mt-10">
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-5">Síguenos</p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/velene.club/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@velene.club" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-4">Navegación</p>
            <div className="space-y-3">
              <Link href="/about" className="block text-sm text-stone-400 hover:text-white transition-colors">About</Link>
              <Link href="/politicas" className="block text-sm text-stone-400 hover:text-white transition-colors">Políticas</Link>
              <button
                onClick={() => setShowContact(!showContact)}
                className="block text-sm text-stone-400 hover:text-white transition-colors text-left">
                Atención al cliente
              </button>
              {showContact && (
                <div className="pl-3 border-l border-stone-800 space-y-2 mt-2">
                  <a href="tel:+523324261099" className="block text-[12px] text-stone-500 hover:text-white transition-colors">+52 33 2426 1099</a>
                  <a href="mailto:velacontacto2@gmail.com" className="block text-[12px] text-stone-500 hover:text-white transition-colors">velacontacto2@gmail.com</a>
                </div>
              )}
              <Link href="/contacto" className="block text-sm text-stone-400 hover:text-white transition-colors">Contáctanos</Link>
            </div>

            <div className="mt-8">
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-2">Next Drop</p>
              <Countdown />
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-4">Newsletter</p>
            <p className="text-sm text-stone-400 leading-relaxed mb-6">Sé el primero en enterarte de nuevos drops y acceso anticipado.</p>
            <form onSubmit={subscribe} className="space-y-3">
              {submitted ? (
                <p className="text-sm tracking-wider text-stone-400">Gracias por suscribirte.</p>
              ) : (
                <>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" type="email" required
                    className="w-full bg-transparent border border-stone-700 px-4 py-2.5 text-sm placeholder:text-stone-600 focus:outline-none focus:border-stone-400" />
                  <button type="submit" className="w-full px-5 py-2.5 bg-white text-black text-xs tracking-wider uppercase hover:bg-stone-200 transition-colors">Unirse</button>
                </>
              )}
            </form>
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