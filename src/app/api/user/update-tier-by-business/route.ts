import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  const { business_id, tier } = await req.json();

  const { error } = await supabaseAdmin
    .from('users')
    .update({ tier })
    .eq('business_id', business_id)
    .eq('role', 'admin'); // optional: only update admin user

  if (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to update user tier' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
