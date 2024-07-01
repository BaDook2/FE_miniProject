import React from 'react';

function ReserveButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="bg-primary text-white w-[130px] h-[45px] rounded-xl text-lg"
    >
      {text}
    </button>
  );
}

export default ReserveButton;
