import React from 'react';
import "./Pagination.css";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const pageList = [];

    let hasStartedDots = false;
    let hasEndedDots = false;

    for (let i = 0; i < pageNumbers.length; i++) {
      if (i === 0 || i === pageNumbers.length - 1 ||  (i >= currentPage - 1 && i <= currentPage + 1)) {
        // If the page is the first, the last or within the range, display the page number
        pageList.push(
          <button
            key={i}
            onClick={() => onPageChange(pageNumbers[i])}
            className={currentPage === i ? "button_clicked" : ""}
          >
            {pageNumbers[i]}
          </button>
        );

        // Reset dots flags
        hasStartedDots = false;
        hasEndedDots = false;
      } else if (!hasStartedDots && i < currentPage - 1) {
        // If we haven't started the dots yet and we're before the current page range, add the starting dots
        pageList.push(<span key={i}>...</span>);
        hasStartedDots = true;
      } else if (!hasEndedDots && i > currentPage + 1 && i < totalPages - 1) {
        // If we haven't ended the dots yet and we're after the current page range but not at the end, add the ending dots
        pageList.push(<span key={i}>...</span>);
        hasEndedDots = true;
      }
    }

    return pageList;
  };

  return <div className="pagination">{renderPageNumbers()}</div>;
};

export default Pagination;
// import React from "react";
// import "./Pagination.css";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = [];

  
//   const siblingCount = 1

//   const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
//   const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

//   const shouldShowLeftDots = leftSiblingIndex > 2;
//   const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const renderPageNumbers = () => {
//     const pageList = [];

//     for (let i = 0; i < pageNumbers.length; i++) {
//       if (
//         i === 0 ||
//         i === pageNumbers.length - 1 ||
//         (i >= currentPage - 2 && i <= currentPage + 2)
//       ) {
//         pageList.push(
//           <button
//             key={i}
//             onClick={() => onPageChange(pageNumbers[i])}
//             className={currentPage === i ? "button_clicked" : ""}
//           >
//             {pageNumbers[i]}
//           </button>
//         );
//       }
//       if (!shouldShowLeftDots && shouldShowRightDots) {
//       let leftItemCount = 3 + 2 * siblingCount;
//       let leftRange = range(1, leftItemCount);

//       pageList.push(<span key={i}>...</span>);
//     }

//     if (shouldShowLeftDots && !shouldShowRightDots) {
//       let rightItemCount = 3 + 2 * siblingCount;
//       let rightRange = range(totalPages - rightItemCount + 1, totalPages);
//       pageList.push(<span key={i}>...</span>);
//     }

//     if (shouldShowLeftDots && shouldShowRightDots) {
//       let middleRange = range(leftSiblingIndex, rightSiblingIndex);
//       pageList.push(<span key={i}>...</span>);
//     }
//       //  else if (pageList[pageList.length - 1] !== "...") {
//       //   pageList.push(<span key={i}>...</span>);
//       }
//     return pageList;
//   };

//   return <div className="pagination">{renderPageNumbers()}</div>;
// };

// export default Pagination;

// import React from "react";
// import "./Pagination.css";

// function Pagination({ numberOfpages, activePage, paginate, start, end }) {
//   const range = (start, end) => {
//     let length = end - start + 1;
//     return Array.from({ length }, (_, idx) => idx + start);
//   };

//   const pagesNum = range(start, end);

//   if(start <= 5 ){
//     return (
//       <>
//         <div className="pagination">
//           <div
//             onClick={() => paginate(activePage - 1)}
//             className="arrow left-arrow"
//           >
//             left
//           </div>
//           {pagesNum.map((item) => (
//             <button
//               className={item === activePage ? "button_clicked" : ""}
//               key={item}
//               onClick={() => paginate(item)}
//             >
//               {item}
//             </button>
//           ))}
//           <div>///</div>
//           <button onClick={() => paginate(numberOfpages)}>
//             {numberOfpages}
//           </button>
//           <div
//             onClick={() => paginate(activePage + 1)}
//             className="arrow right-arrow"
//           >
//             right
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="pagination">
//         <div
//           onClick={() => paginate(activePage - 1)}
//           className="arrow left-arrow"
//         >
//           left
//         </div>
//         {pagesNum.map((item) => (
//           <button
//             className={item === activePage ? "button_clicked" : ""}
//             key={item}
//             onClick={() => paginate(item)}
//           >
//             {item}
//           </button>
//         ))}
//         <div>///</div>
//         <button onClick={() => paginate(numberOfpages)}>
//           {numberOfpages}
//         </button>
//         <div
//           onClick={() => paginate(activePage + 1)}
//           className="arrow right-arrow"
//         >
//           right
//         </div>
//       </div>
//     </>
//   );
// }

// export default Pagination;
