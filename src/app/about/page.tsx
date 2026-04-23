import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="min-h-[60vh] bg-[#0A0A0A] flex items-end">
          <div className="max-w-screen-xl mx-auto px-6 py-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Nuestra historia</p>
            <h1 className="font-display text-[clamp(48px,8vw,120px)] font-light text-white leading-none">
              Nace de la<br />disciplina.
            </h1>
          </div>
        </section>

        {/* Texto principal */}
        <section className="max-w-screen-xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">¿Qué es VELENE?</p>
              <p className="font-display text-4xl font-light leading-snug mb-10">
                Moda deportiva creada para quienes entienden que el movimiento es una extensión de su identidad.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                La marca nace en Guadalajara, México, fundada por dos jóvenes emprendedores impulsados por la disciplina, el propósito y la convicción de construir algo propio.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                Inspirada en el concepto athleisure, VELENE fusiona estética contemporánea con funcionalidad diaria. Diseñamos prendas pensadas para acompañar cada momento: entrenar, crear, trabajar y vivir sin cambiar quién eres.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                Nuestra visión evoluciona constantemente. Hoy comenzamos con moda deportiva y, en el futuro, integraremos líneas técnicas de rendimiento como leggings, conjuntos deportivos y piezas diseñadas para el movimiento activo.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">
                Trabajamos mediante drops limitados porque creemos que la exclusividad no depende del acceso, sino de la mentalidad.
              </p>
            </div>
            <div className="space-y-12 pt-2">
              <div className="border-t border-stone-200 pt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3">Dirigida a</p>
                <p className="font-display text-2xl font-light text-stone-900">Mujeres modernas, seguras y disciplinadas — y a quienes compartan la misma mentalidad.</p>
              </div>
              <div className="border-t border-stone-200 pt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3">Nuestra visión</p>
                <p className="font-display text-2xl font-light text-stone-900">Progreso, constancia y evolución personal.</p>
              </div>
              <div className="border-t border-stone-200 pt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3">Modelo</p>
                <p className="font-display text-2xl font-light text-stone-900">Drops limitados. Exclusividad de mentalidad, no de precio.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#F5F3F0] py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-px bg-stone-200">
              {[
                { num: '2024', label: 'Fundada' },
                { num: 'GDL', label: 'Origen' },
                { num: 'ATH', label: 'Athleisure' },
              ].map((s, i) => (
                <div key={i} className="bg-[#F5F3F0] p-12 text-center">
                  <p className="font-display text-5xl font-light mb-3">{s.num}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
