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
        className="w-1/4 h-16 text-2xl text-bold text-concrete flex justify-center items-center rounded-xl mb-4 bg-primary"
      >
        홈으로 가기
      </Link>
    </div>
  );
}

export default Empty;
