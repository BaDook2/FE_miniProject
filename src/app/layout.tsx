'use client';

import MswComponent from '@/components/MSWComponent';
import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useIsLoggedIn } from '@/lib/store';
import fetchCheckLogin from '@/lib/fetchCheckLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AUTH_PATH, PROTECTED_PATH } from '@/lib/constants';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn, setLogIn } = useIsLoggedIn();
  const presentPath = usePathname();
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      queryClient
        .fetchQuery({
          queryKey: ['checkLogin'],
          queryFn: fetchCheckLogin,
        })
        .then((data) => {
          if (data) {
            setLogIn();
          }
        });
    }
  }, [queryClient, setLogIn]);

  useEffect(() => {
    if (isLoggedIn && AUTH_PATH.some((path) => presentPath.startsWith(path))) {
      router.push('/');
    } else if (
      !isLoggedIn &&
      PROTECTED_PATH.some((path) => presentPath.startsWith(path))
    ) {
      router.push('/login');
    }
  }, [isLoggedIn, presentPath, router]);

  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
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
              />
            </div>
          </MswComponent>
        </QueryClientProvider>
      </body>
    </html>
  );
}
