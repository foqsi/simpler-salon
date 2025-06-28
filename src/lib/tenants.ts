import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getTenantBySlug(slug: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('business')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Tenant fetch failed:', error?.message);
    return null;
  }

  return data;
}
