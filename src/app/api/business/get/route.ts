import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const id = req.nextUrl.searchParams.get('id');

  const { data, error } = await supabase
    .from('business')
    .select('tier, pending_tier')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json(data);
}
