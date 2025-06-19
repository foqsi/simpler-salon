'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavLinks } from '@/components/NavLinks';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ThemeSwitcher';

export default function Navbar() {
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      router.replace('/');
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md z-50 text-base-content sticky top-0">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="p-4 text-2xl font-bold text-gradient bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
        >
          Simpler Salon
        </Link>
      </div>

      {/* Center: Nav Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 text-lg">
          <NavLinks />
        </ul>
      </div>

      {/* Right: Actions */}
      <div className="navbar-end space-x-2">
        <ThemeToggle />
        <Button href="/login" variant="secondary">
          Login
        </Button>
      </div>
    </div>
  );
}
