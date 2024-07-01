import Header from '@/components/Header/Header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-fit pb-10 bg-concrete">
      <nav className="mx-auto border-b-[1px] rounded-lg h-20">
        <div className="mx-auto w-innerWidth h-full flex items-center">
          <Header />
        </div>
      </nav>
      {children}
    </div>
  );
}

export default layout;
