'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { getCart, removeFromCart, cartTotal, CartItem } from '@/store/cart';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
    const onUpdate = () => setItems(getCart());
    window.addEventListener('cart-updated', onUpdate);
    return () => window.removeEventListener('cart-updated', onUpdate);
  }, []);

  const total = items.reduce((a, i) => a + i.precio * i.cantidad, 0);
  const shipping = 0;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="font-display text-3xl font-light text-stone-300 mb-6">Tu carrito está vacío</p>
            <Link href="/shop" className="text-[11px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ir a la tienda</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <h1 className="font-display text-5xl font-light mb-12">Tu carrito</h1>
          <div className="grid md:grid-cols-[1fr_380px] gap-16">
            <div>
              {items.map((item, i) => (
                <div key={i} className="flex gap-6 py-6 border-b border-stone-100">
                  <div className="w-24 h-32 overflow-hidden flex-shrink-0">
                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm mb-1">{item.nombre}</p>
                    <p className="text-[11px] tracking-wider text-stone-400 uppercase mb-4">Talla {item.talla} · Qty {item.cantidad}</p>
                    <p className="font-display text-xl">${(item.precio * item.cantidad).toLocaleString('es-MX')}</p>
                  </div>
                  <button onClick={() => { removeFromCart(item.id, item.talla); setItems(getCart()); }}
                    className="text-[10px] tracking-wider text-stone-400 uppercase hover:text-stone-700 self-start mt-1">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-[#F5F2ED] p-8 h-fit">
              <p className="font-display text-2xl font-light mb-8">Resumen</p>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Subtotal</span>
                  <span>${total.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Envío</span>
                  <span className="text-emerald-600">Gratis</span>
                </div>
              </div>
              <div className="flex justify-between border-t border-stone-300 pt-4 mb-8">
                <span className="text-[11px] tracking-[0.1em] uppercase text-stone-500">Total</span>
                <span className="font-display text-2xl">${total.toLocaleString('es-MX')}</span>
              </div>
              <Link href="/checkout" className="block w-full py-4 bg-black text-white text-center text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                Finalizar pedido
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
