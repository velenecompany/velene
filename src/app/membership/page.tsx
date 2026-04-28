'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const FOUNDING_SPOTS = 30;

const TIERS = [
  {
    name: 'Pace',
    price: '$499',
    period: '/mes',
    description: 'Empieza a moverte con Velené.',
    benefits: [
      '10% descuento en todo',
      'Envío gratis en compras +$1,500',
    ],
  },
  {
    name: 'Drive',
    price: '$999',
    period: '/mes',
    description: 'El impulso para ir más lejos.',
    featured: true,
    benefits: [
      'Preventa exclusiva en drops',
      '10% descuento en todo',
      'Acceso a colorways exclusivos',
      'Envío gratis durante membresía',
    ],
  },
  {
    name: 'Apex',
    price: '$1,299',
    period: '/mes',
    description: 'La cima. Sin excepciones.',
    benefits: [
      'Preventa exclusiva en drops',
      '15% descuento en todo',
      'Acceso a colorways exclusivos',
      'Envío gratis durante membresía',
      'Drops privados antes que nadie',
      'Acceso a colecciones limitadas',
    ],
  },
];

export default function MembershipPage() {
const [selected, setSelected] = useState<string | null>(null);
  const [spotsLeft, setSpotsLeft] = useState(25);
  const [showFoundingForm, setShowFoundingForm] = useState(false);
  const [foundingEmail, setFoundingEmail] = useState('');
  const [foundingNombre, setFoundingNombre] = useState('');
  const [foundingMsg, setFoundingMsg] = useState('');

  useEffect(() => {
    fetch('/api/founding-member').then(r => r.json()).then(d => setSpotsLeft(25 - d.spots_taken));
  }, []);

  async function joinFounding() {
    const res = await fetch('/api/founding-member', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: foundingEmail, nombre: foundingNombre })
    });
    const d = await res.json();
    if (res.ok) setFoundingMsg('¡Bienvenido a los Founding Members!');
    else setFoundingMsg(d.error || 'Algo salió mal');
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F2ED]">

        {/* Hero */}
        <section className="bg-black text-white px-6 py-24 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">Velené · Membresía</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-6">Founding Members</h1>
          <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed mb-10">
            Las primeras 25 personas que se unan a Velené tendrán acceso de por vida a preventas, descuentos exclusivos y drops privados.
          </p>
          <div className="inline-flex items-center gap-3 border border-white/20 px-6 py-3">
            <span className="font-display text-2xl font-light">{spotsLeft}</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">de {FOUNDING_SPOTS} spots disponibles</span>
          </div>
        </section>

        {/* Founding Members Benefits */}
        <section className="max-w-screen-xl mx-auto px-6 py-20 border-b border-stone-200">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4">Founding Members · Gratis de por vida</p>
              <h2 className="font-display text-4xl font-light mb-6">Entra ahora.<br />Permanece para siempre.</h2>
              <p className="text-sm text-stone-500 leading-relaxed">
                Solo 25 personas tendrán acceso completo a todo lo que Velené construye — antes que nadie, mejor que nadie.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Preventa exclusiva en todos los drops',
                'Descuento permanente del 10%',
                'Acceso a colorways que nunca salen al público',
                'Tu nombre en la página de Founders',
                'Envío gratis de por vida',
                'Drops privados antes que nadie',
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-stone-900 mt-0.5">—</span>
                  <p className="text-sm text-stone-600">{b}</p>
                </div>
              ))}
              <div className="pt-4">
{!showFoundingForm ? (
                  <button onClick={() => setShowFoundingForm(true)} className="w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                    Unirme como Founding Member
                  </button>
                ) : (
                  <div className="space-y-3">
                    <input value={foundingNombre} onChange={e => setFoundingNombre(e.target.value)} placeholder="Tu nombre" className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900" />
                    <input value={foundingEmail} onChange={e => setFoundingEmail(e.target.value)} placeholder="Tu email" type="email" className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900" />
                    {foundingMsg && <p className="text-xs text-emerald-600">{foundingMsg}</p>}
                    <button onClick={joinFounding} className="w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                      Confirmar
                    </button>
                  </div>
                )}
                <p className="text-[10px] text-stone-400 text-center mt-2">Quedan {spotsLeft} spots · Completamente gratis</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="max-w-screen-xl mx-auto px-6 py-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4 text-center">Membresías</p>
          <h2 className="font-display text-4xl font-light mb-16 text-center">Elige tu nivel.</h2>
          <div className="grid md:grid-cols-3 gap-px bg-stone-200">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`p-10 ${tier.featured ? 'bg-black text-white' : 'bg-white'}`}>
                <p className={`text-[10px] tracking-[0.3em] uppercase mb-2 ${tier.featured ? 'text-white/40' : 'text-stone-400'}`}>Velené</p>
                <h3 className="font-display text-4xl font-light mb-2">{tier.name}</h3>
                <p className={`text-sm mb-6 ${tier.featured ? 'text-white/60' : 'text-stone-400'}`}>{tier.description}</p>
                <p className="font-display text-3xl font-light mb-8">
                  {tier.price}<span className={`text-sm font-sans ${tier.featured ? 'text-white/40' : 'text-stone-400'}`}>{tier.period}</span>
                </p>
                <div className="space-y-3 mb-10">
                  {tier.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={tier.featured ? 'text-white/40' : 'text-stone-300'}>—</span>
                      <p className={`text-sm ${tier.featured ? 'text-white/80' : 'text-stone-600'}`}>{b}</p>
                    </div>
                  ))}
                </div>
                <button
onClick={async () => { const res = await fetch('/api/membership/checkout', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({tier: tier.name})}); const {url} = await res.json(); window.location.href = url; }}
                  className={`w-full py-4 text-xs tracking-[0.2em] uppercase transition-colors ${
                    tier.featured
                      ? 'bg-white text-black hover:bg-stone-100'
                      : 'bg-black text-white hover:bg-stone-800'
                  }`}>
                  Unirme a {tier.name}
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
