'use client';

import MswComponent from '@/components/MSWComponent';
import './globals.css';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useIsLoggedIn } from '@/lib/store';
import fetchCheckLogin from '@/lib/fetchCheckLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn, setLogIn, setLogOut } = useIsLoggedIn();
  const pathName = usePathname();
  useEffect(() => {
    const checkLogin = async () => {
      const checkLogin = await fetchCheckLogin();
      if (checkLogin) {
        setLogIn();
      } else {
        setLogOut();
      }
    };
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, pathName]);

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
