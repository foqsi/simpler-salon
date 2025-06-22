import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const { name } = await req.json();

  const { data, error } = await supabase
    .from('business')
    .insert({ name })
    .select('id')
    .single();

  if (error) {
    console.error('❌ Failed to create business:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ business_id: data.id }, { status: 200 });
}
