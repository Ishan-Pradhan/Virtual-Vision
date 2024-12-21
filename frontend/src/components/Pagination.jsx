import { useEffect } from "react";
import { scrollToTop } from "../utils/scrollTop";

/* eslint-disable  */
function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end gap-4 items-center mt-20 text-secondary">
      <button
        className="text-secondary flex items-center gap-2  "
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <i
          className={`fa-solid fa-chevron-left text-secondary text-md ${
            currentPage === 1 ? "text-secondaryTint cursor-not-allowed" : ""
          }`}
        ></i>
        <span
          className={`text-secondary ${
            currentPage === 1 ? "text-secondaryTint cursor-not-allowed" : ""
          }`}
        >
          Prev
        </span>{" "}
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        className="text-secondary flex items-center gap-2  "
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <span
          className={`text-secondary ${
            currentPage === totalPages
              ? "text-secondaryTint cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </span>{" "}
        <i
          className={`fa-solid fa-chevron-right text-secondary text-md ${
            currentPage === totalPages
              ? "text-secondaryTint cursor-not-allowed"
              : ""
          }`}
        ></i>
      </button>
    </div>
  );
}

export default Pagination;
