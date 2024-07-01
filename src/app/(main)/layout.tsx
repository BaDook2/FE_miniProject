'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../../components/Header/Header';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <nav className="mx-auto border-b-[1px] rounded-lg h-20">
          <div className="mx-auto w-innerWidth h-full flex items-center">
            <Header />
          </div>
        </nav>
        {children}
      </QueryClientProvider>
    </div>
  );
}
