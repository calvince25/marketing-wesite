import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-in-prod'
);

// Simple in-memory rate limiter for auth routes
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = (request as any).ip || request.headers.get('x-forwarded-for') || 'anonymous';

  // Apply rate limiting to auth routes
  if (pathname.startsWith('/api/admin/login') || pathname.startsWith('/api/admin/register')) {
    const key = `${ip}:${pathname}`;
    const now = Date.now();
    const rateData = rateLimitMap.get(key) || { count: 0, lastReset: now };

    if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
      rateData.count = 1;
      rateData.lastReset = now;
    } else {
      rateData.count++;
    }

    rateLimitMap.set(key, rateData);

    if (rateData.count > MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  // ... rate limiting logic already has pathname defined above

  // Protect /studio (Sanity Studio) - requires valid admin token
  if (pathname.startsWith('/studio')) {
    const token = request.cookies.get('admin_token')?.value;
    console.log('[Middleware] /studio accessed. Token present:', !!token);

    if (!token) {
      console.log('[Middleware] No token found, redirecting to login.');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, secret);
      console.log('[Middleware] Token verified successfully.');
      return NextResponse.next();
    } catch (error) {
      console.error('[Middleware] Token verification failed:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect /admin routes except login and register
  if (pathname.startsWith('/admin') &&
      !pathname.startsWith('/admin/login') &&
      !pathname.startsWith('/admin/register')) {

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/studio/:path*', '/api/admin/:path*'],
};
