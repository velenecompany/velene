'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MembershipPage() {
  const [totalSpent, setTotalSpent] = useState<number | null>(null);
  const [tier, setTier] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          setTotalSpent(parseFloat(d.data.total_spent || 0));
          setTier(d.data.membership_tier || null);
        }
      });
  }, []);

  const tiers = [
    {
      name: 'Pace',
      threshold: 2500,
      discount: 5,
      hours: 24,
      benefits: [
        'Acceso anticipado a drops 24 horas antes',
        '5% de descuento en todas tus compras',
        'Notificaciones exclusivas de nuevas colecciones',
      ],
      badgeStyle: { background: '#C9B99A', color: '#4a3d2a' },
    },
    {
      name: 'Drive',
      threshold: 5000,
      discount: 10,
      hours: 48,
      benefits: [
        'Acceso anticipado a drops 48 horas antes',
        '10% de descuento en todas tus compras',
        'Acceso a colorways limitados',
        'Envio gratis en todos tus pedidos',
      ],
      badgeStyle: { background: '#8FA3B1', color: '#1a2530' },
    },
    {
      name: 'Apex',
      threshold: 7500,
      discount: 15,
      hours: 72,
      benefits: [
        'Acceso anticipado a drops 72 horas antes',
        '15% de descuento permanente',
        'Acceso a piezas que nunca salen al publico',
        'Envio gratis de por vida',
        'Invitaciones a eventos privados de Velene',
        'Tu nombre en nuestra comunidad',
      ],
      badgeStyle: { background: '#B8A87A', color: '#3d3017' },
      featured: true,
    },
  ];

  const getProgress = (threshold: number) => {
    if (totalSpent === null) return 0;
    return Math.min((totalSpent / threshold) * 100, 100);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        <section className="max-w-screen-xl mx-auto px-6 pt-32 pb-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4">Velene</p>
          <h1 className="font-display text-6xl md:text-8xl font-light mb-6">Membership</h1>
          <p className="text-sm text-stone-500 max-w-lg leading-relaxed">
            No es una suscripcion. No pagas por pertenecer.
            Lo ganas comprando. Cada peso que inviertes en Velene cuenta — y una vez que alcanzas tu nivel, es tuyo para siempre.
          </p>
        </section>

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-stone-200 w-full" />
        </div>

        {totalSpent !== null && (
          <section className="max-w-screen-xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-[0.2em] uppercase text-stone-500">Tu progreso</p>
              {tier ? (
                <span
                  className="text-[9px] tracking-[0.3em] uppercase px-3 py-1"
                  style={tiers.find(t => t.name === tier)?.badgeStyle || {background:'#0A0A0A', color:'#F5F2ED'}}>
                  {tier}
                </span>
              ) : (
                <span className="text-[9px] tracking-[0.3em] uppercase text-stone-400">Sin tier aun</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl font-light">${totalSpent.toLocaleString('es-MX')}</span>
              <span className="text-xs text-stone-400">MXN acumulados</span>
            </div>
            {tier !== 'Apex' && (
              <div className="mt-4">
                <div className="h-1 bg-stone-100 w-full">
                  <div
                    className="h-1 transition-all"
                    style={{
                      width: getProgress(tier === 'Pace' ? 5000 : tier === null ? 2500 : 7500) + '%',
                      background: tier === 'Drive' ? '#8FA3B1' : tier === 'Pace' ? '#C9B99A' : '#B8A87A'
                    }}
                  />
                </div>
                <p className="text-[10px] text-stone-400 mt-2">
                  {tier === null && 'Te faltan $' + (2500 - totalSpent).toLocaleString('es-MX') + ' MXN para Pace'}
                  {tier === 'Pace' && 'Te faltan $' + (5000 - totalSpent).toLocaleString('es-MX') + ' MXN para Drive'}
                  {tier === 'Drive' && 'Te faltan $' + (7500 - totalSpent).toLocaleString('es-MX') + ' MXN para Apex'}
                </p>
              </div>
            )}
          </section>
        )}

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-stone-200 w-full" />
        </div>

        <section className="max-w-screen-xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-px bg-stone-200">
            {tiers.map((t) => (
              <div key={t.name} className={'p-10 ' + (t.featured ? 'bg-[#0A0A0A] text-white' : 'bg-white')}>
                <span
                  className="inline-block text-[9px] tracking-[0.3em] uppercase px-3 py-1 mb-4"
                  style={t.badgeStyle}>
                  {t.name}
                </span>
                <h3 className="font-display text-4xl font-light mb-2">{t.name}</h3>
                <p className={'text-sm mb-6 ' + (t.featured ? 'text-white/60' : 'text-stone-400')}>
                  A partir de ${t.threshold.toLocaleString('es-MX')} MXN acumulados
                </p>
                <p className="font-display text-5xl font-light mb-2">{t.discount}%</p>
                <p className={'text-xs mb-8 ' + (t.featured ? 'text-white/40' : 'text-stone-400')}>de descuento permanente</p>
                <div className="space-y-3">
                  {t.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={t.featured ? 'text-white/40' : 'text-stone-300'}>—</span>
                      <p className={'text-sm ' + (t.featured ? 'text-white/80' : 'text-stone-600')}>{b}</p>
                    </div>
                  ))}
                </div>
                {tier === t.name && (
                  <div className={'mt-8 py-3 text-center text-[9px] tracking-[0.3em] uppercase border ' + (t.featured ? 'border-white/20 text-white/60' : 'border-stone-200 text-stone-400')}>
                    Tu nivel actual
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="h-px bg-stone-200 w-full" />
        </div>

        <section className="max-w-screen-xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-4xl font-light mb-6">Tu nivel nunca baja.</h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            Cada compra suma. Una vez que alcanzas Apex, es tuyo de por vida — sin importar cuanto tiempo pase.
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}