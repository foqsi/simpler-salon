'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image, Calendar, Scissors, X, Computer } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Home', icon: <Home size={18} /> },
  { href: '/dashboard/website', label: 'Website', icon: <Computer size={18} /> },
  { href: '/dashboard/services', label: 'Services', icon: <Scissors size={18} /> },
  { href: '/dashboard/gallery', label: 'Gallery', icon: <Image size={18} /> },
  { href: '/dashboard/appointments', label: 'Appointments', icon: <Calendar size={18} /> },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

      <aside
        className={`
    bg-base-200 border-r border-base-300 p-4 min-h-screen w-64 z-50
    transition-transform duration-300
    fixed top-0 left-0 md:static md:translate-x-0
    ${open ? 'translate-x-0' : '-translate-x-full'}
  `}
      >
        <div className="flex items-center mb-6 gap-4">
          <button onClick={onClose} className="btn btn-sm btn-ghost md:hidden">
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold mx-auto">Dashboard</h2>
        </div>


        <ul className="space-y-2">
          {links.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-base-300 transition ${pathname === href ? 'bg-base-300 font-semibold' : ''
                  }`}
                onClick={onClose}
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
