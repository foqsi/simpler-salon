'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Navbar = dynamic(() => import('@/components/ui/layouts/navbar/Navbar'), { ssr: false });
const MobileNavigation = dynamic(() => import('./MobileNavigation'), { ssr: false });

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (isDashboard) return null;

  return isMobile ? <MobileNavigation /> : <Navbar />;
}
