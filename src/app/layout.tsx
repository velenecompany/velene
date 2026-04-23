import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VÉLENE — Athleisure Premium',
  description: 'Nace de la disciplina. Moda deportiva premium fundada en Guadalajara, México.',
  openGraph: {
    title: 'VÉLENE',
    description: 'Athleisure Premium — GDL',
    url: 'https://velene.vercel.app',
    siteName: 'VÉLENE',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <div className="cursor-dot" id="cursor-dot" />
        <div className="cursor-ring" id="cursor-ring" />
        <script dangerouslySetInnerHTML={{ __html: `
          // Scroll reveal
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
          }, { threshold: 0.1 });
          document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

          // Cursor
          const dot = document.getElementById('cursor-dot');
          const ring = document.getElementById('cursor-ring');
          let mx = 0, my = 0, rx = 0, ry = 0;
          document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx - 3 + 'px';
            dot.style.top = my - 3 + 'px';
          });
          function animateRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx - 16 + 'px';
            ring.style.top = ry - 16 + 'px';
            requestAnimationFrame(animateRing);
          }
          animateRing();
        `}} />
      </body>
    </html>
  );
}
