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
    width?: number;
    height?: number;
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
  defaultPosition = { left: 0, top: 0 },
  zIndex,
  onClose,
  onDrag,
  onClick,
}) => {
  const [position, setPosition] = useState({ x: defaultPosition.left, y: defaultPosition.top });
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

        setPosition(newPosition);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

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
        className={styles.popup}
        style={{ width: defaultPosition.width, height: defaultPosition.height, zIndex }}
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