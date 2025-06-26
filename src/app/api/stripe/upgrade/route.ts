import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import supabaseAdmin from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  const { priceId, newTier, email } = await req.json();

  if (!priceId || !newTier || !email) {
    return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
  }

  // Look up user from Supabase by email
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('id, email, business_id')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/upgrade/success?session_id={CHECKOUT_SESSION_ID}&upgrade=${newTier}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/upgrade/cancelled`,
    metadata: {
      user_id: user.id,
      business_id: user.business_id || '',
      newTier,
      upgrade: 'true',
    },
  });

  return NextResponse.json({ url: session.url });
}
