'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cartCount } from '@/store/cart';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [earlyAccess, setEarlyAccess] = useState(false);

  useEffect(() => {
    setCount(cartCount());
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onCart = () => setCount(cartCount());
    window.addEventListener('scroll', onScroll);
    window.addEventListener('cart-updated', onCart);

    const token = localStorage.getItem('token');
    if (token) {
      Promise.all([
        fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch('/api/drops?slug=the-conclave').then(r => r.json()),
      ]).then(([user, drop]) => {
        const tier = user.membership_tier;
        if (!tier || !drop) return;
        if (tier === 'Apex' && drop.apex_active && !drop.public_active) setEarlyAccess(true);
        if (tier === 'Drive' && drop.drive_active && !drop.public_active) setEarlyAccess(true);
        if (tier === 'Pace' && drop.pace_active && !drop.public_active) setEarlyAccess(true);
      }).catch(() => {});
    }

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
          {earlyAccess && (
            <Link href="/early-access" className="text-[11px] tracking-[0.15em] uppercase text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-1.5">
              <span>The Shalom</span>
              <span className="text-[9px]">✦</span>
            </Link>
          )}
        </div>
        <Link href="/" className="font-display text-2xl font-light tracking-[0.2em] uppercase absolute left-1/2 -translate-x-1/2">VELENÉ</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-[11px] tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition-colors">About</Link>
          <div className="relative group">
            <button className="text-[11px] tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition-colors">Account</button>
            <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-stone-100 shadow-lg w-72 p-6">
                <p className="text-xs text-stone-400 mb-1">Hi, nice to see you.</p>
                <p className="font-display text-lg font-light mb-5">Your Account</p>
                <div className="space-y-3">
                  <Link href="/account" className="block text-[11px] tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900">Dashboard</Link>
                  <Link href="/account" className="block text-[11px] tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900">Mis Pedidos</Link>
                  <Link href="/account" className="block text-[11px] tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900">Mi Perfil</Link>
                  <Link href="/membership" className="block text-[11px] tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900">Membresía</Link>
                </div>
                <div className="border-t border-stone-100 mt-5 pt-4">
                  <Link href="/login" className="block text-[11px] tracking-[0.15em] uppercase text-stone-400 hover:text-stone-900">Cerrar sesión</Link>
                </div>
              </div>
            </div>
          </div>
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
          {['Drops', 'About', 'Account', 'Cart'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`}
              className="block text-sm tracking-[0.15em] uppercase py-3 border-b border-[#E2DDD8] last:border-0"
              onClick={() => setMenuOpen(false)}>
              {item}{item === 'Cart' && count > 0 ? ` (${count})` : ''}
            </Link>
          ))}
          {earlyAccess && (
            <Link href="/early-access"
              className="block text-sm tracking-[0.15em] uppercase py-3 border-b border-[#E2DDD8] text-stone-900"
              onClick={() => setMenuOpen(false)}>
              The Shalom ✦
            </Link>
          )}
        </div>
      )}
    </header>
  );
}