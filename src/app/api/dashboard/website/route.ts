import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: userData, error: userDataError } = await supabase
    .from('users')
    .select('business_id')
    .eq('id', user.id)
    .single();

  if (userDataError || !userData?.business_id) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 });
  }

  const { data: business, error: businessError } = await supabase
    .from('business')
    .select('*')
    .eq('id', userData.business_id)
    .single();

  if (businessError || !business) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 });
  }

  return NextResponse.json({
    companyName: business.name ?? '',
    slogan: business.slogan ?? '',
    bannerText: business.banner_texts ?? [],
    logoUrl: business.logo_url ?? '',
    bannerImages: business.banner_images ?? [],
    about: business.about ?? '',
    phone: business.phone ?? '',
    location: business.location ?? { street: '', city: '', state: '', zip: '' },
    businessHours: business.business_hours ?? {},
    CTA: 'Book Now',
    slug: business.slug ?? '',
    tier: business.tier ?? 'Free',
  });
}


export async function PUT(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    data,
    error,
  } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (data.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();

  const update = {
    name: body.companyName,
    slogan: body.slogan,
    banner_texts: body.bannerText,
    logo_url: body.logoUrl,
    banner_images: body.bannerImages,
    about: body.about,
    phone: body.phone,
    location: body.location,
    business_hours: body.businessHours,
  };

  const { error: updateError } = await supabase
    .from('business')
    .update(update)
    .eq('id', data.business_id);

  if (updateError) {
    console.error('Update error:', updateError.message);
    return NextResponse.json({ error: 'Failed to update business info' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
