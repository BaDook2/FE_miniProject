'use client';

import MswComponent from '@/components/MSWComponent';
import './globals.css';
import { useIsLoggedIn } from '@/lib/store';
import fetchCheckLogin from '@/lib/fetchCheckLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn, setLogIn, setLogOut } = useIsLoggedIn();
  const checkLogin = await fetchCheckLogin();
  if (checkLogin) {
    setLogIn();
  } else if (!checkLogin && isLoggedIn) {
    setLogOut();
  }

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
