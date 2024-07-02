import React from 'react';
import { BeatLoader } from 'react-spinners';

interface ILoading {
  width?: string;
  height?: string;
}

function Loading({ width, height }: ILoading) {
  const containerClass =
    width && height ? `w-${width} h-${height}` : 'min-h-screen';

  return (
    <div className={`flex justify-center items-center ${containerClass}`}>
      <BeatLoader color="#FB1C49" />
    </div>
  );
}

export default Loading;
