import { useState, useEffect } from 'react';
import style from './Pagination.module.css';

const Pagination = ({ dogsPerPage, allDogs, paginated }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allDogs / dogsPerPage);
  const pageNumbers = [];

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    };
  }, [currentPage, totalPages]);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginated(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    paginated(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginated(currentPage - 1);
    };
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      paginated(currentPage + 1);
    };
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    paginated(totalPages);
  };

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(startPage + 4, totalPages);
  };

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - 4, 1);
  };

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  };

  return (
    <nav>
      <ul className={style.pagination}>
        <li>
          <button
            className={`${style.pageButton} ${currentPage === 1 ? style.disabled : ""}`}
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
        <li>
          <button
            className={`${style.pageButton} ${currentPage === 1 ? style.disabled : ""}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </li>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <button
                className={`${style.pageBtn} ${number === currentPage ? style.active : ""}`}
                onClick={() => handleClick(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
        <li>
          <button
            className={`${style.pageButton} ${currentPage === totalPages ? style.disabled : ""}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </li>
        <li>
          <button
            className={`${style.pageButton} ${currentPage === totalPages ? style.disabled : ""}`}
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
