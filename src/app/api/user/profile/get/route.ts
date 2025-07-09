import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
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
      .select('first_name, last_name, phone, email, business_id, has_onboarded')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError.message);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json({
      users: userData,
    });
  } catch (err) {
    console.error('Unhandled error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
