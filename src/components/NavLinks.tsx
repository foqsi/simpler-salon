import Link from 'next/link';

const linkClass = `
  relative text-secondary font-semibold hover:text-accent after:content-[''] after:absolute after:bottom-0 after:left-1/2
  after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-current
  after:transition-all after:duration-300 hover:after:w-full
`;

export function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link href="/" className={linkClass} onClick={onClick}>Home</Link>
      <Link href="/product" className={linkClass} onClick={onClick}>Product</Link>
      <Link href="/pricing" className={linkClass} onClick={onClick}>Pricing</Link>
    </>
  )
}

export function QuickLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <li><Link href="/" className={linkClass} onClick={onClick}>Home</Link></li>
      {/* <li><Link href="/product" className={linkClass} onClick={onClick}>Product</Link></li> */}
      <li><Link href="/pricing" className={linkClass} onClick={onClick}>Pricing</Link></li>
    </>
  )
}

export function RequestDemoNav({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link href="/request-demo" className={linkClass} onClick={onClick}>Request Demo</Link>
    </>
  )
}

export function RequestDemo({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <li><Link href="/request-demo" className={linkClass} onClick={onClick}>Request Demo</Link></li>
    </>
  )
}

export function ViewDemo({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <li><Link href="https://www.demo.simplersalon.com" target="_blank" className={linkClass} onClick={onClick}>View Demo</Link></li>
    </>
  )
}

export function AddtlLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <li><Link href="/about" className={linkClass} onClick={onClick}>About</Link></li>
    </>
  );
}

export function AuthLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link href="/login" className={linkClass} onClick={onClick}>Login</Link>
      <Link href="/register" className={linkClass} onClick={onClick}>Register</Link>
    </>
  );
}

export function LegalLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      {/* <li><Link href="/privacy-policy" className={linkClass} onClick={onClick}>Privacy Policy</Link></li> */}
      <li><Link href="/terms-of-service" className={linkClass} onClick={onClick}>Terms of Service</Link></li>
      {/* <Link href="/cookie-policy" className={linkClass} onClick={onClick}>Cookie Policy</Link> */}
    </>
  );
}