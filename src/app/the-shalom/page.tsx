'use client';
import { useState, useEffect, useRef } from 'react';

const LAUNCH_DATE = new Date('2026-08-28T00:00:00-06:00').getTime();

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = LAUNCH_DATE - Date.now();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
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
  return time;
}

export default function TheShalomPage() {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const time = useCountdown();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const onScroll = () => { el.style.transform = `translate3d(0,${window.scrollY * 0.3}px,0)`; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  async function handleSubmit() {
    if (!phone.trim() || phone.length < 10) { setError('Ingresa un número válido'); return; }
    setLoading(true);
    setError('');
    try {
      await fetch('/api/shalom-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      setSubmitted(true);
    } catch {
      setError('Algo salió mal. Intenta de nuevo.');
    }
    setLoading(false);
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Fondo parallax */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, top: '-10%', height: '120%' }}>
        <img src="/shalom-bg.jpg" alt="The Shalom" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
        <p className="font-display text-xl font-light tracking-[0.3em] uppercase text-white">VELENÉ</p>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#B8A87A] mb-6">Drop 002</p>
        <h1 className="font-display text-[clamp(56px,12vw,120px)] font-light text-white leading-none mb-4">
          The Shalom
        </h1>
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-16">GDL — 2026 — Edición limitada</p>

        {/* Countdown */}
        <div className="flex items-end justify-center gap-6 mb-16">
          {[
            { val: time.days, label: 'días' },
            { val: time.hours, label: 'hrs' },
            { val: time.minutes, label: 'min' },
            { val: time.seconds, label: 'seg' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-5xl md:text-6xl font-light text-white leading-none">{String(val).padStart(2, '0')}</p>
              <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <div className="w-full max-w-sm mx-auto">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-6">Registra tu número para acceso anticipado</p>
            <div className="flex gap-0 mb-3">
              <div className="bg-white/10 border border-white/20 px-4 flex items-center">
                <span className="text-white/60 text-sm">+52</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setError(''); }}
                placeholder="33 1234 5678"
                maxLength={10}
                className="flex-1 bg-white/10 border border-l-0 border-white/20 px-4 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
            {error && <p className="text-[10px] text-red-400 mb-3">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-white text-[#0A0A0A] text-[11px] tracking-[0.3em] uppercase hover:bg-[#F5F2ED] transition-colors disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Obtener acceso'}
            </button>
            <p className="text-[9px] text-white/20 mt-4 leading-relaxed">
              Al registrarte aceptas recibir notificaciones sobre el lanzamiento de The Shalom.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-sm mx-auto">
            <div className="border border-[#B8A87A]/40 px-8 py-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#B8A87A] mb-4">✦ Registrado</p>
              <p className="font-display text-2xl font-light text-white mb-3">Te avisamos el</p>
              <p className="font-display text-4xl font-light text-[#B8A87A]">28 · 08 · 26</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mt-6">Guadalajara, México</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 z-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20">velene.club</p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20">28 ago 2026</p>
      </div>
    </main>
  );
}