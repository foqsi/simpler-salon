'use client';

import { Suspense } from 'react';
import RegisterPage from './RegisterPage';

export default function RegisterPageWithSuspense() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
}
