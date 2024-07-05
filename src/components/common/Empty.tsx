import React from 'react';
import { FaExclamation } from 'react-icons/fa';
import Button from './Button';

interface EmptyProps {
  message: string;
}
function Empty({ message }: EmptyProps) {
  return (
    <div className="w-innerWidth h-full m-auto flex flex-col items-center">
      <FaExclamation className="text-7xl mt-20 mb-10" />
      <p className="text-center text-3xl font-bold mb-10">{message}</p>
      <Button href="/" label="홈으로 가기" />
    </div>
  );
}

export default Empty;
