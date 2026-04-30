'use client';

import { useState } from 'react';

export default function PartnersPage() {
  const [form, setForm] = useState({
    contact_name: '',
    email: '',
    phone: '',
    company_name: '',
    city_state: '',
    instagram_website: '',
    business_type: '',
    volume_range: '',
    customer_type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-3xl mb-8 text-white/20">✦</div>
          <h2 className="text-xl font-light tracking-[0.3em] uppercase mb-6">Solicitud Recibida</h2>
          <p className="text-white/40 text-sm leading-loose">
            Revisamos cada solicitud manualmente. Te contactamos en menos de 72 horas.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-6">VELENÉ — Partners</p>
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-8 leading-tight">
          Partners
        </h1>
        <p className="text-white/50 text-sm leading-loose">
          No buscamos revendedores. Buscamos personas que entiendan lo que estamos construyendo.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Lo que significa */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-6">
          Lo que significa ser Partner Autorizado
        </p>
        <p className="text-white/60 text-sm leading-loose mb-6">
          Ser distribuidor autorizado de VELENÉ no es abrir una cuenta y pedir piezas. Es un acuerdo
          de largo plazo donde ambas partes ganan — tú accedes a producto exclusivo con margen real,
          nosotros crecemos con personas que cuidan la marca como nosotros.
        </p>
        <p className="text-white/60 text-sm leading-loose">
          Los partners autorizados reciben acceso al catálogo de precios mayoreo, acceso anticipado
          a cada drop antes que el público, y soporte directo del equipo Velené para pedidos y
          contenido.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Cómo funciona */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-6">Cómo funciona</p>
        <p className="text-white/60 text-sm leading-loose mb-6">
          Trabajamos por temporadas. Cada drop tiene un ciclo de producción de aproximadamente dos
          meses y medio — desde el diseño hasta la pieza en tus manos. Los pedidos se confirman con
          anticipación, no sobre la marcha.
        </p>
        <p className="text-white/60 text-sm leading-loose">
          Una vez que confirmas tu pedido, entra directamente a maquila. No hay cambios después de
          esa fecha. Para arrancar producción solicitamos un anticipo del 50% — el resto se liquida
          contra entrega.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Requisitos */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-8">Requisitos</p>
        <ul className="space-y-4">
          {[
            'Pedido inicial mínimo de $15,000 MXN',
            'Pedido mensual mínimo de $8,000 MXN para mantener el estatus',
            'Zona exclusiva — un partner por ciudad o zona geográfica',
            'Respetar el precio de venta sugerido al público',
            'No vender en marketplaces como Amazon o Mercado Libre',
            'Usar únicamente material visual oficial de la marca',
          ].map(r => (
            <li key={r} className="flex items-start gap-4 text-sm text-white/60 leading-relaxed">
              <span className="text-white/20 mt-0.5 shrink-0">—</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Lo que no negociamos */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-6">
          Lo que no negociamos
        </p>
        <p className="text-white/60 text-sm leading-loose">
          El precio al público es el precio al público. No importa si tienes exceso de inventario,
          si hay una fecha especial o si la competencia vende más barato — las piezas Velené
          mantienen su valor. Eso protege tu inversión y la nuestra.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Formulario */}
      <section className="max-w-2xl mx-auto px-6 py-16 pb-32">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-4">Aplica</p>
        <p className="text-white/50 text-sm leading-loose mb-12">
          Si llegaste hasta aquí y todo tiene sentido para ti, nos interesa conocerte. Revisamos
          cada solicitud en menos de 72 horas. Las aplicaciones se revisan manualmente — no
          aprobamos a todos.
        </p>

        <div className="space-y-8">

          {/* Nombre */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              Nombre Completo
            </label>
            <input
              name="contact_name"
              value={form.contact_name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Tu nombre"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="email@ejemplo.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              Teléfono / WhatsApp
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="+52 33 0000 0000"
            />
          </div>

          {/* Negocio */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              Nombre de tu Negocio
            </label>
            <input
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Nombre comercial"
            />
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              Ciudad y Estado
            </label>
            <input
              name="city_state"
              value={form.city_state}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Guadalajara, Jalisco"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              Instagram o Sitio Web
            </label>
            <input
              name="instagram_website"
              value={form.instagram_website}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="@tunegocio o tunegocio.com"
            />
          </div>

          {/* Tipo de tienda */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-5">
              Tipo de Tienda
            </label>
            <div className="flex gap-8">
              {['Tienda física', 'Tienda online', 'Ambas'].map(opt => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setForm(prev => ({ ...prev, business_type: opt }))}
                    className={`w-4 h-4 border transition-colors cursor-pointer ${
                      form.business_type === opt
                        ? 'border-white bg-white'
                        : 'border-white/30 group-hover:border-white/60'
                    }`}
                  />
                  <span className="text-xs tracking-widest uppercase text-white/50">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Volumen */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-5">
              Volumen Primer Pedido Estimado
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['47 – 100 pz', '100 – 150 pz', '150 – 200 pz', '200+ pz'].map(opt => (
                <div
                  key={opt}
                  onClick={() => setForm(prev => ({ ...prev, volume_range: opt }))}
                  className={`border px-4 py-3 text-xs tracking-widest uppercase text-center cursor-pointer transition-colors ${
                    form.volume_range === opt
                      ? 'border-white text-white'
                      : 'border-white/20 text-white/40 hover:border-white/40'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de cliente */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              ¿A qué tipo de cliente le vendes?
            </label>
            <input
              name="customer_type"
              value={form.customer_type}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Describe a tu cliente"
            />
          </div>

          {/* Por qué VELENÉ */}
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-white/30 mb-3">
              ¿Por qué quieres vender VELENÉ?{' '}
              <span className="normal-case text-white/20">(máx. 300 caracteres)</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              maxLength={300}
              rows={3}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/50 transition-colors resize-none"
              placeholder="Cuéntanos brevemente"
            />
            <p className="text-white/20 text-xs mt-1 text-right">{form.message.length}/300</p>
          </div>

          {status === 'error' && (
            <p className="text-red-400/70 text-xs tracking-widest uppercase text-center">
              Ocurrió un error. Intenta de nuevo.
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="w-full bg-white text-black text-xs tracking-[0.4em] uppercase py-5 hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-4"
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
          </button>

        </div>
      </section>
    </main>
  );
}