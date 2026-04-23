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
      </body>
    </html>
  );
}
sed -i '' '/cursor-dot/,/cursor-ring/d' /Users/alainherrera/Desktop/vela/public-site/src/app/globals.css
sed -i '' 's/\* { cursor: none !important; }//' /Users/alainherrera/Desktop/vela/public-site/src/app/globals.css
