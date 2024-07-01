import React from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        type="button"
        key={1}
        onClick={() => onPageChange(1)}
        className={`flex justify-center items-center w-12 h-12 rounded-lg text-white ${currentPage === 1 ? 'bg-primary' : 'bg-alto hover:bg-dovegray'}  `}
      >
        1
      </button>,
    );

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 4) {
      startPage = 2;
      endPage = Math.min(5, totalPages - 1);
    } else if (currentPage >= totalPages - 3) {
      startPage = Math.max(2, totalPages - 4);
      endPage = totalPages - 1;
    }

    if (startPage > 2) {
      pages.push(
        <span
          key="ellipsisLeft"
          className="flex justify-center items-center w-12 h-12 rounded-lg text-white bg-alto"
        >
          ...
        </span>,
      );
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <button
          type="button"
          key={i}
          onClick={() => onPageChange(i)}
          style={i === currentPage ? { fontWeight: 'bold' } : undefined}
          className={`flex justify-center items-center w-12 h-12 rounded-lg text-white ${i === currentPage ? 'bg-primary' : 'bg-alto hover:bg-dovegray'}  `}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <span
          key="ellipsisRight"
          className="flex justify-center items-center w-12 h-12 rounded-lg text-white bg-alto"
        >
          ...
        </span>,
      );
    }

    if (totalPages > 1) {
      pages.push(
        <button
          type="button"
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`flex justify-center items-center w-12 h-12 rounded-lg text-white ${currentPage === totalPages ? 'bg-primary' : 'bg-alto hover:bg-dovegray'}`}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="my-8 flex justify-center gap-2 ">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={`flex justify-center items-center w-12 h-12 rounded-lg ${currentPage === 1 ? 'text-alto bg-concrete' : 'text-white hover:bg-dovegray  bg-alto'}`}
      >
        <HiOutlineArrowLeft />
      </button>
      {renderPageNumbers()}
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={`flex justify-center items-center w-12 h-12 rounded-lg ${currentPage === totalPages ? 'text-alto bg-concrete' : 'text-white hover:bg-dovegray  bg-alto'}`}
      >
        <HiOutlineArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
