import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PoliticasPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-[#FAFAF8]">
        <div className="max-w-2xl mx-auto px-6">

          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-4">VELENÉ</p>
          <h1 className="font-display text-5xl font-light mb-16">Políticas</h1>

          {/* Envíos */}
          <section className="mb-16">
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-6 pb-4 border-b border-stone-200">Política de Envíos</h2>
            <div className="space-y-4 text-sm text-stone-600 leading-loose">
              <p>Todos los pedidos son procesados y enviados desde Guadalajara, México. Una vez confirmado tu pago, tu pedido entrará a proceso de preparación.</p>
              <p><span className="text-stone-900 font-medium">Tiempo de envío:</span> 3 a 5 días hábiles a partir de la confirmación del pago. Los tiempos pueden variar en temporadas de alta demanda.</p>
              <p><span className="text-stone-900 font-medium">Paquetería:</span> Trabajamos con Estafeta para garantizar la seguridad y rastreabilidad de cada pedido.</p>
              <p><span className="text-stone-900 font-medium">Envío gratis:</span> Todos los pedidos incluyen envío sin costo adicional a cualquier parte de México.</p>
              <p><span className="text-stone-900 font-medium">Rastreo:</span> Una vez que tu pedido sea enviado, recibirás un número de guía para rastrear tu paquete directamente en el sitio de Estafeta.</p>
              <p>VELENÉ no se hace responsable por retrasos ocasionados por la paquetería, fenómenos meteorológicos, días festivos o causas de fuerza mayor.</p>
            </div>
          </section>

          {/* Devoluciones */}
          <section className="mb-16">
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-6 pb-4 border-b border-stone-200">Política de Devoluciones y Cambios</h2>
            <div className="space-y-4 text-sm text-stone-600 leading-loose">
              <p>Debido a la naturaleza de nuestro modelo de negocio — drops limitados con producción bajo pedido — <span className="text-stone-900 font-medium">no aceptamos devoluciones ni cambios por arrepentimiento, error en la talla seleccionada o cambio de opinión.</span></p>
              <p>Te recomendamos revisar cuidadosamente nuestra guía de tallas antes de realizar tu compra.</p>
              <p><span className="text-stone-900 font-medium">Defectos de fábrica:</span> Si recibes una pieza con defecto de fabricación, tienes <span className="text-stone-900 font-medium">48 horas</span> a partir de la recepción del pedido para notificarnos al correo <a href="mailto:velacontacto2@gmail.com" className="text-stone-900 border-b border-stone-400">velacontacto2@gmail.com</a> con:</p>
              <ul className="list-none space-y-2 pl-4 border-l border-stone-200">
                <li>— Número de pedido</li>
                <li>— Fotografías del defecto</li>
                <li>— Descripción del problema</li>
              </ul>
              <p>Una vez validado el defecto, procederemos al reemplazo de la pieza sin costo adicional. No se realizan reembolsos en efectivo o a tarjeta.</p>
              <p>Las piezas con evidencia de uso, lavado o modificación no son elegibles para ningún tipo de cambio.</p>
            </div>
          </section>

          {/* Privacidad */}
          <section className="mb-16">
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-6 pb-4 border-b border-stone-200">Política de Privacidad</h2>
            <div className="space-y-4 text-sm text-stone-600 leading-loose">
              <p>VELENÉ es una marca de athleisure premium con sede en Guadalajara, Jalisco, México. Nos comprometemos a proteger la privacidad y datos personales de nuestros clientes de conformidad con la <span className="text-stone-900 font-medium">Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</span>.</p>
              <p><span className="text-stone-900 font-medium">Datos que recopilamos:</span> nombre, correo electrónico, dirección de envío, teléfono y datos de pago (procesados de forma segura a través de Stripe).</p>
              <p><span className="text-stone-900 font-medium">Uso de los datos:</span> Los datos recopilados son utilizados exclusivamente para procesar pedidos, enviar confirmaciones, gestionar tu cuenta y enviarte comunicaciones sobre nuevos drops si así lo autorizas.</p>
              <p><span className="text-stone-900 font-medium">Compartición de datos:</span> No vendemos, rentamos ni compartimos tu información personal con terceros, salvo con proveedores de servicio necesarios para operar (paquetería, procesador de pagos).</p>
              <p><span className="text-stone-900 font-medium">Seguridad:</span> Utilizamos tecnología SSL y procesadores de pago certificados para garantizar la seguridad de tu información.</p>
              <p><span className="text-stone-900 font-medium">Derechos ARCO:</span> Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos personales. Para ejercer estos derechos contáctanos en <a href="mailto:velacontacto2@gmail.com" className="text-stone-900 border-b border-stone-400">velacontacto2@gmail.com</a>.</p>
              <p>Nos reservamos el derecho de actualizar esta política en cualquier momento. Los cambios serán notificados a través de nuestro sitio web.</p>
            </div>
          </section>

          {/* Términos y Condiciones */}
          <section className="mb-16">
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-6 pb-4 border-b border-stone-200">Términos y Condiciones</h2>
            <div className="space-y-4 text-sm text-stone-600 leading-loose">
              <p>Al realizar una compra en VELENÉ aceptas los presentes términos y condiciones en su totalidad.</p>
              <p><span className="text-stone-900 font-medium">Drops limitados:</span> Todas nuestras colecciones son ediciones limitadas. Una vez agotado el inventario de un drop, no garantizamos restock de las piezas.</p>
              <p><span className="text-stone-900 font-medium">Precios:</span> Todos los precios están expresados en pesos mexicanos (MXN) e incluyen IVA. VELENÉ se reserva el derecho de modificar precios sin previo aviso.</p>
              <p><span className="text-stone-900 font-medium">Confirmación de pedido:</span> Un pedido se considera confirmado únicamente cuando el pago ha sido procesado exitosamente. Recibirás un correo de confirmación con los detalles de tu compra.</p>
              <p><span className="text-stone-900 font-medium">Membresías:</span> Los beneficios de membresía (Pace, Drive, Apex) son acumulativos y de por vida basados en el gasto total. No son transferibles a otras cuentas.</p>
              <p><span className="text-stone-900 font-medium">Uso del sitio:</span> El contenido de este sitio — imágenes, textos, diseños y marca — es propiedad de VELENÉ y está protegido por derechos de autor. Queda prohibida su reproducción sin autorización.</p>
              <p>Para cualquier duda contáctanos en <a href="mailto:velacontacto2@gmail.com" className="text-stone-900 border-b border-stone-400">velacontacto2@gmail.com</a> o al <a href="tel:+523324261099" className="text-stone-900 border-b border-stone-400">+52 33 2426 1099</a>.</p>
            </div>
          </section>

          {/* Membresías */}
          <section className="mb-16">
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-6 pb-4 border-b border-stone-200">Política de Membresías</h2>
            <div className="space-y-4 text-sm text-stone-600 leading-loose">
              <p>El programa de membresías VELENÉ reconoce y recompensa la lealtad de nuestros clientes mediante tiers basados en el gasto acumulado total.</p>
              <ul className="list-none space-y-2 pl-4 border-l border-stone-200">
                <li>— <span className="text-stone-900">Pace</span> — a partir de $2,500 MXN acumulados</li>
                <li>— <span className="text-stone-900">Drive</span> — a partir de $5,000 MXN acumulados</li>
                <li>— <span className="text-stone-900">Apex</span> — a partir de $7,500 MXN acumulados</li>
              </ul>
              <p>Los tiers son <span className="text-stone-900 font-medium">de por vida</span> — una vez alcanzado un nivel, no se pierde independientemente de la actividad de compra posterior.</p>
              <p>Los beneficios incluyen acceso anticipado a drops, descuentos exclusivos por tier y contenido especial. VELENÉ se reserva el derecho de modificar los beneficios del programa con previo aviso.</p>
              <p>Las membresías son personales e intransferibles. El gasto acumulado se calcula únicamente sobre compras completadas y pagadas.</p>
            </div>
          </section>

          <div className="border-t border-stone-200 pt-8">
            <p className="text-[11px] text-stone-400">Última actualización: Abril 2026 · VELENÉ, Guadalajara, México</p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}