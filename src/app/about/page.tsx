import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="min-h-[60vh] bg-[#0A0A0A] flex items-end">
          <div className="max-w-screen-xl mx-auto px-6 py-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Nuestra historia</p>
            <h1 className="font-display text-[clamp(48px,8vw,120px)] font-light text-white leading-none">
              Nace de la<br />disciplina.
            </h1>
          </div>
        </section>

        <section className="max-w-screen-xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">¿Qué es Vélene?</p>
              <p className="font-display text-4xl font-light leading-snug mb-8">
                Ropa deportiva para quienes entienden que el movimiento es un estilo de vida, no una actividad.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                Vélene nació en Guadalajara con una sola idea: crear prendas que no tengan que elegir entre rendimiento y estética. Cada pieza es diseñada para durar, para moverse, y para verse bien haciéndolo.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">
                Trabajamos con drops limitados porque creemos que la exclusividad no es un precio — es una mentalidad.
              </p>
            </div>
            <div className="aspect-square bg-bone flex items-center justify-center">
              <span className="font-display text-[200px] text-stone-200 font-light leading-none">V</span>
            </div>
          </div>
        </section>

        <section className="bg-bone py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-px bg-stone-200">
              {[
                { num: '2024', label: 'Fundada' },
                { num: 'GDL', label: 'Origen' },
                { num: '100%', label: 'Performance' },
              ].map((s, i) => (
                <div key={i} className="bg-bone p-12 text-center">
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
