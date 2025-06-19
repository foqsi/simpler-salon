'use client';

import { QuickLinks, LegalLinks } from '@/components/NavLinks';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Logo className="w-12 h-12" />
            <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Simpler Salon
            </h2>
          </div>
          <p className="text-sm">
            Stop paying monthly for your small business&apos; website. Pay once, own it forever, and update whenever you want.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title text-accent">Quick Links</h3>
          <ul className="menu menu-vertical p-0 text-sm space-y-2">
            <QuickLinks />
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="footer-title text-accent">Legal</h3>
          <ul className="menu menu-vertical p-0 text-sm space-y-2">
            <LegalLinks />
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center border-t border-neutral py-6 text-sm">
        &copy; {new Date().getFullYear()} Simpler Salon. All rights reserved.
      </div>
    </footer>
  );
}
