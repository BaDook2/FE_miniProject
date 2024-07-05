'use client';

import MswComponent from '@/components/MSWComponent';
import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useIsLoggedIn } from '@/lib/store';
import fetchCheckLogin from '@/lib/fetchCheckLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AUTH_PATH, PROTECTED_PATH } from '@/lib/constants';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn, setLogIn, setLogOut } = useIsLoggedIn();
  const presentPath = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCheck = async () => {
      const checkLogin = await fetchCheckLogin();
      if (checkLogin) {
        setLogIn();
      } else if (!checkLogin && isLoggedIn) {
        setLogOut();
      }
      setIsLoading(false);
    };
    fetchCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (
        isLoggedIn &&
        AUTH_PATH.some((path) => presentPath.startsWith(path))
      ) {
        router.push('/');
      } else if (
        !isLoggedIn &&
        PROTECTED_PATH.some((path) => presentPath.startsWith(path))
      ) {
        router.push('/login');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, presentPath]);

  return (
    <html lang="ko">
      <body>
        <MswComponent>
          <div>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              pauseOnHover
              style={{}}
            />
          </div>
        </MswComponent>
      </body>
    </html>
  );
}
