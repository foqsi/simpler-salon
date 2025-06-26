import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import supabaseAdmin from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  const { priceId, newTier } = await req.json();

  // Replace with your preferred method of user identification
  const token = req.cookies.get('sb-access-token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Get user from Supabase using access token
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  // Fetch user's business_id (optional if you want to store it)
  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('email, business_id')
    .eq('id', user.id)
    .single();

  if (!userData?.email) {
    return NextResponse.json({ error: 'User email not found' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: userData.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&upgrade=${newTier}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/upgrade`,
    metadata: {
      user_id: user.id,
      business_id: userData.business_id || '',
      newTier,
      upgrade: 'true',
    },
  });

  return NextResponse.json({ url: session.url });
}
