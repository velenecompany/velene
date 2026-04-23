import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const DROPS = [
  { id: 1, name: 'Drop 001 · Primavera', status: 'active', date: 'Marzo 2025', pieces: 8, coverText: '001' },
  { id: 2, name: 'Drop 002 · Verano', status: 'upcoming', date: 'Junio 2025', pieces: 6, coverText: '002' },
  { id: 3, name: 'Drop 000 · Fundacional', status: 'archived', date: 'Enero 2025', pieces: 4, coverText: '000' },
];

export default function DropsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4">Colecciones</p>
          <h1 className="font-display text-6xl font-light mb-16">Drops</h1>

          <div className="space-y-px">
            {DROPS.map(drop => (
              <div key={drop.id} className={`group flex items-center gap-8 p-6 border-b border-stone-100 hover:bg-bone transition-colors ${drop.status === 'upcoming' ? 'opacity-60' : ''}`}>
                <div className="w-20 h-20 bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-2xl text-stone-300 font-light">{drop.coverText}</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-2xl font-light mb-1">{drop.name}</p>
                  <p className="text-[11px] tracking-wider text-stone-400 uppercase">{drop.date} · {drop.pieces} piezas</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 ${
                    drop.status === 'active' ? 'bg-black text-white' :
                    drop.status === 'upcoming' ? 'bg-stone-200 text-stone-600' :
                    'border border-stone-200 text-stone-400'
                  }`}>
                    {drop.status === 'active' ? 'Disponible' : drop.status === 'upcoming' ? 'Próximo' : 'Agotado'}
                  </span>
                  {drop.status === 'active' && (
                    <Link href="/shop" className="text-[11px] tracking-[0.15em] uppercase border-b border-stone-900 pb-px">Shop →</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
