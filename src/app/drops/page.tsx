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
          <h1 className="font-display text-7xl font-light tracking-tight text-stone-900 leading-none mb-4">The Conclave</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mt-6">GDL · 2025 · Edición limitada</p>
        </section>
        <section className="border-t border-stone-100 py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <p className="font-display text-3xl font-light text-stone-900 max-w-md leading-snug">
              Piezas diseñadas para quienes entienden que el movimiento es identidad.
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mt-6">3 colorways · Edición única · Disponibilidad limitada</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
