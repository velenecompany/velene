'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactoPage() {
  const [form, setForm] = useState({ name: '', email: '', asunto: '', mensaje: '' });
  const [status, setStatus] = useState('idle');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-24 min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-3xl mb-8 text-stone-300">✦</div>
            <h2 className="font-display text-3xl font-light mb-6">Mensaje recibido</h2>
            <p className="text-sm text-stone-500 leading-loose">Gracias por contactarnos. Te respondemos en menos de 24 horas.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-[#FAFAF8]">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-4">VELENE</p>
            <h1 className="font-display text-5xl font-light mb-6">Contactanos</h1>
            <p className="text-sm text-stone-500 leading-loose max-w-md">Para dudas sobre pedidos, tallas, colaboraciones o cualquier otra consulta. Respondemos en menos de 24 horas.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">Email</p>
                <a href="mailto:velacontacto2@gmail.com" className="text-sm text-stone-700 hover:text-stone-900 transition-colors border-b border-stone-300 pb-px">velacontacto2@gmail.com</a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">Telefono</p>
                <a href="tel:+523324261099" className="text-sm text-stone-700 hover:text-stone-900 transition-colors">+52 33 2426 1099</a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">WhatsApp</p>
                <a href="https://wa.me/523324261099?text=Hola%20VELENE%2C%20tengo%20una%20consulta" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-stone-300 px-6 py-3 text-xs tracking-[0.2em] uppercase text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                  Escribir por WhatsApp
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">Horario</p>
                <p className="text-sm text-stone-600">Lunes a Viernes — 9:00 a 18:00 hrs</p>
                <p className="text-sm text-stone-500">Guadalajara, Mexico (CST)</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">Redes sociales</p>
                <div className="flex gap-5">
                  <a href="https://www.instagram.com/velene.club/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                  </a>
                  <a href="https://www.tiktok.com/@velene.club" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">Nombre</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 pb-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full bg-transparent border-b border-stone-300 pb-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">Asunto</label>
                <select name="asunto" value={form.asunto} onChange={handleChange} className="w-full bg-[#FAFAF8] border-b border-stone-300 pb-3 text-sm text-stone-900 focus:outline-none focus:border-stone-600 transition-colors">
                  <option value="">Selecciona un asunto</option>
                  <option value="pedido">Duda sobre mi pedido</option>
                  <option value="talla">Guia de tallas</option>
                  <option value="colaboracion">Colaboracion</option>
                  <option value="mayoreo">Mayoreo / Partners</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">Mensaje</label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={5} className="w-full bg-transparent border-b border-stone-300 pb-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors resize-none" placeholder="En que podemos ayudarte?" />
              </div>
              {status === 'error' && <p className="text-red-400 text-xs tracking-widest uppercase">Ocurrio un error. Intenta de nuevo.</p>}
              <button onClick={handleSubmit} disabled={status === 'loading'} className="w-full bg-stone-900 text-white text-xs tracking-[0.3em] uppercase py-4 hover:bg-stone-700 transition-colors disabled:opacity-40">
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
