import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export async function GET({ params }: { params: { slug: string } }) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { slug } = params;

  const { data, error } = await supabase
    .from('business')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 });
  }

  return NextResponse.json({
    companyName: data.name,
    slogan: data.slogan,
    logoUrl: data.logo_url,
    about: data.about,
    bannerText: data.banner_texts,
    bannerImages: data.banner_images,
    phone: data.phone,
    location: data.location,
    businessHours: data.business_hours,
    CTA: 'Book Now',
  });
}
