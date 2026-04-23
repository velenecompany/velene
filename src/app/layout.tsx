import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VÉLENE — Athleisure Premium',
  description: 'Nace de la disciplina. Moda deportiva premium fundada en Guadalajara, México.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
