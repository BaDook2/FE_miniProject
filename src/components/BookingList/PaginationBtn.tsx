import React from 'react';

interface PaginationBtnProps {
  pageNumber: number;
  currentPage: number;
  onClick: (pageNumber: number) => void;
}
function PaginationBtn({
  pageNumber,
  currentPage,
  onClick,
}: PaginationBtnProps) {
  return (
    <button
      type="button"
      key={pageNumber}
      onClick={() => onClick(pageNumber)}
      className={`flex justify-center items-center w-12 h-12 rounded-lg font-bold text-mineshaft ${currentPage === pageNumber ? ' border-2 border-primary text-primary' : 'hover:bg-concrete active:bg-alto active:scale-90'} transition `}
    >
      {pageNumber}
    </button>
  );
}

export default PaginationBtn;
