import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function PUT(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();

  // Update user profile fields
  const { first_name, last_name, phone } = body;
  const { error: userUpdateError } = await supabase
    .from('users')
    .update({ first_name, last_name, phone })
    .eq('id', user.id);

  if (userUpdateError) {
    return NextResponse.json({ error: userUpdateError.message }, { status: 500 });
  }

  // Fetch user's business ID
  const { data: userRow, error: fetchUserError } = await supabase
    .from('users')
    .select('business_id')
    .eq('id', user.id)
    .single();

  if (fetchUserError || !userRow?.business_id) {
    return NextResponse.json({ error: 'Could not find associated business' }, { status: 404 });
  }

  // Update business fields
  const {
    name,
    street,
    city,
    state,
    zip,
    email: business_email,
    phone: business_phone,
    custom_domain,
  } = body;

  const { error: businessUpdateError } = await supabase
    .from('business')
    .update({
      name,
      street,
      city,
      state,
      zip,
      email: business_email,
      phone: business_phone,
      custom_domain,
    })
    .eq('id', userRow.business_id);

  if (businessUpdateError) {
    return NextResponse.json({ error: businessUpdateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
