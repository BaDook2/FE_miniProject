import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import type { AxiosError } from 'axios';
import BASE_URL from '@/lib/constants';

export async function middleware(req: NextRequest) {
  try {
    const response = await axios.get(`${BASE_URL}/api/check`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.get('cookie') || '',
      },
    });

    if (response.status === 200) {
      return NextResponse.next();
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 400) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/bookingList/:path*', '/booking/:path*', '/cart/:path*'], // 로그인 상태를 확인할 경로 설정
};
