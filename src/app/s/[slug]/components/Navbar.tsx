// /app/s/[slug]/components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './NavLinks';

interface BusinessData {
  name: string;
  logo_url: string;
  tier: string;
  slug: string;
}

export default function Navbar({ business }: { business: BusinessData }) {
  return (
    <nav className="bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={`/s/${business.slug}`} className="flex items-center space-x-2">
          {business.logo_url && (
            <Image
              src={business.logo_url}
              alt={`${business.name} logo`}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span className="text-2xl font-bold text-base-content/50">
            {business.name}
          </span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavLinks tier={business.tier} />
        </div>

        {/* mobile menu omitted for brevity */}
      </div>
    </nav>
  );
}
