'use client';

import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    setDropdownOpen(false);
    setThemeMenuOpen(false);
  };

  return (
    <header className="w-full flex items-center justify-between p-4 bg-base-100 border-b border-base-300 relative z-10">
      <div className="flex items-center gap-2">
        <button
          className="btn btn-ghost md:hidden"
          onClick={onOpenSidebar}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <span className="font-bold text-lg">Simpler Salon</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(prev => !prev)}
          className="flex items-center gap-2 btn btn-ghost px-2"
        >
          <div className="w-8 h-8 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
            <span className="text-sm">SS</span>
          </div>
          <ChevronDown size={16} className="opacity-70" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-base-200 border border-base-300 rounded-lg shadow-lg animate-fade-in z-50">
            <ul className="menu menu-sm p-2">
              <li><Link href="/dashboard/profile">Profile</Link></li>
              <li><Link href="/dashboard/settings">Settings</Link></li>
              <li>
                <button
                  className="flex items-center justify-between w-full"
                  onClick={() => setThemeMenuOpen(prev => !prev)}
                >
                  Themes
                  <ChevronRight size={16} className={`transition-transform ${themeMenuOpen ? 'rotate-90' : ''}`} />
                </button>

                {themeMenuOpen && (
                  <ul className="menu menu-sm ml-4 mt-2 space-y-1 animate-fade-in">
                    <li><button onClick={() => handleThemeChange('light')}>☀️ Light</button></li>
                    <li><button onClick={() => handleThemeChange('dark')}>🌙 Dark</button></li>
                    <li><button onClick={() => handleThemeChange('system')}>💻 System</button></li>
                  </ul>
                )}
              </li>
              <li><Link href="/logout" className="text-error">Logout</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
