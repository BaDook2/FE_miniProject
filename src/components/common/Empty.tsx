import Link from 'next/link';
import React from 'react';
import { FaExclamation } from 'react-icons/fa';

interface EmptyProps {
  message: string;
}
function Empty({ message }: EmptyProps) {
  return (
    <div className="w-innerWidth h-full m-auto flex flex-col items-center">
      <FaExclamation className="text-7xl mt-20 mb-10" />
      <p className="text-center text-3xl font-bold mb-10">{message}</p>
      <Link
        href="/"
        type="button"
        className="text-primary bg-white border border-primary px-4 py-2 rounded-md m-5 hover:bg-primary hover:text-white transition-all"
      >
        홈으로 가기
      </Link>
    </div>
  );
}

export default Empty;
