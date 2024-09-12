import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { create } from 'zustand';
import Popup, { PopupProps } from '../popup/Popup';
import styles from './PopupsProvider.module.scss';

interface PopupStore {
  popups: PopupProps[];
  addPopup: (popup: Omit<PopupProps, 'id'>) => void;
  closePopup: (id: number) => void;
  closeAll: () => void;
  movePopup: (id: number, left: number, top: number) => void;
  bringToFront: (id: number) => void;
}

const usePopupStore = create<PopupStore>((set) => ({
  popups: [],
  addPopup: (popup) =>
    set((state) => ({
      popups: [...state.popups, { ...popup, id: Date.now() }],
    })),
  closePopup: (id) =>
    set((state) => ({
      popups: state.popups.filter((popup) => popup.id !== id),
    })),
  closeAll: () => set(() => ({ popups: [] })),
  movePopup: (id, left, top) =>
    set((state) => ({
      popups: state.popups.map((popup) =>
        popup.id === id
          ? { ...popup, defaultPosition: { ...popup.defaultPosition, left, top } }
          : popup
      ),
    })),
  bringToFront: (id) =>
    set((state) => ({
      popups: state.popups.map((popup) =>
        popup.id === id
          ? { ...popup, zIndex: Math.max(...state.popups.map((p) => p.zIndex)) + 1 }
          : popup
      ),
    })),
}));

const PopupsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { popups, closePopup, movePopup, bringToFront } = usePopupStore();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = useCallback(
    (id: number, left: number, top: number) => {
      const container = containerRef.current;
      if (container) {
        const { offsetWidth: containerWidth, offsetHeight: containerHeight } = container;
        const popup = document.querySelector(`[data-id='${id}']`) as HTMLElement;
        if (popup) {
          const { offsetWidth: popupWidth, offsetHeight: popupHeight } = popup;

          let newLeft = Math.max(0, Math.min(left, containerWidth - popupWidth));
          let newTop = Math.max(0, Math.min(top, containerHeight - popupHeight));

          movePopup(id, newLeft, newTop);
        }
      }
    },
    [movePopup]
  );

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      popups.forEach((popup) => {
        const { left = 0, top = 0 } = popup.defaultPosition || {};
        handleDrag(popup.id, left, top);
      });
    }
  }, [popups, handleDrag]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <>
      {children}
      <div ref={containerRef} className={styles.container}>
        {popups.map((popup) => (
          <Popup
            key={popup.id}
            id={popup.id}
            title={popup.title}
            content={popup.content}
            defaultPosition={popup.defaultPosition}
            zIndex={popup.zIndex ?? 1}
            onClose={closePopup}
            onDrag={handleDrag}
            onClick={bringToFront}
          />
        ))}
      </div>
    </>
  );
};

export default PopupsProvider;
export { PopupStore, usePopupStore };