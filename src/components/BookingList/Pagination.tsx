import React from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import PaginationBtn from './PaginationBtn';

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
      <PaginationBtn
        pageNumber={1}
        currentPage={currentPage}
        onClick={onPageChange}
      />,
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
          className="flex justify-center items-center w-12 h-12 rounded-lg text-mineshaft"
        >
          <IoEllipsisHorizontal />
        </span>,
      );
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <PaginationBtn
          pageNumber={i}
          currentPage={currentPage}
          onClick={onPageChange}
        />,
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <span
          key="ellipsisRight"
          className="flex justify-center items-center w-12 h-12 rounded-lg text-mineshaft"
        >
          <IoEllipsisHorizontal />
        </span>,
      );
    }

    if (totalPages > 1) {
      pages.push(
        <PaginationBtn
          pageNumber={totalPages}
          currentPage={currentPage}
          onClick={onPageChange}
        />,
      );
    }

    return pages;
  };

  return (
    <div className="w-fit m-auto fixed bottom-0 left-0 right-0 flex justify-center items-center px-10 bg-white rounded-t-xl">
      <div className="relative my-8 flex justify-center gap-2 z-0">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className={`flex justify-center items-center w-12 h-12 rounded-lg font-bold ${currentPage === 1 ? 'text-alto' : 'text-mineshaft hover:bg-concrete  active:bg-alto active:scale-90'}`}
        >
          <MdOutlineKeyboardArrowLeft size={30} />
        </button>
        {renderPageNumbers()}
        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className={`flex justify-center items-center w-12 h-12 rounded-lg font-bold ${currentPage === totalPages ? 'text-alto' : 'text-mineshaft hover:bg-concrete active:bg-alto active:scale-90'}`}
        >
          <MdOutlineKeyboardArrowRight size={30} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
