import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DropsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-[#FAFAF8] min-h-screen">
        <section className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-6">Colección activa</p>
          <h1 className="font-display text-7xl md:text-9xl font-light tracking-tight text-stone-900 leading-none mb-4">
            The<br />Conclave
          </h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mt-6">GDL · 2025 · Edición limitada</p>
        </section>
        <section className="max-w-screen-xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            <div className="bg-[#FAFAF8] group">
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                <img src="/drop-1.jpg" alt="The Conclave" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Set Conclave</p>
                <p className="font-display text-xl font-light text-stone-900 mb-1">Rosa</p>
                <p className="text-[11px] text-stone-500 leading-relaxed mb-4">Bordado premium · Serigrafía de alta definición</p>
                <Link href="/shop/set-conclave-rosa" className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza →</Link>
              </div>
            </div>
            <div className="bg-[#FAFAF8] group">
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                <img src="/drop-2.jpg" alt="The Conclave" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Set Conclave</p>
                <p className="font-display text-xl font-light text-stone-900 mb-1">Beige</p>
                <p className="text-[11px] text-stone-500 leading-relaxed mb-4">Bordado premium · Serigrafía de alta definición</p>
                <Link href="/shop/set-conclave-beige" className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza →</Link>
              </div>
            </div>
            <div className="bg-[#FAFAF8] group">
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                <img src="/drop-3.jpg" alt="The Conclave" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Set Conclave</p>
                <p className="font-display text-xl font-light text-stone-900 mb-1">Azul</p>
                <p className="text-[11px] text-stone-500 leading-relaxed mb-4">Bordado premium · Serigrafía de alta definición</p>
                <Link href="/shop/set-conclave-azul" className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza →</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-stone-100 py-24">
          <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <p className="font-display text-3xl md:text-4xl font-light text-stone-900 max-w-md leading-snug">
              Piezas diseñadas para quienes entienden que el movimiento es identidad.
            </p>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Disponibilidad limitada</p>
              <p className="text-[11px] text-stone-500">3 colorways · Edición única</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
