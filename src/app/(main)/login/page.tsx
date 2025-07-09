'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import supabase from '@/lib/supabaseBrowserClient';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      setErrorMsg(error.message || 'Login failed');
      return;
    }

    try {
      const profileRes = await fetch('/api/user/profile/get', {
        method: 'GET',
        credentials: 'include',
      });

      if (!profileRes.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const { users: user } = await profileRes.json();

      if (!user?.business_id) {
        throw new Error('Missing business ID');
      }

      if (user.role == 'admin' && !user.has_onboarded) {
        router.push('/dashboard/onboarding');
        return;
      }

      const businessRes = await fetch(`/api/business/get?id=${user.business_id}`, {
        credentials: 'include',
      });

      if (!businessRes.ok) {
        throw new Error('Failed to fetch business information');
      }

      const business = await businessRes.json();

      if (business?.tier === 'pending') {
        setTimeout(() => router.push('/payment/pending'), 1000);
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 bg-base-100 text-base-content">
      <section className="w-full max-w-md space-y-8 p-8 rounded-xl shadow-md bg-base-200">
        <h1 className="text-2xl font-semibold text-center">Log in to your account</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input input-primary w-full"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input input-primary w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-70"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {errorMsg && (
            <p className="text-error text-sm">{errorMsg}</p>
          )}

          <Button variant="primary" className="w-full" onClick={handleLogin} loading={loading}>
            Log In
          </Button>
        </div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{' '}
          <Link href="/register" className="link link-primary">Sign up for free</Link>
        </p>
      </section>
    </main>
  );
}
