import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VÉLENE — Premium Athletic Wear',
  description: 'Performance built for discipline. Premium athletic wear.',
  openGraph: {
    title: 'VÉLENE',
    description: 'Premium Athletic Wear',
    url: 'https://velenewear.com',
    siteName: 'VÉLENE',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
