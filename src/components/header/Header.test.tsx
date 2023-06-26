import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  const title = 'Belchior Blog';
  test('renders header with the provided title', () => {
    render(<Header title={title} />);

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toHaveTextContent(title);
  });

  test('renders header with the correct CSS class', () => {
    render(<Header title={title} />);

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toHaveClass('title', 'is-1');
  });
});
