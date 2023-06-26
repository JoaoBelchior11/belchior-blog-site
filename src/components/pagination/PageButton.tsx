import { FC } from 'react';
import styles from './Pagination.module.scss';

interface PageButtonProps {
  pageNumber: number | '...';
  currentPage: number;
  onPageClick: (page: number) => void;
}

export const PageButton: FC<PageButtonProps> = ({ pageNumber, currentPage, onPageClick }) => {
  const handlePageClick = () => {
    Number(pageNumber) && Number(pageNumber) !== currentPage && onPageClick(Number(pageNumber) - 1);
  };
  const isCurrent = typeof pageNumber === 'number' && pageNumber === currentPage;
  return (
    <li>
      <button
        className={`pagination-link ${isCurrent ? 'is-current' : ''} ${styles.pageButton}`}
        aria-label={`Go to page ${pageNumber}`}
        onClick={handlePageClick}>
        {pageNumber}
      </button>
    </li>
  );
};
