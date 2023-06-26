import { render, screen } from '@testing-library/react';
import { CommentsHeader } from './CommentsHeader';

describe('CommentsHeader', () => {
  test('renders the header text', () => {
    render(<CommentsHeader />);
    const headerElement = screen.getByText('Comments');
    expect(headerElement).toBeInTheDocument();
  });

  test('applies the correct CSS class', () => {
    render(<CommentsHeader />);
    const headerElement = screen.getByRole('heading', { level: 5 });
    expect(headerElement).toHaveClass('is-size-5');
  });
});
