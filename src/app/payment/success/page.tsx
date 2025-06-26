'use client';

import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const isUpgrade = params.get('upgrade') === 'true';

    if (!sessionId) {
      setMessage('Missing session ID. Please contact support.');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(isUpgrade ? '/api/stripe/verify-upgrade' : '/api/stripe/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (isUpgrade) {
          console.log('upgrade')
        }
        if (!res.ok) throw new Error('Payment verification failed.');

        const { success, tier } = await res.json();
        if (success) {
          setMessage(`Payment confirmed! Your ${tier} plan is now active.`);
        } else {
          setMessage('Payment succeeded but we couldn’t update your account. Please contact support.');
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

    verifyPayment();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100 text-base-content px-4">
      <div className="bg-base-200 p-8 rounded-xl shadow-lg text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-4">🎉 Payment Successful</h1>
        {loading ? (
          <p className="text-sm text-base-content/70">Verifying your payment...</p>
        ) : (
          <p className="text-sm text-base-content/80">{message}</p>
        )}
      </div>
    </main>
  );
}
