export function calculatePagination(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const goToFirstPage = () => 1;
    const goToLastPage = () => totalPages;
    const goToPreviousPage = () => Math.max(currentPage - 1, 1);
    const goToNextPage = () => Math.min(currentPage + 1, totalPages);
  
    const getPageNumbers = () => {
      const visiblePages = [];
      const maxVisiblePages = 5;
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        if (currentPage <= halfVisiblePages) {
          for (let i = 1; i <= maxVisiblePages; i++) {
            visiblePages.push(i);
          }
        } else if (currentPage >= totalPages - halfVisiblePages) {
          for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
            visiblePages.push(i);
          }
        } else {
          for (let i = currentPage - halfVisiblePages; i <= currentPage + halfVisiblePages; i++) {
            visiblePages.push(i);
          }
        }
      }
  
      return visiblePages;
    };
  
    return {
      totalPages,
      goToFirstPage,
      goToLastPage,
      goToPreviousPage,
      goToNextPage,
      getPageNumbers,
    };
  }