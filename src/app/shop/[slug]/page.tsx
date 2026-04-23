import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AddToCartButton from '@/components/shop/AddToCartButton';

// In production: fetch from DB using slug
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = {
    id: '1', slug: params.slug, name: 'Shorts VELENÉ Pro',
    description: 'Shorts de alto rendimiento con tejido técnico de 4 vías. Bolsillo trasero con cierre, cintura elástica ajustable. Perfecto para entrenamiento de alta intensidad o uso casual.',
    category: 'Sport', gender: 'Unisex', price: 890,
    details: ['Tejido: 87% Polyester, 13% Elastane', 'Secado rápido', 'Bolsillo trasero con cierre', 'Cintura elástica de 5cm', 'Lavado a máquina 30°C'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isLimited: false,
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Product image */}
            <div className="aspect-[4/5] bg-[#F0EDE7] flex items-center justify-center">
              <span className="font-display text-[160px] text-stone-200 font-light">V</span>
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-4">{product.category} · {product.gender}</p>
              <h1 className="font-display text-5xl font-light mb-4">{product.name}</h1>
              <p className="font-display text-3xl mb-8">${product.price.toLocaleString('es-MX')} <span className="text-sm font-sans text-stone-400">MXN</span></p>
              <p className="text-sm text-stone-500 leading-relaxed mb-8">{product.description}</p>

              {/* Size selector */}
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-3">Talla</p>
                <AddToCartButton product={product} />
              </div>

              {/* Details */}
              <div className="border-t border-stone-100 pt-6">
                <p className="text-[10px] tracking-[0.15em] uppercase text-stone-400 mb-3">Detalles</p>
                <ul className="space-y-1">
                  {product.details.map((d, i) => <li key={i} className="text-sm text-stone-500">— {d}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
