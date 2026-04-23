import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const PRODUCTS = [
  { id: '1', slug: 'shorts-velene-pro', name: 'Shorts VELENÉ Pro', category: 'Sport', gender: 'unisex', price: 890, tag: 'Nuevo', isLimited: false },
  { id: '2', slug: 'top-compresion', name: 'Top Compresión', category: 'Sport', gender: 'women', price: 750, tag: null, isLimited: false },
  { id: '3', slug: 'jogger-essential', name: 'Jogger Essential', category: 'Sport', gender: 'unisex', price: 1200, tag: 'Bestseller', isLimited: false },
  { id: '4', slug: 'camiseta-dry-fit', name: 'Camiseta Dry-Fit', category: 'Sport', gender: 'unisex', price: 650, tag: null, isLimited: false },
  { id: '5', slug: 'bra-sport', name: 'Bra Sport VELENÉ', category: 'Sport', gender: 'women', price: 820, tag: 'Nuevo', isLimited: true },
  { id: '6', slug: 'legging-pro', name: 'Legging Pro', category: 'Sport', gender: 'women', price: 1350, tag: 'Bestseller', isLimited: false },
  { id: '7', slug: 'hoodie-performance', name: 'Hoodie Performance', category: 'Sport', gender: 'unisex', price: 1850, tag: null, isLimited: true },
  { id: '8', slug: 'tank-velene', name: 'Tank VELENÉ', category: 'Sport', gender: 'unisex', price: 580, tag: null, isLimited: false },
];

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div className="max-w-screen-xl mx-auto px-6 py-12 flex items-baseline justify-between border-b border-stone-200">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Tienda</p>
            <h1 className="font-display text-5xl font-light">Colección</h1>
          </div>
          <p className="text-sm text-stone-400">{PRODUCTS.length} piezas</p>
        </div>

        {/* Filter bar */}
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex gap-6 overflow-x-auto border-b border-stone-100">
          {['Todos', 'Mujer', 'Hombre', 'Unisex', 'Nuevo', 'Limited'].map(f => (
            <button key={f} className={`text-[11px] tracking-[0.15em] uppercase whitespace-nowrap pb-2 transition-colors ${f === 'Todos' ? 'border-b border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-stone-100">
            {PRODUCTS.map(p => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="group bg-white block">
                <div className="aspect-[3/4] bg-[#F0EDE7] flex items-center justify-center relative overflow-hidden">
                  {p.tag && <span className="absolute top-3 left-3 bg-black text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 z-10">{p.tag}</span>}
                  {p.isLimited && <span className="absolute top-3 right-3 bg-stone-700 text-white text-[9px] tracking-[0.1em] uppercase px-2 py-1 z-10">Limited</span>}
                  <span className="font-display text-[80px] text-stone-200 group-hover:scale-105 transition-transform duration-500 font-light">V</span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-stone-400 mb-1">{p.category} · {p.gender}</p>
                  <p className="text-sm mb-2">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg">${p.price.toLocaleString('es-MX')}</p>
                    {p.isLimited && <p className="text-[10px] text-red-500 tracking-wider">Pocas piezas</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
