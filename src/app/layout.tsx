import type { Metadata } from 'next';
import './globals.css';
import ConditionalNavbar from '@/components/ui/layouts/navbar/ConditionalNavbar';
import Footer from '@/components/ui/layouts/footer/Footer';
import ClientWrapper from './ClientWrapper';
import { Toaster } from 'react-hot-toast';

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
