import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { user_id, email, first_name, last_name, phone, tier, business_id } = await req.json();

  if (!user_id || !email) {
    return NextResponse.json({ error: 'Missing user_id or email' }, { status: 400 });
  }

  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase
    .from('users').insert({
      id: user_id,
      email,
      first_name: first_name || '',
      last_name: last_name || '',
      phone: phone || '',
      tier: tier || 'basic',
      business_id: business_id || null,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
