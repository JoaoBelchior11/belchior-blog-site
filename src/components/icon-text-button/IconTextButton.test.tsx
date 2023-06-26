import { render, screen } from '@testing-library/react';
import { MessageIcon } from '../icons/MessageIcon';
import { IconTextButton } from './IconTextButton';

const mockProps = {
  text: 'Click me',
  icon: <MessageIcon />
};

describe('IconTextButton', () => {
  test('renders the button text', () => {
    render(<IconTextButton {...mockProps} />);
    const buttonTextElement = screen.getByText(mockProps.text);
    expect(buttonTextElement).toBeInTheDocument();
  });

  test('renders the icon element', () => {
    render(<IconTextButton {...mockProps} />);
    const iconElement = screen.getByTestId('icon-message');
    expect(iconElement).toBeInTheDocument();
  });
});
