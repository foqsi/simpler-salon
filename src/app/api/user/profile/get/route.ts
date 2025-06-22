import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { user },
      error: userFetchError,
    } = await supabase.auth.getUser();

    if (userFetchError) {
      console.error('Auth error:', userFetchError.message);
    }

    if (!user) {
      console.error('No user found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('first_name, last_name, phone, email, tier, pending_tier, business_id')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError.message);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    const { data: businessData, error: businessError } = await supabase
      .from('business')
      .select('name, street, city, state, email, zip, phone, custom_domain')
      .eq('id', userData.business_id)
      .single();

    if (businessError) {
      console.error('Error fetching business data:', businessError.message);
      return NextResponse.json({ error: businessError.message }, { status: 500 });
    }

    return NextResponse.json({
      users: userData,
      business: businessData,
    });
  } catch (err) {
    console.error('Unhandled error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
