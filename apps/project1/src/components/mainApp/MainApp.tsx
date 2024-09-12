import { usePopups } from 'popup-library';
import { FC, lazy, Suspense } from 'react';
import Button from '../button/Button';
import styles from './MainApp.module.scss';

const ComponentA = lazy(() => import('../componentA/ComponentA'));
const ComponentB = lazy(() => import('../componentB/ComponentB'));

const MainApp: FC = () => {
  const { addPopup, closeAll } = usePopups();

  return (
    <div className={styles.app}>
      <Button
        label="Lanzar Popup A"
        onClick={() =>
          addPopup({
            title: 'Popup A',
            content: (
              <Suspense fallback={<div>Loading Component A...</div>}>
                <ComponentA />
              </Suspense>
            ),
            defaultPosition: { left: 100, top: 100, width: 400 },
          })
        }
      />
      <Button
        label="Lanzar Popup B"
        onClick={() =>
          addPopup({
            title: 'Popup B',
            content: (
              <Suspense fallback={<div>Loading Component B...</div>}>
                <ComponentB />
              </Suspense>
            ),
            defaultPosition: { left: 400, top: 400, width: 500 },
          })
        }
      />
      <Button
        label="Cerrar Todos los Popups"
        onClick={closeAll}
      />
    </div>
  );
};

export default MainApp;
