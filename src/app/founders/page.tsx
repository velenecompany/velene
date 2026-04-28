'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Founder {
  nombre: string;
  created_at: string;
}

export default function FoundersPage() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/founding-member?list=true')
      .then(r => r.json())
      .then(data => {
        setFounders(data.founders || []);
        setCount(data.count || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatSpot = (i: number) => String(i + 1).padStart(3, '0');

  const formatNombre = (nombre: string) => {
    if (!nombre) return 'Founding Member';
    const parts = nombre.trim().split(' ');
    if (parts.length === 1) return parts[0];
    return parts[0] + ' ' + parts[parts.length - 1][0] + '.';
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        <section className="max-w-screen-xl mx-auto px-6 pt-32 pb-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4">Velené</p>
          <h1 className="font-display text-6xl md:text-8xl font-light mb-6">Founders</h1>
          <p className="text-sm text-stone-500 max-w-md leading-relaxed">
            Las primeras {count} personas que creyeron en Velené antes que nadie. Su nombre permanece aquí para siempre.
          </p>
        </section>

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-stone-200 w-full" />
        </div>

        <section className="max-w-screen-xl mx-auto px-6 py-10">
          <div className="flex items-center gap-6">
            <span className="font-display text-5xl font-light">{count}</span>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-stone-900">de 30 founders</p>
              <p className="text-xs text-stone-400 mt-1">{30 - count} spots restantes</p>
            </div>
            <div className="ml-auto hidden md:block">
              <div className="flex gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className={'h-8 w-1 ' + (i < count ? 'bg-stone-900' : 'bg-stone-100')} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-stone-200 w-full" />
        </div>

        <section className="max-w-screen-xl mx-auto px-6 py-20">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-stone-50 animate-pulse" />
              ))}
            </div>
          ) : founders.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-stone-400">Se el primero en unirte.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {founders.map((f, i) => (
                <div key={i} className="flex items-center gap-6 py-5 group hover:bg-stone-50 px-2 -mx-2 transition-colors">
                  <span className="font-display text-stone-300 text-sm w-10 shrink-0">#{formatSpot(i)}</span>
                  <span className="text-stone-900 text-sm tracking-wide flex-1">{formatNombre(f.nombre)}</span>
                  <span className="text-[10px] text-stone-300 tracking-[0.15em] uppercase hidden md:block">Founding Member</span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 30 - count) }).map((_, i) => (
                <div key={'empty-' + i} className="flex items-center gap-6 py-5 px-2 -mx-2">
                  <span className="font-display text-stone-200 text-sm w-10 shrink-0">#{formatSpot(count + i)}</span>
                  <span className="text-stone-200 text-sm tracking-wide flex-1">- disponible</span>
                  <span className="text-[10px] text-stone-200 tracking-[0.15em] uppercase hidden md:block">Founding Member</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {count < 30 && (
          <>
            <div className="max-w-screen-xl mx-auto px-6">
              <div className="h-px bg-stone-200 w-full" />
            </div>
            <section className="max-w-screen-xl mx-auto px-6 py-20 text-center">
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4">{30 - count} spots restantes</p>
              <h2 className="font-display text-4xl font-light mb-6">Tu nombre puede estar aqui.</h2>
              <p className="text-sm text-stone-500 mb-10 max-w-sm mx-auto leading-relaxed">
                Unete gratis antes de que se acaben los spots. Tu nombre quedara aqui para siempre.
              </p>
              <a href="/membership" className="inline-block py-4 px-10 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                Unirme como Founding Member
              </a>
            </section>
          </>
        )}

      </main>
      <Footer />
    </>
  );
}
