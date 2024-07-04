import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 쿠키 이름을 정의합니다.
const ACCESS_TOKEN = 'accessToken';

// 미들웨어 함수
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(ACCESS_TOKEN);

  const protectedPaths = ['/bookingList', '/booking', '/cart'];

  const authPaths = ['/login', '/signup', '/accommodation'];

  const isProtectedPath = protectedPaths.some((path) =>
    new URL(request.url).pathname.startsWith(path),
  );
  const isAuthPath = authPaths.some((path) =>
    new URL(request.url).pathname.startsWith(path),
  );
  if (isProtectedPath) {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (isAuthPath) {
    if (cookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/bookingList/:path*',
    '/booking/:path*',
    '/cart/:path*',
    '/accommodation/:path*',
    '/login',
    '/signup',
  ],
};
