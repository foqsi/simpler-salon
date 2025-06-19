'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { NavLinks } from '@/components/NavLinks';
import Logo from '../../../Logo';
import ThemeToggle from '@/components/ThemeSwitcher';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-md text-base-content">
      <div className="navbar px-4 py-2 justify-between">
        {/* Left: Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost z-50 text-primary">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <Link href="/" className="btn btn-ghost text-lg font-bold text-secondary">
            <Logo className="h-8 w-8 mr-2" />
            {/* <span className="font-bold text-gradient bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Simpler Salon</span> */}
          </Link>
        </div>

        {/* Right: Theme Toggle + Login */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link href="/login" className="btn btn-secondary btn-sm">
            Login
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-base-200 text-base-content transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-6 pt-16">
          <ul className="menu space-y-4 text-xl">
            <NavLinks onClick={() => setIsOpen(false)} />
          </ul>
        </div>
      </div>
    </header>
  );
}
