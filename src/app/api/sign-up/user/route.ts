import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  const { email, user_id, first_name, last_name, business_name, tier, pending_tier } = await req.json();

  if (!email || !user_id || !business_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const validTiers = ['free', 'starter', 'essentials', 'ultimate', 'custom', 'pending'];
  const safeTier = validTiers.includes(tier) ? tier : 'pending';
  const safePendingTier = validTiers.includes(pending_tier) ? pending_tier : null;

  const { data: bizData, error: bizError } = await supabaseAdmin
    .from('business')
    .insert({
      name: business_name,
      slug: business_name.toLowerCase().replace(/\s+/g, '-'),
      tier: safeTier,
      pending_tier: safePendingTier,
    })
    .select('id')
    .single();

  if (bizError) {
    console.error('Business creation error:', bizError);
    return NextResponse.json({ error: bizError.message }, { status: 500 });
  }

  const { error: userError } = await supabaseAdmin
    .from('users')
    .insert({
      id: user_id,
      first_name,
      last_name,
      email,
      business_id: bizData.id,
      role: 'admin',
    });

  if (userError) return NextResponse.json({ error: 'User creation failed' }, { status: 500 });

  return NextResponse.json({ success: true, business_id: bizData.id });
}
