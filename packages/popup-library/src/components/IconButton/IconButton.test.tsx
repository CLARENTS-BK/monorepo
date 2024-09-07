import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import IconButton from './IconButton';
import Icon from '../Icon/Icon';

jest.mock('@/components/Icon/Icon', () => jest.fn(() => <div data-testid="icon"></div>));

test('renders correctly', () => {
  render(<IconButton />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('is disabled when disabled prop is true', () => {
  render(<IconButton disabled />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeDisabled();
});

test('has the correct size', () => {
  render(<IconButton size="M" />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveClass('root rootM');
});

test('renders the correct icon variant', () => {
  render(<IconButton iconVariant="success" />);
  expect(Icon).toHaveBeenCalledWith(
    expect.objectContaining({
      iconId: 'success',
      size: 'XL',
    }),
    expect.anything()
  );
});

test('applies additional className', () => {
  render(<IconButton className="extra-class" />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveClass('extra-class');
});
