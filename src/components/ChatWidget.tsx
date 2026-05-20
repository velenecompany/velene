'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hola, bienvenido a VELENÉ. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error. Intenta de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0A0A0A] text-[#F5F2ED] flex items-center justify-center hover:bg-[#3D3935] transition-colors"
        aria-label="Abrir chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
      </button>

      {/* Ventana de chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] bg-[#F5F2ED] border border-stone-200 shadow-2xl flex flex-col" style={{ height: '480px' }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 bg-[#0A0A0A]">
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Asistente</p>
            <p className="font-display text-base font-light text-[#F5F2ED] mt-0.5">VELENÉ</p>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 text-[12px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#0A0A0A] text-[#F5F2ED]'
                      : 'bg-[#E8E2D9] text-[#3D3935]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#E8E2D9] px-4 py-2.5 text-[12px] text-stone-400">
                  <span className="animate-pulse">···</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-transparent text-[12px] text-stone-900 placeholder-stone-400 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="text-[10px] tracking-[0.15em] uppercase text-stone-900 disabled:text-stone-300 transition-colors hover:text-[#B8A87A]"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}