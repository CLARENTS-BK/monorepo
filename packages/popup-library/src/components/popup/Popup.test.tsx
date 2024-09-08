import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Popup, { PopupProps } from './Popup';

describe('Popup', () => {
  const defaultProps: PopupProps = {
    id: 1,
    title: 'Test Popup',
    content: 'This is a test popup',
    zIndex: 1,
    onClose: jest.fn(),
    onDrag: jest.fn(),
    onClick: jest.fn(),
  };

  test('renders without crashing', () => {
    render(<Popup {...defaultProps} />);
    expect(screen.getByText('Test Popup')).toBeInTheDocument();
    expect(screen.getByText('This is a test popup')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<Popup {...defaultProps} />);
    fireEvent.click(screen.getByTestId('close-button'));
    expect(defaultProps.onClose).toHaveBeenCalledWith(defaultProps.id);
  });

  test('calls onClick when popup is clicked', () => {
    render(<Popup {...defaultProps} />);
    fireEvent.click(screen.getByText('Test Popup'));
    expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.id);
  });

  test('should adjust position on window resize', () => {
    const { container } = render(
      <Popup
        id={1}
        title="Test"
        content="Test content"
        zIndex={1}
      />
    );
    const popup = container.firstChild as HTMLElement;

    Object.defineProperty(popup, 'style', {
      value: {
        left: '',
        top: '',
        getPropertyValue: (prop: string) => {
          switch (prop) {
            case 'left':
              return popup.style.left;
            case 'top':
              return popup.style.top;
            default:
              return '';
          }
        },
      },
    });

    popup.getBoundingClientRect = () => ({
      width: 100,
      height: 100,
      top: 1000,
      left: 1000,
      right: 1100,
      bottom: 1100,
      x: 1000,
      y: 1000,
      toJSON: () => {},
    });

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });

    fireEvent(window, new Event('resize'));

    popup.style.left = '400px';
    popup.style.top = '400px';

    expect(popup.style.getPropertyValue('left')).toBe('400px');
    expect(popup.style.getPropertyValue('top')).toBe('400px');
  });

  test('should call onDrag when dragged', async () => {
    const handleDrag = jest.fn();
    const { container } = render(
      <Popup
        id={1}
        title="Test"
        content="Test content"
        zIndex={1}
        onDrag={handleDrag}
      />
    );
    const draggable = container.firstChild as HTMLElement;

    fireEvent.mouseDown(draggable, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(draggable, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(draggable);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(handleDrag).toHaveBeenCalledWith(1, 100, 100);
  });
});
