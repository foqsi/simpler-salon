'use client';

import Link from 'next/link';

interface NavLinksProps {
  tier?: string;
  onClick?: () => void;
}

export default function NavLinks({ tier, onClick }: NavLinksProps) {
  const linkClass = 'block md:inline text-secondary/80 text-lg hover:text-secondary';

  return (
    <>
      <Link href="/s/" className={linkClass} onClick={onClick}>
        Home
      </Link>

      <Link href="/s/services" className={linkClass} onClick={onClick}>
        Services
      </Link>

      {(tier === 'starter' || tier === 'essentials' || tier === 'ultimate') && (
        <Link href="/s/gallery" className={linkClass} onClick={onClick}>
          Gallery
        </Link>
      )}

      {(tier === 'essentials' || tier === 'ultimate' || tier === 'appointments') && (
        <Link href="/s/appointment" className={linkClass} onClick={onClick}>
          Appointments
        </Link>
      )}

      <Link href="/s/contact" className={linkClass} onClick={onClick}>
        Contact
      </Link>
    </>
  );
}
