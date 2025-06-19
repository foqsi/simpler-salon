// lib/posthogClient.ts
'use client'; // Ensure this runs only on the client

import posthog from 'posthog-js';

let posthogInitialized = false;

export function initPosthog() {
  if (typeof window !== 'undefined' && !posthogInitialized) {
    posthog.init('POSTHOG_API_KEY', {
      api_host: 'https://app.posthog.com',
    });
    posthogInitialized = true; // Prevent re-initialization
  }
}
