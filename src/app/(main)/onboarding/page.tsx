'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const steps = [
  {
    title: 'Welcome to Simpler Salon!',
    content: `We’re glad you’re here. Let’s walk you through getting started with your new website.`,
  },
  {
    title: 'Choose Your Domain',
    content: `We’ll help you set up a custom domain (or use a free one). This can be changed later.`,
  },
  {
    title: 'Customize Your Branding',
    content: `Pick your colors and logo. You’ll be able to preview and adjust your site’s look.`,
  },
  {
    title: 'Get Ready to Launch',
    content: `Final setup steps. Once you’re done, you’ll be ready to go live!`,
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push('/dashboard/onboarding');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-base-100 text-base-content">
      <div className="w-full max-w-2xl bg-base-200 p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold">{steps[currentStep].title}</h1>
        <p className="text-sm text-base-content/80">{steps[currentStep].content}</p>

        <div className="flex justify-between pt-8">
          <div className="text-sm text-base-content/60">
            Step {currentStep + 1} of {steps.length}
          </div>
          <Button variant="primary" onClick={handleNext}>
            {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </div>
    </main>
  );
}
