'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

const tiers = [
  {
    price: '$0',
    title: 'Free',
    id: 'free',
    amount: 0,
    subtitle: 'So people can find you!',
    features: ['A home page', 'Basic Customization', 'E-Gift Cards*'],
    color: 'primary',
    btnColor: 'primary',
  },
  {
    price: '$200',
    title: 'Starter',
    id: 'starter',
    amount: 200,
    subtitle: 'Display your services!',
    features: ['Everything in Free', 'Customizable Services Page', 'E-Gift Cards*'],
    color: 'secondary',
    btnColor: 'secondary',
    badge: 'Popular',
  },
  {
    price: '$300',
    title: 'Essentials',
    id: 'essentials',
    amount: 300,
    subtitle: 'Show off your work!',
    features: ['Everything in Starter', 'Customizable Gallery Page', 'E-Gift Cards*'],
    color: 'primary',
    btnColor: 'primary',
  },
  {
    price: '$400',
    title: 'Ultimate',
    id: 'ultimate',
    amount: 400,
    subtitle: 'Online appointments?',
    features: ['Everything in Essentials', 'View Appointments', 'Advanced Customization', 'E-Gift Cards*'],
    color: 'primary',
    btnColor: 'primary',
  },
  {
    price: ' ',
    title: 'Custom',
    id: 'custom',
    amount: 0,
    subtitle: 'Full customization + support',
    features: ['Everything in Ultimate', 'Full Support', 'Full Customization', 'E-Gift Cards*'],
    color: 'secondary',
    btnColor: 'primary',
  },
];

const upgradePriceMap: Record<string, string> = {
  'starter-essentials': 'price_1Rdyr5K0jCwtzXAUrfDVVaBC',
  'starter-ultimate': 'price_1RdysNK0jCwtzXAUMDdAkNli',
  'essentials-ultimate': 'price_1RdysiK0jCwtzXAUjLItBJqS',

  // Full-price entries for free tier
  'free-starter': 'price_1RcmOgK0jCwtzXAU6ajrujTW',
  'free-essentials': 'price_1RcmPNK0jCwtzXAUVDT29uVz',
  'free-ultimate': 'price_1RcmQqK0jCwtzXAUWYqnYDxp',
};

export default function UpgradePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/user/profile/get', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.users);
      } else {
        toast.error('Failed to load profile.');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpgrade = async (from: string, to: string) => {
    const key = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const priceId = upgradePriceMap[key];

    if (!priceId) {
      console.error(`Upgrade price not found for path: "${key}"`);
      return toast.error('Upgrade path not available.');
    }

    const res = await fetch('/api/stripe/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, newTier: to }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      toast.error('Could not start checkout session.');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!profile) return <div className="text-center py-10 text-error">Profile not found.</div>;

  const currentTierIndex = tiers.findIndex(t => t.id === profile.tier);
  const currentAmount = tiers.find(t => t.id === profile.tier)?.amount || 0;

  return (
    <main className="bg-base-100 text-base-content px-4 py-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">Upgrade Your Plan</h1>
        <p className="text-base-content/80 text-sm md:text-base">
          Your current plan: <span className="text-secondary"><strong>{profile.tier.toUpperCase()}</strong></span>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto">
        {tiers.map((tier, i) => {
          const isCurrent = tier.id === profile.tier;
          const isDowngrade = i < currentTierIndex;
          const upgradeAmount = tier.amount - currentAmount;
          const canUpgrade = upgradeAmount > 0 && !isDowngrade && tier.id !== 'custom';

          return (
            <div
              key={tier.id}
              className={clsx(
                'relative flex flex-col border rounded-xl shadow-sm p-6 text-left',
                tier.color && `border-${tier.color}`,
                isCurrent ? 'bg-base-100' : 'bg-base-200 text-base-content opacity-100',
                isDowngrade && 'opacity-50 pointer-events-none'
              )}
            >
              {tier.badge && (
                <div className={`absolute top-4 right-4 badge badge-${tier.color} badge-lg`}>
                  {tier.badge}
                </div>
              )}

              <h2 className="text-xl font-semibold mb-1">{tier.title}</h2>
              <p className="text-sm text-base-content/70 mb-4">{tier.subtitle}</p>

              {tier.price.trim() ? (
                <p className="text-3xl font-bold mb-3">{tier.price}</p>
              ) : (
                <div className="h-12" />
              )}

              {isCurrent ? (
                <div className="btn btn-disabled mb-6">Current Plan</div>
              ) : canUpgrade ? (
                <button
                  onClick={() => handleUpgrade(profile.tier, tier.id)}
                  className={`btn btn-${tier.btnColor} w-full mb-6`}
                >
                  Upgrade for ${upgradeAmount}
                </button>
              ) : tier.id === 'custom' ? (
                <a href="/contact" className="btn btn-primary w-full mb-6">Contact Us</a>
              ) : (
                <div className="mb-6 h-[2.5rem]" />
              )}

              <hr className="mb-4 border-base-300" />

              <ul className="mt-2 space-y-3 text-sm">
                {tier.features.map((f, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-success">✔</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12 text-sm text-base-content/70 px-4">
        *E-Gift Card support is currently in development and will be made available to all users once implemented.
      </div>
    </main>
  );
}
