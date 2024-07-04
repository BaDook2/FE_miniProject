'use client';

import MswComponent from '@/components/MSWComponent';
import './globals.css';
import fetchCheckCookie from '@/lib/fetchCheckCookie';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const authPath = useMemo(() => ['/login', '/signup'], []);
  const protectedPath = useMemo(
    () => ['/booking', '/bookingList', '/bookingResult', '/cart'],
    [],
  );
  useEffect(() => {
    const fetchCheck = async () => {
      const checkLogin = await fetchCheckCookie();
      if (checkLogin) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    fetchCheck();
    const isProtectedPath = protectedPath.some((path) =>
      pathName.startsWith(path),
    );
    const isAuthPath = authPath.some((path) => pathName.startsWith(path));
    if (isLoggedIn) {
      if (isAuthPath) {
        router.push('/');
      }
    } else if (isProtectedPath) {
      router.push('/login');
    }
    console.log('isLoggedIn: ', isLoggedIn);
  }, [authPath, isLoggedIn, pathName, protectedPath, router]);

  return (
    <html lang="ko">
      <body>
        <MswComponent>{children}</MswComponent>
      </body>
    </html>
  );
}
