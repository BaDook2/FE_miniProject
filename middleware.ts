import { NextRequest, NextResponse } from 'next/server';
import BASE_URL from '@/lib/constants';
import axios from 'axios';
import { fetchGet } from '@/lib/fetchURL';

axios.defaults.withCredentials = true;
export async function middleware(req: NextRequest) {
  const loginCheckURL = `${BASE_URL}/api/check`;
  const { status } = await fetchGet(loginCheckURL);
  if (status === 200) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: ['/bookingList/:path*', '/booking/:path*', '/cart/:path*'], // 로그인 상태를 확인할 경로 설정
};
