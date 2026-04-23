'use client';

export interface CartItem {
  id: string;
  slug: string;
  nombre: string;
  talla: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('velene-cart');
    const parsed = JSON.parse(data || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem('velene-cart', JSON.stringify(items));
  window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(item: Omit<CartItem, 'cantidad'>) {
  const items = getCart();
  const index = items.findIndex(i => i.id === item.id && i.talla === item.talla);
  if (index >= 0) {
    items[index].cantidad += 1;
    saveCart(items);
  } else {
    saveCart([...items, { ...item, cantidad: 1 }]);
  }
}

export function removeFromCart(id: string, talla: string) {
  saveCart(getCart().filter(i => !(i.id === id && i.talla === talla)));
}

export function limpiar() {
  localStorage.removeItem('velene-cart');
  window.dispatchEvent(new Event('cart-updated'));
}

export function cartTotal(): number {
  return getCart().reduce((a, i) => a + i.precio * i.cantidad, 0);
}

export function cartCount(): number {
  return getCart().reduce((a, i) => a + i.cantidad, 0);
}
