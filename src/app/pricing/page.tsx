'use client';

export default function PricingPage() {
  const tiers = [
    {
      price: '$50',
      title: 'Starter',
      subtitle: 'For simple online presence',
      features: [
        'Header, Landing Page, Footer',
        'E-Gift Cards*',
      ],
      color: 'primary',
      badge: null,
    },
    {
      price: '$200',
      title: 'Essentials',
      subtitle: 'Add gallery and services',
      features: [
        'Everything in Starter',
        'Gallery + Services Section',
        'Basic Customization',
        'E-Gift Cards*',
      ],
      color: 'secondary',
      badge: 'Popular',
    },
    {
      price: '$300',
      title: 'Appointments',
      subtitle: 'Let clients book online',
      features: [
        'Everything in Essentials',
        'Appointment Viewer',
        'Moderate Customization',
        'E-Gift Cards*',
      ],
      color: 'accent',
      badge: null,
    },
    {
      price: '$400',
      title: 'Advanced',
      subtitle: 'Client data collection + more',
      features: [
        'Everything in Appointments',
        'Custom Client Queries',
        'Advanced Customization',
        'E-Gift Cards*',
      ],
      color: 'info',
      badge: null,
    },
    {
      price: '$600',
      title: 'Premium',
      subtitle: 'Full customization + support',
      features: [
        'Everything in Advanced',
        'Full Support',
        'Full Customization',
        'E-Gift Cards*',
      ],
      color: 'success',
      badge: 'Best Value',
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
            <p className="text-3xl font-bold mb-3">{tier.price}</p>

            {/* CTA */}
            <a
              href="/register"
              className={`btn btn-${tier.color} w-full mb-6`}
            >
              Get Started
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
