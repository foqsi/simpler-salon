'use client';

import { Sparkles, ShieldCheck, Paintbrush, Smartphone, Wand2, Settings2 } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: 'Pay Once, Own It',
    desc: 'No subscriptions. You get full access and ownership with a single payment.',
  },
  {
    icon: <Settings2 className="w-6 h-6 text-secondary" />,
    title: 'Simple Dashboard',
    desc: 'Update services, gallery, and promotions without touching code.',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-accent" />,
    title: 'Mobile-Ready Design',
    desc: 'Your site will look amazing on any device—phone, tablet, or desktop.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-success" />,
    title: 'Fast & Secure',
    desc: 'Optimized for performance and protected with SSL and best practices.',
  },
  {
    icon: <Paintbrush className="w-6 h-6 text-warning" />,
    title: 'Custom Branding',
    desc: 'We match your business colors, style, and tone for a cohesive look.',
  },
  {
    icon: <Wand2 className="w-6 h-6 text-info" />,
    title: 'Free Setup Help',
    desc: 'We’ll help you connect your domain and get launched with ease.',
  },
];

export default function Features() {
  return (
    <section className="bg-base-100 text-base-content px-4 py-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Everything You Need. Nothing You Don’t.</h2>
        <p className="text-sm md:text-base mt-4 text-base-content/80">
          Simpler Salon gives small businesses a modern website with no recurring fees.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="card bg-base-200 p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">{feature.icon}<h3 className="font-semibold text-lg">{feature.title}</h3></div>
            <p className="text-sm text-base-content/80">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
