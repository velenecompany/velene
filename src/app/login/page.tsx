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
      <main className="pt-16 min-h-screen flex items-center justify-center px-6" style={{background:'#E8E2D9'}}>
        <div className="w-full max-w-sm">
          <p className="font-display text-4xl font-light text-center mb-2" style={{color:'#0A0A0A'}}>VELENÉ</p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-center mb-10" style={{color:'#6B6560'}}>
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 p-8" style={{background:'#F5F2ED'}}>
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <input name="firstName" placeholder="Nombre"
                  className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={{border:'1px solid #C9B99A', background:'transparent', color:'#0A0A0A'}} />
                <input name="lastName" placeholder="Apellido"
                  className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={{border:'1px solid #C9B99A', background:'transparent', color:'#0A0A0A'}} />
              </div>
            )}
            <input name="email" type="email" placeholder="Email" required
              className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
              style={{border:'1px solid #C9B99A', background:'transparent', color:'#0A0A0A'}} />
            <input name="password" type="password" placeholder="Contraseña" required
              className="w-full px-4 py-3 text-sm focus:outline-none transition-colors"
              style={{border:'1px solid #C9B99A', background:'transparent', color:'#0A0A0A'}} />
            {error && (
              <p className="text-xs text-red-500 tracking-wide">{error}</p>
            )}
            <button type="submit" disabled={loading}
              className="w-full py-4 text-xs tracking-[0.2em] uppercase transition-colors disabled:opacity-60"
              style={{background:'#3D3935', color:'#F5F2ED'}}>
              {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>
          <p className="text-center text-sm mt-6" style={{color:'#6B6560'}}>
            {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="underline underline-offset-2 hover:opacity-70" style={{color:'#3D3935'}}>
              {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </main>
    </>
  );
}