import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  test('renders no page buttons when there are 0 pages', () => {
    const currentPageNumber = 0;
    const totalItemsNumber = 0;
    const itemsPerPage = 10;
    const onPageClick = jest.fn();

    render(
      <Pagination
        currentPageNumber={currentPageNumber}
        totalItemsNumber={totalItemsNumber}
        itemsPerPage={itemsPerPage}
        onPageClick={onPageClick}
      />
    );

    const pageButtons = screen.queryByRole('button');
    expect(pageButtons).toBeNull();
  });
  test('renders the correct number of page buttons', () => {
    const currentPageNumber = 2;
    const totalItemsNumber = 10;
    const itemsPerPage = 2;
    const onPageClick = jest.fn();

    render(
      <Pagination
        currentPageNumber={currentPageNumber}
        totalItemsNumber={totalItemsNumber}
        itemsPerPage={itemsPerPage}
        onPageClick={onPageClick}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(5);
  });

  test('calls onPageClick callback when a page button is clicked', () => {
    const currentPageNumber = 2;
    const totalItemsNumber = 10;
    const itemsPerPage = 2;
    const onPageClick = jest.fn();

    render(
      <Pagination
        currentPageNumber={currentPageNumber}
        totalItemsNumber={totalItemsNumber}
        itemsPerPage={itemsPerPage}
        onPageClick={onPageClick}
      />
    );

    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);

    expect(onPageClick).toHaveBeenCalledWith(2);
  });

  test('does not call onPageClick callback when the current page button is clicked', () => {
    const currentPageNumber = 2;
    const totalItemsNumber = 10;
    const itemsPerPage = 2;
    const onPageClick = jest.fn();

    render(
      <Pagination
        currentPageNumber={currentPageNumber}
        totalItemsNumber={totalItemsNumber}
        itemsPerPage={itemsPerPage}
        onPageClick={onPageClick}
      />
    );

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(onPageClick).not.toHaveBeenCalled();
  });

  test('does not call onPageClick callback when an ellipsis button is clicked', () => {
    const currentPageNumber = 2;
    const totalItemsNumber = 10;
    const itemsPerPage = 2;
    const onPageClick = jest.fn();

    render(
      <Pagination
        currentPageNumber={currentPageNumber}
        totalItemsNumber={totalItemsNumber}
        itemsPerPage={itemsPerPage}
        onPageClick={onPageClick}
      />
    );

    const ellipsisButton = screen.getByText('...');
    fireEvent.click(ellipsisButton);

    expect(onPageClick).not.toHaveBeenCalled();
  });
});
