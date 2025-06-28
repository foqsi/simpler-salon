'use client';

import ParticlesBackground from '@/components/ParticlesBackground';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const phrases = [
    'Own Your Website',
    'No Monthly Fees',
    'Edit Anytime',
    'Small Business Perfection',
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === phrases.length) return;

    const timeout = setTimeout(() => {
      if (!reverse) {
        if (subIndex === phrases[index].length) {
          setReverse(true);
          return;
        }
        setSubIndex((prev) => prev + 1);
      } else {
        if (subIndex === 0) {
          setReverse(false);
          setIndex((prev) => (prev + 1) % phrases.length);
          return;
        }
        setSubIndex((prev) => prev - 1);
      }
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section className="relative min-h-screen bg-base-100 text-base-content overflow-hidden flex items-center">
      <ParticlesBackground />

      {/* Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-primary/30 rounded-full backdrop-blur-sm blur-3xl top-[-100px] left-[-80px] animate-blob" />
      <div className="absolute w-[400px] h-[400px] bg-secondary/30 rounded-full backdrop-blur-sm blur-3xl top-[10%] right-[-120px] animate-blob animation-delay-1000" />
      <div className="absolute w-[500px] h-[500px] bg-accent/30 rounded-full backdrop-blur-sm blur-3xl bottom-[-120px] left-1/2 transform -translate-x-1/2 animate-blob animation-delay-2000" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text column */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-secondary">
              {phrases[index].substring(0, subIndex)}
            </span>
            <span className="blinking-cursor text-primary">|</span>
          </h1>
          <p className="text-base md:text-lg text-base-content/80">
            Launch a modern, responsive site for your salon or small business. No subscriptions, just full ownership.
          </p>
          <div className="pt-4">
            <Link href="/register" className="btn btn-primary px-6">
              Get Started
            </Link>
          </div>
        </div>

        {/* Image column */}
        <div className="hidden md:block">
          <img
            src="/hero-demo.png"
            alt="Website preview"
            className="w-full max-w-md mx-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
