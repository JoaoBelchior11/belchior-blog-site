import { fireEvent, render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast component', () => {
  test('renders the toast message', () => {
    const level = 'success';
    const message = 'This is a success message';
    render(<Toast level={level} message={message} />);

    const toastElement = screen.getByText(message);
    expect(toastElement).toBeInTheDocument();
  });

  test('closes the toast when the close button is clicked', () => {
    const level = 'danger';
    const message = 'This is an error message';
    render(<Toast level={level} message={message} />);

    const toastElement = screen.getByText(message);
    expect(toastElement).toBeVisible();

    const closeButton = screen.getByLabelText('delete');
    fireEvent.click(closeButton);

    expect(toastElement).not.toBeVisible();
  });
});
