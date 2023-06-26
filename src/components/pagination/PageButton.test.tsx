import { fireEvent, render, screen } from '@testing-library/react';
import { PageButton } from './PageButton';

describe('PageButton', () => {
  test('renders the page number', () => {
    const pageNumber = 2;
    const currentPage = 1;
    const onPageClick = jest.fn();

    render(
      <PageButton pageNumber={pageNumber} currentPage={currentPage} onPageClick={onPageClick} />
    );

    const button = screen.getByText(pageNumber);
    expect(button).toBeInTheDocument();
  });

  test('adds "is-current" class when the current page matches the page number', () => {
    const pageNumber = 2;
    const currentPage = 2;
    const onPageClick = jest.fn();

    render(
      <PageButton pageNumber={pageNumber} currentPage={currentPage} onPageClick={onPageClick} />
    );

    const button = screen.getByText(pageNumber);
    expect(button).toHaveClass('is-current');
  });

  test('does not add "is-current" class when the current page does not match the page number', () => {
    const pageNumber = 2;
    const currentPage = 1;
    const onPageClick = jest.fn();

    render(
      <PageButton pageNumber={pageNumber} currentPage={currentPage} onPageClick={onPageClick} />
    );

    const button = screen.getByText(pageNumber);
    expect(button).not.toHaveClass('is-current');
  });

  test('calls onPageClick callback when the button is clicked with a valid page number and different from the current page', () => {
    const pageNumber = 2;
    const currentPage = 1;
    const onPageClick = jest.fn();

    render(
      <PageButton pageNumber={pageNumber} currentPage={currentPage} onPageClick={onPageClick} />
    );

    const button = screen.getByText(pageNumber);
    fireEvent.click(button);

    expect(onPageClick).toHaveBeenCalledWith(1);
  });

  test('does not call onPageClick callback when the button is clicked with the same page number as the current page', () => {
    const pageNumber = 2;
    const currentPage = 2;
    const onPageClick = jest.fn();

    render(
      <PageButton pageNumber={pageNumber} currentPage={currentPage} onPageClick={onPageClick} />
    );

    const button = screen.getByText(pageNumber);
    fireEvent.click(button);

    expect(onPageClick).not.toHaveBeenCalled();
  });
});
