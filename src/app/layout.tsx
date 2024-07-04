'use client';

import MswComponent from '@/components/MSWComponent';
import './globals.css';
import fetchCheckCookie from '@/lib/fetchCheckCookie';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useIsLoggedIn } from '@/lib/store';
import { AUTH_PATH, PROTECTED_PATH } from '@/lib/constants';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn, setLogIn, setLogOut } = useIsLoggedIn();
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    const fetchCheck = async () => {
      const checkLogin = await fetchCheckCookie();
      if (checkLogin) {
        setLogIn();
      } else {
        setLogOut();
      }
    };
    fetchCheck();
    const isProtectedPath = PROTECTED_PATH.some((path) =>
      pathName.startsWith(path),
    );
    const isAuthPath = AUTH_PATH.some((path) => pathName.startsWith(path));
    if (isLoggedIn) {
      if (isAuthPath) {
        router.push('/');
      }
    } else if (isProtectedPath) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, pathName]);

  return (
    <html lang="ko">
      <body>
        <MswComponent>{children}</MswComponent>
      </body>
    </html>
  );
}
