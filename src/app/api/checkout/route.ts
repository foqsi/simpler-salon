import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const priceMap: Record<string, string> = {
    starter: 'price_1RcmOgK0jCwtzXAU6ajrujTW',
    essentials: 'price_1RcmPNK0jCwtzXAUVDT29uVz',
    ultimate: 'price_1RcmQqK0jCwtzXAUWYqnYDxp',
    // starter: 'price_1RcXJ7K0jCwtzXAUS6z3fM2p',
    // essentials: 'price_1RcXJMK0jCwtzXAUAKz2D3LD',
    // ultimate: 'price_1RcXJZK0jCwtzXAUxF5o3f45',
  };

  // Get user's pending_tier and business_id
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('pending_tier, business_id')
    .eq('email', email)
    .single();

  if (error || !user?.pending_tier) {
    return NextResponse.json({ error: 'No pending tier found' }, { status: 400 });
  }

  const tier = user.pending_tier;

  if (!priceMap[tier]) {
    return NextResponse.json({ error: 'Invalid pending tier' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price: priceMap[tier],
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
    metadata: {
      business_id: user.business_id || '',
    },
  });

  return NextResponse.json({ url: session.url });
}
