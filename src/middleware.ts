import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('🔥 Middleware: path =', req.nextUrl.pathname);
  console.log('🔥 Middleware: user =', user);

  if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('🔒 Redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
