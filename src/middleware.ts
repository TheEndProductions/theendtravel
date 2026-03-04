import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isProtected = req.nextUrl.pathname.startsWith('/community/submit');
  if (isProtected && !req.auth) {
    const signInUrl = new URL('/auth/signin', req.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = { matcher: ['/community/submit/:path*'] };
