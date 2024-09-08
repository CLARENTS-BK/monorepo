import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Button from './Button';

test('renders correctly', () => {
  render(
    <Button
      label="Test Button"
      variant="primary"
      size="M"
    />
  );
  const buttonElement = screen.getByTestId('button');
  expect(buttonElement).toBeInTheDocument();
});

test('is disabled when disabled prop is true', () => {
  render(
    <Button
      label="Test Button"
      disabled
      variant="primary"
    />
  );
  const buttonElement = screen.getByTestId('button');
  expect(buttonElement).toBeDisabled();
});

test('displays correct label', () => {
  render(
    <Button
      label="Test Button"
      variant="primary"
    />
  );
  const buttonElement = screen.getByTestId('button');
  expect(buttonElement).toHaveTextContent('Test Button');
});

test('displays start and end icons', () => {
  const StartIcon = () => <span>StartIcon</span>;
  const EndIcon = () => <span>EndIcon</span>;

  render(
    <Button
      label="Test Button"
      variant="primary"
      startIcon={<StartIcon />}
      endIcon={<EndIcon />}
    />
  );
  const startIconElement = screen.getByText('StartIcon');
  const endIconElement = screen.getByText('EndIcon');

  expect(startIconElement).toBeInTheDocument();
  expect(endIconElement).toBeInTheDocument();
});
