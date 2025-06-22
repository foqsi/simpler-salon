'use client';

import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DashboardHeaderProps {
  onOpenSidebar: () => void;
  firstName: string;
  lastName?: string;
}

export default function DashboardHeader({ onOpenSidebar, firstName, lastName }: DashboardHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = () => {
    if (firstName && lastName) return firstName[0] + lastName[0];
    if (firstName.length >= 2) return firstName.slice(0, 2);
    return firstName.charAt(0) || 'SS';
  };

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Handle outside click to close dropdowns
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
    localStorage.setItem('theme', theme);
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
        <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          Simpler Salon
        </h2>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(prev => !prev)}
          className="flex items-center gap-2 btn btn-ghost px-2"
        >
          <div className="w-8 h-8 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
            <span className="text-sm">{getInitials().toUpperCase()}</span>
          </div>
          <ChevronDown size={16} className="opacity-70" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-auto bg-base-200 border border-base-300 rounded-lg shadow-lg animate-fade-in z-50">
            <ul className="menu menu-xl md:menu-lg p-2">
              <li>
                <Link href="/dashboard/profile" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" onClick={() => setDropdownOpen(false)}>
                  Settings
                </Link>
              </li>
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
              <li>
                <Link href="/logout" onClick={() => setDropdownOpen(false)} className="text-error">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}