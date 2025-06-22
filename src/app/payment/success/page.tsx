// app/payment/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setMessage('Missing session ID. Please contact support.');
      setLoading(false);
      return;
    }

    // Optional: Verify the session and upgrade the user
    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/stripe/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

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
      }
    };

    verifyPayment();
  }, [sessionId]);

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
