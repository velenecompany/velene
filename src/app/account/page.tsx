'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

type Section = 'menu' | 'pedidos' | 'datos' | 'direcciones';

export default function AccountPage() {
  const [section, setSection] = useState<Section>('menu');
  const [user, setUser] = useState<{email: string; firstName: string; lastName: string} | null>(null);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNuevo, setPasswordNuevo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [cp, setCp] = useState('');
  const [msg, setMsg] = useState('');
  const [isFounder, setIsFounder] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          setUser(d.data);
          setNombre(d.data.firstName || '');
          setApellido(d.data.lastName || '');
          fetch('/api/founding-member?list=true')
            .then(r => r.json())
            .then(fm => {
              const found = (fm.founders || []).some((f: any) => f.email === d.data.email);
              setIsFounder(found);
            });
        } else {
          window.location.href = '/login';
        }
      });
  }, []);

  async function loadPedidos() {
    if (!user) return;
    const res = await fetch('/api/orders?email=' + user.email);
    const d = await res.json();
    setPedidos(d.data || []);
    setSection('pedidos');
  }

  async function guardarDatos() {
    const res = await fetch('/api/auth/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: nombre, lastName: apellido, passwordActual, passwordNuevo }),
    });
    if (res.ok) { setMsg('Datos actualizados'); setPasswordActual(''); setPasswordNuevo(''); }
    else setMsg('Error al actualizar');
    setTimeout(() => setMsg(''), 3000);
  }

  async function guardarDireccion() {
    setMsg('Direccion guardada');
    setTimeout(() => setMsg(''), 3000);
  }

  async function cerrarSesion() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-screen-md mx-auto px-6 py-16">

          {section === 'menu' && (
            <>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">Mi cuenta</p>
              <h1 className="font-display text-4xl font-light mb-4">Hola, {user.firstName || user.email}</h1>
              {isFounder && (
                <div className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 mb-10">
                  <span className="text-[9px] tracking-[0.3em] uppercase">Founding Member</span>
                </div>
              )}
              {!isFounder && <div className="mb-10" />}
              <div className="grid grid-cols-1 gap-px bg-stone-100">
                <button onClick={() => { loadPedidos(); }} className="bg-white p-6 hover:bg-[#F5F2ED] transition-colors text-left flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium mb-1">Mis pedidos</p>
                    <p className="text-xs text-stone-400">Historial y seguimiento de pedidos</p>
                  </div>
                  <span className="text-stone-300">→</span>
                </button>
                <button onClick={() => setSection('datos')} className="bg-white p-6 hover:bg-[#F5F2ED] transition-colors text-left flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium mb-1">Datos personales</p>
                    <p className="text-xs text-stone-400">Nombre, email y contrasena</p>
                  </div>
                  <span className="text-stone-300">→</span>
                </button>
                <button onClick={() => setSection('direcciones')} className="bg-white p-6 hover:bg-[#F5F2ED] transition-colors text-left flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium mb-1">Direcciones</p>
                    <p className="text-xs text-stone-400">Gestiona tus direcciones guardadas</p>
                  </div>
                  <span className="text-stone-300">→</span>
                </button>
                <Link href="/membership" className="bg-white p-6 hover:bg-[#F5F2ED] transition-colors text-left flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium mb-1">Membresia</p>
                    <p className="text-xs text-stone-400">Pace · Drive · Apex</p>
                  </div>
                  <span className="text-stone-300">→</span>
                </Link>
              </div>
              <button onClick={cerrarSesion} className="mt-8 text-[11px] tracking-[0.15em] uppercase text-stone-400 hover:text-stone-700 transition-colors">
                Cerrar sesion
              </button>
            </>
          )}

          {section === 'pedidos' && (
            <>
              <button onClick={() => setSection('menu')} className="text-[11px] tracking-wider uppercase text-stone-400 mb-8 block">← Volver</button>
              <h2 className="font-display text-3xl font-light mb-8">Mis pedidos</h2>
              {pedidos.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-display text-2xl text-stone-300 mb-4">Sin pedidos aun</p>
                  <a href="/drops" className="text-[11px] tracking-[0.2em] uppercase border-b border-stone-900 pb-px">Ir a la tienda</a>
                </div>
              ) : (
                <div className="space-y-px bg-stone-100">
                  {pedidos.map((p: any, i: number) => (
                    <div key={i} className="bg-white p-5">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-mono text-sm text-stone-700">#{p.order_number}</p>
                        <span className="text-[9px] tracking-[0.15em] uppercase bg-emerald-50 text-emerald-600 px-2 py-1">{p.status}</span>
                      </div>
                      <p className="text-xs text-stone-400 mb-1">{new Date(p.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p className="font-display text-xl">${parseFloat(p.total_mxn).toLocaleString('es-MX')} MXN</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {section === 'datos' && (
            <>
              <button onClick={() => setSection('menu')} className="text-[11px] tracking-wider uppercase text-stone-400 mb-8 block">← Volver</button>
              <h2 className="font-display text-3xl font-light mb-8">Datos personales</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Nombre</label>
                    <input value={nombre} onChange={e => setNombre(e.target.value)}
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Apellido</label>
                    <input value={apellido} onChange={e => setApellido(e.target.value)}
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Email</label>
                  <input value={user.email} disabled className="w-full border border-stone-100 px-4 py-3 text-sm bg-stone-50 text-stone-400" />
                </div>
                <div className="border-t border-stone-100 pt-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-4">Cambiar contrasena</p>
                  <div className="space-y-3">
                    <input type="password" placeholder="Contrasena actual" value={passwordActual} onChange={e => setPasswordActual(e.target.value)}
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                    <input type="password" placeholder="Nueva contrasena" value={passwordNuevo} onChange={e => setPasswordNuevo(e.target.value)}
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                  </div>
                </div>
                {msg && <p className="text-xs text-emerald-600 tracking-wide">{msg}</p>}
                <button onClick={guardarDatos} className="w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                  Guardar cambios
                </button>
              </div>
            </>
          )}

          {section === 'direcciones' && (
            <>
              <button onClick={() => setSection('menu')} className="text-[11px] tracking-wider uppercase text-stone-400 mb-8 block">← Volver</button>
              <h2 className="font-display text-3xl font-light mb-8">Direcciones</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Calle y numero</label>
                  <input value={direccion} onChange={e => setDireccion(e.target.value)}
                    className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Ciudad</label>
                    <input value={ciudad} onChange={e => setCiudad(e.target.value)}
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Codigo postal</label>
                    <input value={cp} onChange={e => setCp(e.target.value)}
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500" />
                  </div>
                </div>
                {msg && <p className="text-xs text-emerald-600 tracking-wide">{msg}</p>}
                <button onClick={guardarDireccion} className="w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                  Guardar direccion
                </button>
