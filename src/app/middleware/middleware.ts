import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '../lib/auth';

export const config = {
  matcher: ['/gallery/:path*', '/api/likes/:path*']
};

export function middleware(request: NextRequest) {
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/');
  const token = isApiRequest 
    ? request.headers.get('authorization')?.split(' ')[1]
    : request.cookies.get('token')?.value;

  if (!token) {
    if (isApiRequest) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const payload = verifyToken(token);
  if (!payload) {
    if (isApiRequest) {
      return NextResponse.json({ message: 'Token invalide' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}