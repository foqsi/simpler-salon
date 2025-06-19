import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  // Debug log – you should see this in the terminal on every request
  console.log('🛡 Middleware for:', req.nextUrl.pathname);

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Ensures the middleware picks up / refreshes the session
  await supabase.auth.getSession();

  // Protect /dashboard/**
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  /** Apply only to dashboard (and its children) */
  matcher: ['/dashboard/:path*'],
};
