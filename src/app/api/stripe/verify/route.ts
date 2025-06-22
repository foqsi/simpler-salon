// /app/api/stripe/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import supabaseAdmin from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ success: false, message: 'Payment not completed' }, { status: 400 });
    }

    const { business_id } = session.metadata || {};
    if (!business_id) {
      return NextResponse.json({ success: false, message: 'Missing business ID' }, { status: 400 });
    }

    // Find the admin user for that business
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('business_id', business_id)
      .eq('role', 'admin')
      .single();

    if (error || !user) {
      console.error('User lookup failed:', error);
      return NextResponse.json({ success: false, message: 'Admin user not found' }, { status: 404 });
    }

    if (!user.pending_tier) {
      return NextResponse.json({ success: false, message: 'No pending tier found' }, { status: 400 });
    }

    // Update tier and clear pending_tier
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ tier: user.pending_tier, pending_tier: null })
      .eq('id', user.id);

    if (updateError) {
      console.error('Tier update failed:', updateError);
      return NextResponse.json({ success: false, message: 'Tier update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, tier: user.pending_tier });
  } catch (err) {
    console.error('Stripe verify error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
