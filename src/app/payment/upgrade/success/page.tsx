'use client';

import { useEffect, useState } from 'react';

export default function UpgradeSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyUpgrade = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setMessage('Missing session ID. Please contact support.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/stripe/verify-upgrade', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (!res.ok) throw new Error('Upgrade verification failed.');

        const { success, tier } = await res.json();
        if (success) {
          setMessage(`🎉 Your upgrade to the ${tier} plan was successful.`);
        } else {
          setMessage('Payment succeeded, but your account was not updated. Please contact support.');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUpgrade();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100 text-base-content px-4">
      <div className="bg-base-200 p-8 rounded-xl shadow-lg text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-4">✅ Upgrade Complete</h1>
        {loading ? (
          <p className="text-sm text-base-content/70">Verifying your upgrade...</p>
        ) : (
          <p className="text-sm text-base-content/80">{message}</p>
        )}
      </div>
    </main>
  );
}
