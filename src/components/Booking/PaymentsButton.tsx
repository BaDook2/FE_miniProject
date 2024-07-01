import React from 'react';

type ButtonProps = {
  onClick: () => void;
  content: React.ReactNode;
  isSelected: boolean;
};
function PaymentsButton({ onClick, content, isSelected }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-20 flex justify-center items-center p-2 m-2 text-xl border ${isSelected ? 'border-scienceblue bg-Selago border-2' : 'border-alto  hover:bg-concrete '} rounded-xl transition`}
    >
      {content}
    </button>
  );
}

export default PaymentsButton;
