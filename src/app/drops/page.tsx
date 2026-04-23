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
          <h1 className="font-display text-7xl md:text-9xl font-light tracking-tight text-stone-900 leading-none mb-4">The Conclave</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mt-6">GDL · 2025 · Edición limitada</p>
        </section>

        {/* Conjuntos */}
        <section className="max-w-screen-xl mx-auto px-6 pb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">Sets</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {[
              { img: '/drop-1.jpg', color: 'Rosa', slug: 'set-conclave-rosa' },
              { img: '/drop-3.jpg', color: 'Beige', slug: 'set-conclave-beige' },
              { img: '/drop-2.jpg', color: 'Azul', slug: 'set-conclave-azul' },
            ].map(({ img, color, slug }) => (
              <div key={slug} className="bg-[#FAFAF8] group">
                <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                  <img src={img} alt={`Set Conclave ${color}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Set Conclave</p>
                  <p className="font-display text-xl font-light text-stone-900 mb-1">{color}</p>
                  <p className="text-[11px] text-stone-500 leading-relaxed mb-1">Bordado premium · Serigrafía de alta definición</p>
                  <p className="font-display text-lg text-stone-900 mb-4">$899 <span className="text-xs text-stone-400">MXN</span></p>
                  <Link href={`/shop/${slug}`} className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px hover:text-stone-500 transition-colors">Ver pieza →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Playeras */}
        <section className="max-w-screen-xl mx-auto px-6 pb-24 mt-12">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">T-Shirts</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {[
              { img: '/drop-1.jpg', color: 'Rosa', slug: 'playera-conclave-rosa' },
              { img: '/drop-3.jpg', color: 'Beige', slug: 'playera-conclave-beige' },
              { img: '/drop-2.jpg', color: 'Azul', slug: 'playera-conclave-azul' },
            ].map(({ img, color, slug }) => (
              <div key={slug} className="bg-[#FAFAF8] group">
                <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                  <img src={img} alt={`T-Shirt Conclave ${color}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">T-Shirt Conclave</p>
                  <p className="font-display text-xl font-light text-stone-900 mb-1">{color}</p>
                  <p className="text-[11px] text-stone-500 leading-relaxed mb-1">Bordado premium · Serigrafía de alta definición</p>
                  <p className="font-display text-lg text-stone-900 mb-4">$599 <span className="text-xs text-stone-400">MXN</span></p>
                  <Link href={`/shop/${slug}`} className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px hover:text-stone-500 transition-colors">Ver pieza →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
