import { FC, useCallback } from 'react';
import { PageButton } from './PageButton';

interface PaginationProps {
  currentPageNumber: number;
  totalItemsNumber: number;
  itemsPerPage: number;
  onPageClick: (pageClicked: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPageNumber,
  totalItemsNumber,
  itemsPerPage,
  onPageClick
}) => {
  const createPages = useCallback(
    (total: number) => {
      const arr: (number | '...')[] = [];
      if (total === 0) {
        return arr;
      }
      arr.push(1);
      if (total === 1) {
        return arr;
      }
      if (currentPageNumber > 3) {
        arr.push('...');
      }
      if (currentPageNumber > 2) {
        arr.push(currentPageNumber - 1);
      }
      if (currentPageNumber > 1 && currentPageNumber < total) {
        arr.push(currentPageNumber);
      }
      if (currentPageNumber < total - 1) {
        arr.push(currentPageNumber + 1);
      }
      if (currentPageNumber < total - 2) {
        arr.push('...');
      }
      arr.push(total);

      return arr;
    },
    [currentPageNumber]
  );

  const handlePageClick = (pageClicked: number) => {
    currentPageNumber - 1 !== pageClicked && onPageClick(pageClicked);
  };

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        {createPages(Math.floor(totalItemsNumber / itemsPerPage)).map((page, index) => (
          <PageButton
            key={`${page}${index}`}
            pageNumber={page}
            currentPage={currentPageNumber}
            onPageClick={handlePageClick}
          />
        ))}
      </ul>
    </nav>
  );
};
