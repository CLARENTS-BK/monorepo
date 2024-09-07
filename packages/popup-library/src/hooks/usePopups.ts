import { usePopupStore } from '../components/popupProvider/PopupsProvider';

export const usePopups = () => {
  const { addPopup, closePopup, closeAll, movePopup } = usePopupStore();

  return {
    addPopup,
    closePopup,
    closeAll,
    movePopup,
  };
};
