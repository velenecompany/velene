'use client';

import { useState } from 'react';

export default function PartnersPage() {
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    business_type: '',
    volume_range: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-6">✦</div>
          <h2 className="text-2xl font-light tracking-widest uppercase mb-4">Solicitud Recibida</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Gracias por tu interés en distribuir VELENÉ. Revisaremos tu aplicación y nos pondremos en contacto contigo en los próximos días hábiles.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">VELENÉ — Distribución Autorizada</p>
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-6">Partners</h1>
        <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
          Seleccionamos a nuestros distribuidores con cuidado. Si compartes nuestra visión de athleisure premium, queremos conocerte.
        </p>
      </section>

      {/* Beneficios */}
      <section className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { icon: '◈', title: 'Acceso Anticipado', desc: 'Primero en recibir nuevos drops y colecciones limitadas antes del lanzamiento público.' },
          { icon: '◇', title: 'Precios de Mayoreo', desc: 'Márgenes competitivos diseñados para distribuidores seleccionados.' },
          { icon: '○', title: 'Soporte de Marca', desc: 'Materiales de marketing, guías de visual merchandising y soporte directo.' },
        ].map(b => (
          <div key={b.title} className="border border-white/10 p-8">
            <div className="text-2xl mb-4 text-white/30">{b.icon}</div>
            <h3 className="text-xs tracking-[0.3em] uppercase mb-3">{b.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </section>

      {/* Formulario */}
      <section className="max-w-2xl mx-auto px-6 pb-32">
        <div className="border border-white/10 p-8 md:p-12">
          <h2 className="text-xs tracking-[0.4em] uppercase text-white/40 mb-8 text-center">Formulario de Aplicación</h2>

          <div className="space-y-5">
            {/* Empresa y Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Empresa *</label>
                <input name="company_name" value={form.company_name} onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="Nombre de tu empresa" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Contacto *</label>
                <input name="contact_name" value={form.contact_name} onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="Tu nombre completo" />
              </div>
            </div>

            {/* Email y Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="email@empresa.com" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Teléfono</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="+52 33 0000 0000" />
              </div>
            </div>

            {/* Ciudad y Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Ciudad</label>
                <input name="city" value={form.city} onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="Guadalajara" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Estado</label>
                <input name="state" value={form.state} onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="Jalisco" />
              </div>
            </div>

            {/* Tipo de negocio */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Tipo de Negocio</label>
              <select name="business_type" value={form.business_type} onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors">
                <option value="">Selecciona una opción</option>
                <option value="boutique">Boutique / Tienda física</option>
                <option value="ecommerce">E-commerce</option>
                <option value="gym">Gimnasio / Studio</option>
                <option value="department">Tienda departamental</option>
                <option value="other">Otro</option>
              </select>
            </div>

            {/* Volumen */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Volumen Mensual Estimado *</label>
              <select name="volume_range" value={form.volume_range} onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors">
                <option value="">Selecciona un rango</option>
                <option value="47-100">47 – 100 piezas</option>
                <option value="100-200">100 – 200 piezas</option>
                <option value="200+">200+ piezas</option>
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/30 mb-2">Cuéntanos sobre tu negocio</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none"
                placeholder="¿Dónde distribuyes? ¿Qué tipo de cliente tienes? ¿Por qué VELENÉ?" />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs text-center tracking-widest">Ocurrió un error. Intenta de nuevo.</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="w-full bg-white text-black text-xs tracking-[0.3em] uppercase py-4 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Aplicación'}
            </button>

            <p className="text-white/20 text-xs text-center leading-relaxed">
              Solo aceptamos un número limitado de distribuidores por región para mantener la exclusividad de la marca.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}