import React from 'react';
import Header from '../../components/Header/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-fit pb-10">
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
