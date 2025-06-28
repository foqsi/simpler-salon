import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseAdmin';

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const [appointmentsToday, appointmentsMonth, giftCards] = await Promise.all([
    supabase.from('appointments').select('*', { count: 'exact', head: true }).gte('date', today),
    supabase.from('appointments').select('*', { count: 'exact', head: true }).gte('date', today.slice(0, 7)),
    supabase.from('gift_cards').select('*', { count: 'exact', head: true }),
  ]);

  return NextResponse.json([
    {
      id: 'appointments-today',
      title: 'Appointments Today',
      value: appointmentsToday.count || 0,
      description: 'Booked for today',
      link: '/dashboard/appointments',
    },
    {
      id: 'appointments-month',
      title: 'Appointments This Month',
      value: appointmentsMonth.count || 0,
      description: 'Booked this month',
      link: '/dashboard/appointments',
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards Sold',
      value: giftCards.count || 0,
      description: 'Total issued',
      link: '/dashboard/egift-cards',
    },
  ]);
}
