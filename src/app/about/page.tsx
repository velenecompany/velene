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
              Nace de la<br />disciplina.<br />Guiada por Dios.
            </h1>
          </div>
        </section>

        {/* Qué es VELENÉ */}
        <section className="max-w-screen-xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">¿Qué es VELENÉ?</p>
              <p className="font-display text-4xl font-light leading-snug mb-10">
                Una casa contemporánea de athleisure y quiet luxury creada para quienes entienden que el movimiento es una extensión de su identidad, su propósito y su fe.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                La marca nace en Guadalajara, México, fundada por dos jóvenes emprendedores impulsados por la disciplina, la convicción de construir algo propio y la certeza de que Dios guía los caminos que se edifican con propósito.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                VELENÉ no surge únicamente como un proyecto creativo, sino como un pacto: creer que, a través del trabajo honesto, la excelencia y la visión correcta, Dios puede usar este proyecto para bendecir vidas y familias.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                Diseñamos prendas que acompañan cada momento real de la vida: entrenar, crear, trabajar y vivir sin dejar de ser quien eres delante de Dios.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">
                Porque entendemos que el verdadero lujo no es la apariencia, sino la paz que proviene de vivir alineado.
              </p>
            </div>
            <div className="space-y-12 pt-2">
              <div className="border-t border-stone-200 pt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3">Dirigida a</p>
                <p className="font-display text-2xl font-light text-stone-900">Mujeres modernas, seguras y disciplinadas — y a toda persona que busca crecer, vivir con propósito y caminar en paz.</p>
              </div>
              <div className="border-t border-stone-200 pt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3">Nuestra visión</p>
                <p className="font-display text-2xl font-light text-stone-900">Construir desde México una casa creativa global que represente disciplina, fe, elegancia y propósito.</p>
              </div>
              <div className="border-t border-stone-200 pt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3">Modelo</p>
                <p className="font-display text-2xl font-light text-stone-900">Drops limitados. La exclusividad no depende del acceso, sino de la mentalidad de quienes entienden el valor del proceso.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filosofía */}
        <section className="bg-[#E8E2D9] py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-12">Nuestra Filosofía</p>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <p className="font-display text-2xl font-light mb-4">Disciplina.</p>
                <p className="text-sm text-stone-600 leading-relaxed">La constancia honra los dones que Dios entrega.</p>
              </div>
              <div>
                <p className="font-display text-2xl font-light mb-4">Propósito.</p>
                <p className="text-sm text-stone-600 leading-relaxed">Cada paso tiene dirección cuando se camina con visión.</p>
              </div>
              <div>
                <p className="font-display text-2xl font-light mb-4">Pacto.</p>
                <p className="text-sm text-stone-600 leading-relaxed">Creemos que este proyecto existe para ser instrumento de bendición para las familias de esta tierra.</p>
              </div>
            </div>
            <div className="border-t border-stone-300 mt-16 pt-16 max-w-2xl">
              <p className="font-display text-3xl font-light leading-relaxed text-stone-800">
                Nuestra inspiración nace del significado de Shalom: paz completa, prosperidad, plenitud y restauración.
              </p>
            </div>
          </div>
        </section>

        {/* Convicción */}
        <section className="max-w-screen-xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">Nuestra Convicción</p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">Reconocemos que todo proviene de Dios. Por ello, buscamos construir una marca que refleje valores eternos: integridad, servicio, excelencia y gratitud.</p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">Creemos que el trabajo puede ser adoración cuando se realiza con intención correcta.</p>
              <p className="text-sm text-stone-500 leading-relaxed">VELENÉ aspira a generar impacto más allá de la moda: crear oportunidades, inspirar disciplina y contribuir al bienestar de familias, comunidades y futuras generaciones.</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-6">Dirección Creativa</p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">Inspirada en el athleisure contemporáneo y el quiet luxury, VELENÉ fusiona funcionalidad diaria con una estética limpia, atemporal y sofisticada.</p>
              <p className="text-sm text-stone-500 leading-relaxed">Cada prenda busca transmitir calma, orden y seguridad — reflejo de una vida guiada con propósito.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-px bg-white/10">
              {[
                { num: '2024', label: 'Fundada' },
                { num: 'GDL', label: 'Origen' },
                { num: 'ATH', label: 'Athleisure' },
                { num: 'QL', label: 'Quiet Luxury' },
              ].map((s, i) => (
                <div key={i} className="bg-[#0A0A0A] p-12 text-center">
                  <p className="font-display text-5xl font-light text-white mb-3">{s.num}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">{s.label}</p>
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