import { usePopupStore } from '../components/popupProvider/PopupsProvider';

const usePopups = () => {
  const { addPopup, closePopup, closeAll, movePopup } = usePopupStore();

  return {
    addPopup,
    closePopup,
    closeAll,
    movePopup,
  };
};

export { usePopups };
