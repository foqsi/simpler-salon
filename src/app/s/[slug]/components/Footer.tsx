import { MapPin, Phone } from 'lucide-react';
import NavLinks from './NavLinks';

type BusinessData = {
  name: string;
  phone: string;
  slogan: string;
  logo_url: string;
  tier: string;
  location?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  businessHours?: Record<string, { open: string; close: string }>;
};

export default function Footer({ business }: { business: BusinessData }) {
  const formatAddress = () => {
    if (!business.location) return '';
    const { street, city, state, zip } = business.location;
    return [street, city, state, zip].filter(Boolean).join(', ');
  };

  return (
    <footer className="bg-base-300 text-neutral-content py-12 mt-24">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding & Contact */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{business.name || 'Your Business Name'}</h2>
          <p className="text-neutral-content/70 mb-4">{business.slogan || 'Your slogan'}</p>

          <div className="space-y-2 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              {formatAddress() || 'Your Business Address'}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <a href={`tel:${business.phone || '14056665565'}`} className="hover:underline">
                {business.phone || '(405) 666-5565'}
              </a>
            </p>
          </div>

          {/* Business Hours */}
          <div className="mt-6 text-sm text-neutral-content/70">
            <h4 className="font-semibold mb-2 text-neutral-content">Business Hours</h4>
            <ul className="space-y-1">
              {business.businessHours ? (
                Object.entries(business.businessHours).map(([day, { open, close }]) => (
                  <li key={day}>
                    {day}: {open || 'Closed'} – {close || 'Closed'}
                  </li>
                ))
              ) : (
                <>
                  <li>Sunday: 12:00 PM – 6:00 PM</li>
                  <li>Monday – Saturday: 10:00 AM – 7:00 PM</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="space-y-2 text-sm text-accent">
            <NavLinks tier={business.tier} />
          </div>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com/elrenonailspa/"
              className="text-accent hover:text-accent/80 transition"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.instagram.com/elrenonailspa/"
              className="text-accent hover:text-accent/80 transition"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} {business.name || 'Your Business Name'}. All rights reserved.
        <div className="mt-2 text-xs">
          Website by{' '}
          <a
            href="https://simplersalon.com"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Simpler Salon
          </a>
          , a one-time-fee web design service.
        </div>
      </div>
    </footer>
  );
}
