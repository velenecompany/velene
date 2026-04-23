import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/account', '/checkout'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some(p => pathname.startsWith(p));

  if (isProtected) {
    const token = request.cookies.get('velene_session')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'] };
