import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Temporarily disabled middleware to test routing
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/health).*)',
  ],
};


