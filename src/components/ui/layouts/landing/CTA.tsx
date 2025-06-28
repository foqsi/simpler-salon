'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-primary text-primary-content text-center px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Own Your Website?
        </h2>
        <p className="text-base md:text-lg">
          Skip the monthly fees. Get a beautiful, editable site for your business — forever.
        </p>
        <Link href="/register" className="btn bg-primary-content text-primary rounded-md hover:opacity-90">
          Get Started Today
        </Link>
        <p className="text-sm opacity-80">
          No subscriptions. No hidden costs. One-time payment.
        </p>
      </div>
    </section>

  );
}
