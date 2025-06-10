// src/components/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalResults }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  
  const pageNumbers = [];
  const maxPagesToShow = 5; 
  
  if (totalPages <= maxPagesToShow + 2) { // Show all pages if not too many
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1); // Always show first page
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
        endPage = Math.min(totalPages -1, maxPagesToShow-1)
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - (maxPagesToShow-2))
    }

    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    pageNumbers.push(totalPages); // Always show last page
  }


  return (
    <div className="flex flex-col sm:flex-row items-center justify-between my-8 py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 sm:mb-0">
        Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
        {totalResults > 0 && (
            <span className="ml-2">(Total {totalResults} articles)</span>
        )}
      </div>
      <nav className="flex items-center space-x-1">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-dark/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="First page"
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-dark/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {pageNumbers.map((number, index) =>
          typeof number === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${currentPage === number 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-neutral-dark/70 text-neutral-dark dark:text-neutral-light'
                }`}
            >
              {number}
            </button>
          ) : (
            <span key={index} className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              {number}
            </span>
          )
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-dark/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-dark/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Last page"
        >
          <ChevronsRight size={20} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;