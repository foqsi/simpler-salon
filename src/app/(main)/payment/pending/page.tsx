'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function PaymentPendingPage() {
  const router = useRouter();
  const [pendingTier, setPendingTier] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const tierDetails: Record<string, { subtitle: string; features: string[] }> = {
    starter: {
      subtitle: 'One-Time Payment - Display your services!',
      features: [
        'A home page',
        'Basic Customization',
        'Customizable Services Page',
        'E-Gift Cards*',
      ],
    },
    essentials: {
      subtitle: 'One-Time Payment - Show off your work!',
      features: [
        'A home page',
        'Basic Customization',
        'Customizable Services Page',
        'Editable Gallery Page',
        'E-Gift Cards*',
      ],
    },
    ultimate: {
      subtitle: 'One-Time Payment - Online appointments?',
      features: [
        'A home page',
        'Basic Customization',
        'Customizable Services Page',
        'Editable Gallery Page',
        'Take and view online appointments',
        'E-Gift Cards*',
      ],
    },
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user/profile/get', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        router.push('/login');
        return;
      }

      const { users } = await res.json();
      setPendingTier(users.pending_tier);
      setEmail(users.email);
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleCheckout = async () => {
    if (!email) return;

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const { url } = await res.json();
    if (url) {
      window.location.href = url;
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-base-100 text-base-content">
        <p className="text-sm">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content px-4">
      <div className="bg-base-200 p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">One More Step</h1>
        <p className="text-sm mb-2">
          You’ve signed up and verified your email — now complete your payment to access the features you want.
        </p>

        <p className="text-base-content/70 text-sm mb-2">
          Selected plan:{' '}
          <span className="font-semibold capitalize text-info">{pendingTier || 'N/A'}</span>
        </p>

        {pendingTier && tierDetails[pendingTier] && (
          <div className="text-left mt-6">
            <p className="font-semibold mb-2 text-center">{tierDetails[pendingTier].subtitle}</p>
            <ul className="space-y-2 text-sm list-inside">
              {tierDetails[pendingTier].features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-success">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <Button variant="primary" onClick={handleCheckout}>
            Continue to Checkout
          </Button>
        </div>
      </div>
    </main>
  );

}
