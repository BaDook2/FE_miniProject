import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 쿠키 이름을 정의합니다.
const COOKIE_NAME = 'yourCookieName';

// 미들웨어 함수
export function middleware(request: NextRequest) {
  console.log('Middleware is running');

  // 쿠키를 가져옵니다.
  const cookie = request.cookies.get(COOKIE_NAME);

  // 쿠키가 없는 경우 /login으로 리디렉션합니다.
  if (!cookie) {
    console.log('No cookie found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 쿠키가 있는 경우 요청을 그대로 진행합니다.
  return NextResponse.next();
}

// 미들웨어가 적용될 경로를 지정합니다.
export const config = {
  matcher: ['/bookingList/:path*', '/booking/:path*', '/cart/:path*'],
};
