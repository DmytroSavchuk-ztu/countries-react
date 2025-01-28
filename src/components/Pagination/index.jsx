import React, { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [numberOfPagesOnEachSide, setNumberOfPagesOnEachSide] = useState(2);

  const updatePagesOnResize = () => {
    setNumberOfPagesOnEachSide(window.innerWidth <= 640 ? 1 : 2);
  };

  useEffect(() => {
    updatePagesOnResize();
    window.addEventListener("resize", updatePagesOnResize);
    return () => {
      window.removeEventListener("resize", updatePagesOnResize);
    };
  }, []);

  const renderPageNumbers = () => {
    const pageList = [];
    let showDotsStart = false;
    let showDotsEnd = false;

    for (let i = 1; i <= totalPages; i++) {
      const isCurrentPage = i === currentPage;
      const isNearCurrentPage =
          i >= currentPage - numberOfPagesOnEachSide &&
          i <= currentPage + numberOfPagesOnEachSide;
      const isEdgePage = i === 1 || i === totalPages;

      if (isCurrentPage || isNearCurrentPage || isEdgePage) {
        pageList.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={isCurrentPage ? "button_clicked" : ""}
            >
              {i}
            </button>
        );
        showDotsStart = false;
        showDotsEnd = false;
      }
      else if (!showDotsStart && i < currentPage) {
        pageList.push(<span key={`dots-start`}>. . .</span>);
        showDotsStart = true;
      }
      else if (!showDotsEnd && i > currentPage) {
        pageList.push(<span key={`dots-end`}>. . .</span>);
        showDotsEnd = true;
      }
    }

    return pageList;
  };
  const handleArrowClick = (direction) => {
    const newPage = direction === "left" ? currentPage - 1 : currentPage + 1;
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  return (
      <div className="pagination">
        <div
            onClick={() => handleArrowClick("left")}
            className={`arrow arrow_left ${
                currentPage === 1 ? "arrow_disabled" : ""
            }`}
        ></div>

        <div className="pages">{renderPageNumbers()}</div>

        <div
            onClick={() => handleArrowClick("right")}
            className={`arrow arrow_right ${
                currentPage === totalPages ? "arrow_disabled" : ""
            }`}
        ></div>
      </div>
  );
};

export default Pagination;
