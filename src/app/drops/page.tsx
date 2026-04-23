import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SETS = [
  { img: '/drop-1.jpg', color: 'Rosa', slug: 'set-conclave-rosa', precio: '$899' },
  { img: '/drop-3.jpg', color: 'Beige', slug: 'set-conclave-beige', precio: '$899' },
  { img: '/drop-2.jpg', color: 'Azul', slug: 'set-conclave-azul', precio: '$899' },
];

const TSHIRTS = [
  { img: '/drop-1.jpg', color: 'Rosa', slug: 'playera-conclave-rosa', precio: '$599' },
  { img: '/drop-3.jpg', color: 'Beige', slug: 'playera-conclave-beige', precio: '$599' },
  { img: '/drop-2.jpg', color: 'Azul', slug: 'playera-conclave-azul', precio: '$599' },
];

export default function DropsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-[#FAFAF8] min-h-screen">

        <section className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-6">Coleccion activa</p>
          <h1 className="font-display text-7xl md:text-9xl font-light tracking-tight text-stone-900 leading-none mb-4">The Conclave</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mt-6">GDL - 2025 - Edicion limitada</p>
        </section>

        <section className="max-w-screen-xl mx-auto px-6 pb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">Sets</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {SETS.map(function(p) {
              return (
                <div key={p.slug} className="bg-[#FAFAF8] group">
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                    <img src={p.img} alt={p.color} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Set Conclave</p>
                    <p className="font-display text-xl font-light text-stone-900 mb-1">{p.color}</p>
                    <p className="text-[11px] text-stone-500 mb-2">Bordado premium - Serigrafia alta definicion</p>
                    <p className="font-display text-lg text-stone-900 mb-4">{p.precio} <span className="text-xs text-stone-400">MXN</span></p>
                    <Link href={"/shop/" + p.slug} className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="max-w-screen-xl mx-auto px-6 pb-24 mt-12">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">T-Shirts</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {TSHIRTS.map(function(p) {
              return (
                <div key={p.slug} className="bg-[#FAFAF8] group">
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                    <img src={p.img} alt={p.color} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">T-Shirt Conclave</p>
                    <p className="font-display text-xl font-light text-stone-900 mb-1">{p.color}</p>
                    <p className="text-[11px] text-stone-500 mb-2">Bordado premium - Serigrafia alta definicion</p>
                    <p className="font-display text-lg text-stone-900 mb-4">{p.precio} <span className="text-xs text-stone-400">MXN</span></p>
                    <Link href={"/shop/" + p.slug} className="text-[10px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ver pieza</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
