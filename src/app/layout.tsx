import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ConditionalNavbar from '@/components/ui/layouts/navbar/ConditionalNavbar';
import Footer from '@/components/ui/layouts/footer/Footer';
import ClientWrapper from './ClientWrapper';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Simpler Salon',
  description: 'Build a beautiful salon website with one-time payment.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ClientWrapper>
          <ConditionalNavbar />
          {children}
          <Toaster position="bottom-center" />
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
