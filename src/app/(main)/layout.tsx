'use client';

import Header from '../../components/Header/Header';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="mx-auto border-b-[1px] rounded-lg h-20">
        <div className="mx-auto w-innerWidth h-full flex items-center">
          <Header />
        </div>
      </nav>
      {children}
    </div>
  );
}
