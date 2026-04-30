import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroParallax from '@/components/home/HeroParallax';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex items-center justify-center overflow-hidden" style={{minHeight:"100vh"}}>
          <HeroParallax />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-6">
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/60 mb-6">The Conclave · Drop 001</p>
            <h1 className="font-display text-[clamp(64px,10vw,140px)] font-light text-white leading-none mb-10">
              Luxury in<br />Defiance.
            </h1>
            <Link href="/drops" className="inline-block px-10 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors">
              Ver colección
            </Link>
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 z-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40">GDL — México</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40">Drop 001 — 2025</p>
          </div>
        </section>

        <section className="py-20 bg-[#F5F2ED]">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex justify-between items-baseline mb-12">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Drop 001</p>
                <p className="font-display text-4xl font-light">The Conclave</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {/* Set Rosa */}
              <Link href="/shop/set-conclave-rosa" className="group bg-white block relative">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">Nuevo</span>
                  <img src="/PORTADA-OF.jpg" alt="Set Conclave Rosa" className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                  <img src="/IMG_9077.jpg" alt="Set Conclave Rosa hover" className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm mb-2">Set Conclave Rosa</p>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg">$899</p>
                  </div>
                  <p className="text-[10px] text-emerald-600 mt-1">✓ Envío gratis</p>
                </div>
              </Link>

              {/* Set Beige */}
              <Link href="/shop/set-conclave-beige" className="group bg-white block relative">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">Nuevo</span>
                  <img src="/IMG_9367.jpg" alt="Set Conclave Beige" className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                  <img src="/IMG_9083.jpg" alt="Set Conclave Beige hover" className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm mb-2">Set Conclave Beige</p>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg">$899</p>
                  </div>
                  <p className="text-[10px] text-emerald-600 mt-1">✓ Envío gratis</p>
                </div>
              </Link>

              {/* Set Azul */}
              <Link href="/shop/set-conclave-azul" className="group bg-white block relative">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">Oferta</span>
                  <img src="/IMG_9377.jpg" alt="Set Conclave Azul" className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" />
                  <img src="/IMG_9370.jpg" alt="Set Conclave Azul hover" className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm mb-2">Set Conclave Azul</p>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg">$599</p>
                    <p className="text-sm text-stone-400 line-through">$899</p>
                  </div>
                  <p className="text-[10px] text-emerald-600 mt-1">✓ Envío gratis</p>
                </div>
              </Link>

            </div>
          </div>
        </section>

        <section className="py-28 max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">Filosofía</p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">Diseñado para<br />quienes no paran.</h2>
              <p className="text-sm text-stone-500 leading-relaxed max-w-md">VELENÉ nace de la disciplina. Cada pieza construida para quien entiende que el movimiento no es opcional — es un estado mental.</p>
              <Link href="/about" className="inline-block mt-8 text-[11px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Conoce VELENÉ</Link>
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img src="/IMG_9364.jpg" alt="Luxury in Defiance" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#0A0A0A] text-white">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">The Conclave · Drop 001</p>
            <h2 className="font-display text-5xl md:text-7xl font-light mb-8">Luxury in Defiance.</h2>
            <p className="text-sm text-white/50 mb-10 max-w-md mx-auto">Edición limitada. Tres colorways. Una sola oportunidad.</p>
            <Link href="/drops" className="inline-block px-10 py-4 border border-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors">Ver The Conclave</Link>
          </div>
        </section>

        <section className="py-24 bg-[#0A0A0A] text-white border-t border-white/10">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Distribución Autorizada</p>
            <h2 className="font-display text-5xl md:text-7xl font-light mb-8">Conviértete en<br />Partner Autorizado.</h2>
            <p className="text-sm text-white/50 mb-10 max-w-md mx-auto">Acceso anticipado a cada drop, precios de mayoreo y zona exclusiva. Seleccionamos a nuestros distribuidores con cuidado.</p>
            <Link href="/partners" className="inline-block px-10 py-4 border border-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors">Aplica Ahora</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}