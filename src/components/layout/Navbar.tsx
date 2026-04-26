'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cartCount } from '@/store/cart';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartCount());
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onCart = () => setCount(cartCount());
    window.addEventListener('scroll', onScroll);
    window.addEventListener('cart-updated', onCart);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('cart-updated', onCart);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E2DDD8]' : 'bg-transparent'}`}>
      <nav className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-8">
          <Link href="/drops" className="text-[11px] tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition-colors">Drops</Link>
        </div>
        <Link href="/" className="font-display text-2xl font-light tracking-[0.2em] uppercase absolute left-1/2 -translate-x-1/2">VELENÉ</Link>
        <div className="hidden md:flex items-center gap-6">
<Link href="/about" className="text-[11px] tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition-colors">About</Link>
          <Link href="/account" className="text-[11px] tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition-colors">Account</Link>
          <Link href="/cart" className="text-[11px] tracking-[0.15em] uppercase text-stone-900 border-b border-stone-900 pb-px">
            {count > 0 ? `Cart (${count})` : 'Cart'}
          </Link>
        </div>
        <button className="md:hidden ml-auto mr-4" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-5 h-px bg-stone-900 transition-all mb-1.5 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-px bg-stone-900 transition-all mb-1.5 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-px bg-stone-900 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
        <Link href="/cart" className="md:hidden text-[11px] tracking-[0.15em] uppercase text-stone-900">
          {count > 0 ? `(${count})` : 'Cart'}
        </Link>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-[#FAFAF8] border-t border-[#E2DDD8] px-6 py-8">
'Drops', 'About', 'Account', 'Cart'
            <Link key={item} href={`/${item.toLowerCase()}`}
              className="block text-sm tracking-[0.15em] uppercase py-3 border-b border-[#E2DDD8] last:border-0"
              onClick={() => setMenuOpen(false)}>
              {item}{item === 'Cart' && count > 0 ? ` (${count})` : ''}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
