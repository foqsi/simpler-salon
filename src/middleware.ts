import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const MAIN_DOMAIN = 'simplersalon.com';
// const DEV_DOMAIN = 'localhost:3000';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const host = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  /**
   * 🔒 Auth protection on /dashboard route (main domain)
   * Example: simplersalon.com/dashboard → auth check
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  //
  //
  //
  // DOMAIN HANDLING: Handle subdomain or custom domain rewrite
  const isLocalhost = host.includes('localhost');
  const isMainDomain = host.endsWith(MAIN_DOMAIN) || isLocalhost;

  const parts = host.split('.');
  const subdomain = parts.length > 2 ? parts[0] : null;

  const isDashboard = subdomain === 'dashboard' && isMainDomain;
  const isUsingSubdomain = !isLocalhost && subdomain && isMainDomain && subdomain !== 'www';

  /**
   * ✅ Dashboard subdomain rewrite
   * Example: dashboard.simplersalon.com/profile → /dashboard-app/profile
   */
  if (!isDashboard && url.pathname.startsWith('/dashboard')) {
    // Remove "/dashboard" from the path for the subdomain
    const newPath = url.pathname.replace(/^\/dashboard/, '') || '/';
    return NextResponse.redirect(new URL(`https://dashboard.${MAIN_DOMAIN}${newPath}`));
  }

  /**
   * 🌐 Subdomain rewrite
   * Example: james.simplersalon.com/about → /james/about
   */
  if (isUsingSubdomain) {
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  /**
   * 🌐 Custom domain rewrite
   * Example: johnsalon.com/about → /johnsalon.com/about
   */
  if (!isMainDomain && !isLocalhost) {
    const nakedDomain = host.replace(/^www\./, '');
    url.pathname = `/${nakedDomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Everything else continues normally
  return res;
}
