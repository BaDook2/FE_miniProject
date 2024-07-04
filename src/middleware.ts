import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 쿠키 이름을 정의합니다.
const ACCESS_TOKEN = 'accessToken';

// 미들웨어 함수
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(ACCESS_TOKEN);

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/bookingList/:path*', '/booking/:path*', '/cart/:path*'],
};
