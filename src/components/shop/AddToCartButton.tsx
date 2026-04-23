'use client';
import { useState } from 'react';

interface Props {
  product: { id: string; name: string; price: number; sizes: string[]; slug: string; isLimited: boolean };
}

export default function AddToCartButton({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!selectedSize) { alert('Selecciona una talla'); return; }
    // TODO: add to zustand cart store
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {product.sizes.map(s => (
          <button key={s} onClick={() => setSelectedSize(s)}
            className={`w-11 h-11 border text-sm transition-colors ${
              selectedSize === s ? 'border-black bg-black text-white' : 'border-stone-200 hover:border-stone-400'
            }`}>{s}</button>
        ))}
      </div>
      <button onClick={handleAdd}
        className={`w-full py-4 text-xs tracking-[0.2em] uppercase transition-all ${
          added ? 'bg-stone-700 text-white' : 'bg-black text-white hover:bg-stone-800'
        }`}>
        {added ? '✓ Añadido' : 'Añadir al carrito'}
      </button>
      {product.isLimited && <p className="text-[11px] text-red-500 tracking-wider text-center mt-3">Pocas piezas disponibles</p>}
    </div>
  );
}
