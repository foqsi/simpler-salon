'use client';

export default function PricingPage() {
  const tiers = [
    {
      price: '$0',
      title: 'Free',
      subtitle: 'So people can find you!',
      features: [
        'A home page',
        'Basic Customization',
        'E-Gift Cards*',
      ],
      color: 'primary',
      btnColor: 'primary',
      href: '/register?tier=free',
      badge: null,
    },
    {
      price: '$200',
      title: 'Starter',
      subtitle: 'Display your services!',
      features: [
        'Everything in Free',
        'Customizable Services Page',
        'E-Gift Cards*',
      ],
      color: 'secondary',
      btnColor: 'secondary',
      href: '/register?tier=starter',
      badge: 'Popular',
    },
    {
      price: '$300',
      title: 'Essentials',
      subtitle: 'Show off your work!',
      features: [
        'Everything in Starter',
        'Customizable Gallery Page',
        'E-Gift Cards*',
      ],
      color: 'primary',
      btnColor: 'primary',
      href: '/register?tier=essentials',
      badge: null,
    },
    {
      price: '$400',
      title: 'Ultimate',
      subtitle: 'Online appointments?',
      features: [
        'Everything in Essentials',
        'View Appointments',
        'Advanced Customization',
        'E-Gift Cards*',
      ],
      color: 'primary',
      btnColor: 'primary',
      href: '/register?tier=ultimate',
      badge: null,
    },
    {
      price: ' ',
      title: 'Custom',
      subtitle: 'Full customization + support',
      features: [
        'Everything in Ultimate',
        'Full Support',
        'Full Customization',
        'E-Gift Cards*',
      ],
      color: 'secondary',
      btnColor: 'primary', // for example
      href: '/contact',
      badge: null,
    },
  ];

  return (
    <main className="bg-base-100 text-base-content px-4 py-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">Pricing</h1>
        <p className="text-base-content/80 text-sm md:text-base">
          Pay once. No subscriptions. Keep your website forever.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`relative flex flex-col border border-base-300 bg-base-200 rounded-xl shadow-sm p-6 text-left`}
          >
            {/* Badge */}
            {tier.badge && (
              <div className={`absolute top-4 right-4 badge badge-${tier.color} badge-lg`}>
                {tier.badge}
              </div>
            )}

            {/* Title */}
            <h2 className="text-xl font-semibold mb-1">{tier.title}</h2>
            <p className="text-sm text-base-content/70 mb-4">{tier.subtitle}</p>

            {/* Price */}
            {tier.price.trim() ? (
              <p className="text-3xl font-bold mb-3">{tier.price}</p>
            ) : (
              <div className="h-12" /> // Approx height of the price
            )}


            {/* CTA */}
            <a
              href={tier.href}
              className={`btn btn-${tier.btnColor} w-full mb-6`}
            >
              {tier.title === 'Custom' ? 'Contact Us' : 'Get Started'}
            </a>

            {/* Divider */}
            <hr className="mb-4 border-base-300" />

            {/* Features */}
            <ul className="mt-2 space-y-3 text-sm">
              {tier.features.map((f, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-success">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* E-Gift Card Disclaimer */}
      <div className="text-center mt-12 text-sm text-base-content/70 px-4">
        *E-Gift Card support is currently in development and will be made available to all users once implemented.
      </div>
    </main>
  );
}
