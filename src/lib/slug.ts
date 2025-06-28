import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getUniqueSlug(baseName: string): Promise<string> {
  const baseSlug = slugify(baseName);
  const supabase = createServerActionClient({ cookies });

  let slug = baseSlug;
  let i = 1;

  while (true) {
    const { data, error } = await supabase
      .from('business')
      .select('id')
      .eq('slug', slug)
      .limit(1)
      .then((res) => ({ data: res.data?.[0], error: res.error }));

    if (!data) break;

    if (error) {
      console.error(error);
    }

    slug = `${baseSlug}-${i++}`;
  }

  return slug;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // replace one or more non-alphanumerics with a single hyphen
    .replace(/^-+|-+$/g, '')       // trim hyphens from start/end
    .slice(0, 50);                 // length limit
}

export function tierAllows(
  tier: 'free' | 'starter' | 'essentials' | 'ultimate',
  feature: 'services' | 'gallery' | 'appointments'
) {
  const access: Record<'free' | 'starter' | 'essentials' | 'ultimate',
    Array<'services' | 'gallery' | 'appointments'>> = {
    free: [],
    starter: ['services'],
    essentials: ['services', 'gallery'],
    ultimate: ['services', 'gallery', 'appointments'],
  };
  return access[tier]?.includes(feature);
}
