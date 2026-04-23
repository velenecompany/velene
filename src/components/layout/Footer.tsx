'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/subscribe', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, source: 'footer' }) });
    setSubmitted(true);
  }

  return (
    <footer className="bg-[#0A0A0A] text-white mt-24">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <p className="font-display text-3xl font-light tracking-[0.2em] uppercase mb-4">Vélene</p>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">Performance built for discipline. Wear made for those who don't stop.</p>
            <form onSubmit={subscribe} className="mt-6 flex gap-2">
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
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-4">Tienda</p>
            {['Shop', 'Drops', 'Collections', 'About'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="block text-sm text-stone-400 hover:text-white transition-colors py-1">{l}</Link>
            ))}
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-4">Soporte</p>
            {['Size Guide', 'Returns', 'Contact', 'FAQ'].map(l => (
              <Link key={l} href="#" className="block text-sm text-stone-400 hover:text-white transition-colors py-1">{l}</Link>
            ))}
          </div>
        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-stone-600 tracking-wider">© 2025 VÉLENE. Todos los derechos reservados.</p>
          <p className="text-[11px] text-stone-600 tracking-wider">Guadalajara, México</p>
        </div>
      </div>
    </footer>
  );
}
