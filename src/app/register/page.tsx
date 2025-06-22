'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import supabase from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from '@/components/Modal';
import InputField from '@/components/ui/Input';
import toast from 'react-hot-toast';

function PasswordTooltip({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', check: (pw: string) => pw.length >= 8 },
    { label: 'One uppercase letter', check: (pw: string) => /[A-Z]/.test(pw) },
    { label: 'One lowercase letter', check: (pw: string) => /[a-z]/.test(pw) },
    { label: 'One number', check: (pw: string) => /\d/.test(pw) },
    { label: 'One symbol', check: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
  ];
  return (
    <div className="absolute bottom-full mb-2 w-64 rounded-lg bg-base-300 p-4 text-sm shadow-lg border border-base-200 animate-fade-in z-20">
      <p className="mb-2 font-semibold">Password must include:</p>
      <ul className="space-y-1">
        {checks.map(({ label, check }) => (
          <li key={label} className={check(password) ? 'text-success' : 'text-gray-400'}>
            • {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') || 'free';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [tooltip, setTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifyFocused, setIsVerifyFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRegister = async () => {
    if (password !== verifyPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      toast.error(error?.message || 'Error creating account');
      setLoading(false);
      return;
    }

    const user = data.user;

    const res = await fetch('/api/sign-up/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        business_name: businessName,
        tier: tier === 'free' ? 'free' : 'pending',
        pending_tier: tier !== 'free' ? tier : null,
      }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error || 'Signup failed');
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowModal(true);
    setTimeout(() => router.push('/login'), 10000);
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center px-4 bg-base-100 text-base-content">
        <div className="flex w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden">
          <section className="w-full max-w-md p-8 space-y-6 bg-base-200">
            <h1 className="text-2xl font-bold">Sign up for your website</h1>
            <p className="text-sm">No monthly fees. One-time payment. Own it forever.</p>
            <p className="text-sm text-info">
              You're signing up for the <strong>{tier.toUpperCase()}</strong> plan.
            </p>
            <div className="space-y-4">
              <InputField placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <InputField placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <InputField placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              <InputField type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div className="relative" onFocus={() => setTooltip(true)} onBlur={() => setTooltip(false)}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-12"
                />
                <button onClick={() => setShowPassword((p) => !p)} type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-70">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                {tooltip && <PasswordTooltip password={password} />}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Verify password"
                  value={verifyPassword}
                  onFocus={() => setIsVerifyFocused(true)}
                  onBlur={() => setIsVerifyFocused(false)}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className="input input-bordered w-full"
                />
                {verifyPassword && isVerifyFocused && (
                  <div className="absolute bottom-full mb-2 text-sm px-4 py-2 rounded-lg shadow-lg bg-base-300 border border-base-200 animate-fade-in z-20">
                    {password === verifyPassword ? (
                      <span className="text-success font-medium">✅ Passwords match</span>
                    ) : (
                      <span className="text-error font-medium">❌ Passwords do not match</span>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-2">
                <Button className="w-full" variant="primary" onClick={handleRegister} loading={loading}>
                  Sign up
                </Button>
              </div>
            </div>
            <p className="mt-4 text-center text-sm">
              Already have an account? <Link href="/login" className="link link-primary">Login</Link>
            </p>
          </section>
          <aside className="hidden md:flex flex-col justify-center p-8 w-full bg-base-300">
            <h2 className="text-2xl font-bold mb-4">What You’ll Get</h2>
            <p className="mb-6 text-sm">Whether you're just starting out or want a full salon booking platform, Simpler Salon has a one-time solution for you.</p>
            <h3 className="text-lg font-semibold mb-2">Included benefits:</h3>
            <ul className="space-y-2 text-sm">
              <li>✔️ No monthly subscriptions</li>
              <li>✔️ Fully mobile-friendly website</li>
              <li>✔️ Editable gallery & services</li>
              <li>✔️ Admin tools for updating your content</li>
              <li>✔️ One-time setup — you own the site</li>
              <li>✔️ Free access to E-Gift Cards*</li>
              <li>✔️ Appointment tracking tools (with premium tiers)</li>
            </ul>
          </aside>
        </div>
      </main>
      <Modal isOpen={showModal}>
        <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
        <p className="text-sm text-gray-500">We've sent a confirmation link to <strong>{email}</strong>. Please verify your email to continue.</p>
      </Modal>
    </>
  );
}
