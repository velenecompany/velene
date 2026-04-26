'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { addToCart } from '@/store/cart';

const FOTOS = ['/IMG_9368.jpg', '/IMG_9377.jpg', '/IMG_9082.jpg', '/muckup azul completo.jpg', '/muckup azul detras.jpg'];

export default function PlayeraAzul() {
  const [fotoActiva, setFotoActiva] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const [agregado, setAgregado] = useState(false);

  function agregarCarrito() {
    if (!tallaSeleccionada) { alert('Selecciona una talla'); return; }
    addToCart({ id: 'playera-conclave-azul', slug: 'playera-conclave-azul', nombre: 'The Conclave T-Shirt Azul', talla: tallaSeleccionada, precio: 599, imagen: '/mockup-azul.jpg' });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <p className="text-[11px] text-stone-400 mb-8">
            <Link href="/" className="hover:text-stone-700">Inicio</Link> / <Link href="/drops" className="hover:text-stone-700">Drops</Link> / The Conclave T-Shirt Azul
          </p>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="aspect-[3/4] overflow-hidden mb-3">
                <img src={FOTOS[fotoActiva]} alt="The Conclave T-Shirt Azul" className="w-full h-full object-cover transition-all duration-500" />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {FOTOS.map((f, i) => (
                  <button key={i} onClick={() => setFotoActiva(i)} className={`aspect-square overflow-hidden border-2 transition-all ${fotoActiva === i ? 'border-black' : 'border-transparent'}`}>
                    <img src={f} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-3">The Conclave · Drop 001</p>
              <h1 className="font-display text-5xl font-light mb-4">The Conclave T-Shirt Azul</h1>
              <p className="font-display text-3xl mb-2">$599 <span className="text-sm font-sans text-stone-400">MXN</span></p>
              <p className="text-[11px] text-emerald-600 tracking-wide mb-8">✓ Envío gratis</p>
              <p className="text-sm text-stone-500 leading-relaxed mb-8">Diseño posterior desarrollado mediante serigrafía de alta calidad, garantizando definición, resistencia y presencia visual duradera. Logotipo frontal elaborado con bordado premium, aportando textura, identidad y acabado superior.</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-3">Talla</p>
              <div className="flex gap-2 mb-8">
                {['S', 'M', 'L'].map(t => (
                  <button key={t} onClick={() => setTallaSeleccionada(t)} className={`w-12 h-12 border text-sm transition-all ${tallaSeleccionada === t ? 'border-black bg-black text-white' : 'border-stone-200 hover:border-stone-400'}`}>{t}</button>
                ))}
              </div>
              <button onClick={agregarCarrito} className={`w-full py-4 text-xs tracking-[0.2em] uppercase transition-all mb-3 ${agregado ? 'bg-stone-700 text-white' : 'bg-black text-white hover:bg-stone-800'}`}>
                {agregado ? '✓ Añadido al carrito' : 'Añadir al carrito'}
              </button>
              <Link href="/cart" className="block w-full py-4 border border-black text-center text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all">Ver carrito</Link>
              <div className="border-t border-stone-100 mt-8 pt-6 space-y-2">
                <p className="text-[11px] text-stone-400">— Playera crop oversized · construcción premium</p>
                <p className="text-[11px] text-stone-400">— Bordado premium en logotipo frontal · textura y acabado superior</p>
                <p className="text-[11px] text-stone-400">— Serigrafía de alta definición en diseño posterior · resistencia duradera</p>
                <p className="text-[11px] text-stone-400">— Disponible en S, M y L</p>
                <p className="text-[11px] text-stone-400">— Envío gratis a todo México</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
