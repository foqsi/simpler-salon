import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Simpler Salon',
  description: 'Build a beautiful salon website with one-time payment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
