import { FC, ReactNode, useState, useRef, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import IconButton from '../IconButton/IconButton';
import styles from './Popup.module.scss';

interface PopupProps {
  id: number;
  title: string;
  content: ReactNode;
  defaultPosition?: {
    left: number;
    top: number;
    width?: number | string;
    height?: number | string;
  };
  zIndex: number;
  onClose?: (id: number) => void;
  onDrag?: (id: number, left: number, top: number) => void;
  onClick?: (id: number) => void;
}

const Popup: FC<PopupProps> = ({
  id,
  title,
  content,
  defaultPosition = { left: 0, top: 0, width: 'max-content', height: 'max-content' },
  zIndex,
  onClose,
  onDrag,
  onClick,
}) => {
  const [position, setPosition] = useState({ x: defaultPosition.left, y: defaultPosition.top });
  const [size, setSize] = useState({ width: defaultPosition.width || 'max-content', height: defaultPosition.height || 'max-content' });
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (popupRef.current) {
        const containerWidth = document.getElementById('container')?.offsetWidth || window.innerWidth;
        const containerHeight = document.getElementById('container')?.offsetHeight || window.innerHeight;
  
        const popupRect = popupRef.current.getBoundingClientRect();
        const newPosition = { ...position };
  
        if (popupRect.right > containerWidth) {
          newPosition.x = containerWidth - popupRect.width;
        }
        if (popupRect.bottom > containerHeight) {
          newPosition.y = containerHeight - popupRect.height;
        }
        if (popupRect.left < 0) {
          newPosition.x = 0;
        }
        if (popupRect.top < 0) {
          newPosition.y = 0;
        }
  
        if (containerWidth > defaultPosition.left + (typeof defaultPosition.width === 'number' ? defaultPosition.width : 0)) {
          newPosition.x = defaultPosition.left;
        }
        if (containerHeight > defaultPosition.top + (typeof defaultPosition.height === 'number' ? defaultPosition.height : 0)) {
          newPosition.y = defaultPosition.top;
        }
  
        const newSize = {
          width: typeof size.width === 'number' ? Math.min(size.width, containerWidth - newPosition.x) : size.width,
          height: typeof size.height === 'number' ? Math.min(size.height, containerHeight - newPosition.y) : size.height,
        };
  
        if (containerWidth > (typeof defaultPosition.width === 'number' ? defaultPosition.width : 0)) {
          newSize.width = defaultPosition.width || 'max-content';
        }
        if (containerHeight > (typeof defaultPosition.height === 'number' ? defaultPosition.height : 0)) {
          newSize.height = defaultPosition.height || 'max-content';
        }
  
        setPosition(newPosition);
        setSize(newSize);
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, size, defaultPosition]);

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
    onDrag?.(id, data.x, data.y);
  };

  const handleIconButtonEvents = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClose?.(id);
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDrag}
      handle={`.${styles.header}`}
    >
      <div
        ref={popupRef}
        className={styles.container}
        style={{ width: size.width, height: size.height, zIndex }}
        onClick={() => onClick?.(id)}
        onTouchEnd={() => onClick?.(id)}
        data-id={id}
      >
        <div
          className={styles.header}
          onClick={() => onClick?.(id)}
          onTouchEnd={() => onClick?.(id)}
        >
          <span className={styles.title}>{title}</span>
          <div className={styles.headerButtons}>
            <IconButton
              className={styles.headerButton}
              onClick={handleIconButtonEvents}
              onMouseDown={handleIconButtonEvents}
              onTouchStart={handleIconButtonEvents}
              onTouchEnd={handleIconButtonEvents}
              iconVariant="closeUnframed"
              size="M"
              data-testid="close-button"
            />
          </div>
        </div>
        <div
          className={styles.content}
          onClick={() => onClick?.(id)}
          onTouchEnd={() => onClick?.(id)}
        >
          {content}
        </div>
      </div>
    </Draggable>
  );
};

export { PopupProps };
export default Popup;
