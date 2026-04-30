'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = '/account';
    } else {
      const json = await res.json();
      if (res.status === 409) setError('Este email ya está registrado. Inicia sesión.');
      else if (res.status === 401) setError('Email o contraseña incorrectos.');
      else setError(json.error || 'Algo salió mal, intenta de nuevo.');
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center px-6 bg-[#F5F2ED]">
        <div className="w-full max-w-sm">
          <p className="font-display text-4xl font-light text-center mb-2">VELENÉ</p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 text-center mb-10">
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <input name="firstName" placeholder="Nombre" className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                <input name="lastName" placeholder="Apellido" className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
              </div>
            )}
            <input name="email" type="email" placeholder="Email" required
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
            <input name="password" type="password" placeholder="Contraseña" required
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
            {error && (
              <p className="text-xs text-red-500 tracking-wide">{error}</p>
            )}
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors disabled:opacity-60">
              {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>
          <p className="text-center text-sm text-stone-500 mt-6">
            {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="underline underline-offset-2 hover:text-stone-900">
              {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </main>
    </>
  );
}
