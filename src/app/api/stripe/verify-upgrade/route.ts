import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import supabaseAdmin from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ success: false, error: 'Missing session ID' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = session.metadata?.user_id;
    const newTier = session.metadata?.newTier;

    if (!userId || !newTier) {
      return NextResponse.json({ success: false, error: 'Missing metadata' }, { status: 400 });
    }

    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('business_id, role')
      .eq('id', userId)
      .single();

    if (userError || !userData?.business_id) {
      console.error('User lookup error:', userError?.message);
      return NextResponse.json({ success: false, error: 'User or business not found' }, { status: 404 });
    }

    if (userData.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Only admins can upgrade' }, { status: 403 });
    }

    const { error: updateError } = await supabaseAdmin
      .from('business')
      .update({ tier: newTier, pending_tier: null })
      .eq('id', userData.business_id);

    if (updateError) {
      console.error('Supabase update error:', updateError.message);
      return NextResponse.json({ success: false, error: 'Failed to update tier' }, { status: 500 });
    }

    return NextResponse.json({ success: true, tier: newTier });
  } catch (err) {
    console.error('Stripe session retrieval error:', err);
    return NextResponse.json({ success: false, error: 'Session retrieval failed' }, { status: 500 });
  }
}
