'use client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import supabase from '@/lib/supabaseBrowserClient';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}
