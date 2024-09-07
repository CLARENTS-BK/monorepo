import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';

jest.mock('../../assets/icons-sprite/indexIcon', () => ({
  'test-icon': <svg>Test Icon</svg>,
}));

describe('Icon component', () => {
  const baseProps = {
    iconId: 'test-icon',
  };

  test('should render without crashing', () => {
    render(<Icon {...baseProps} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('should render the correct icon based on iconId', () => {
    render(<Icon {...baseProps} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('should have the correct class based on size', () => {
    const { rerender } = render(
      <Icon
        {...baseProps}
        size="S"
      />
    );
    expect(screen.getByRole('img')).toHaveClass(/sizeS/);

    rerender(
      <Icon
        {...baseProps}
        size="L"
      />
    );
    expect(screen.getByRole('img')).toHaveClass(/sizeL/);
  });

  test('should apply additional className if provided', () => {
    render(
      <Icon
        {...baseProps}
        className="custom-class"
      />
    );
    expect(screen.getByRole('img')).toHaveClass('custom-class');
  });

  test('should default to size "M" if no size is provided', () => {
    render(<Icon {...baseProps} />);
    expect(screen.getByRole('img')).toHaveClass(/sizeM/);
  });

  test('should have an aria-label matching the iconId', () => {
    render(<Icon {...baseProps} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'test-icon');
  });
});
