/// <reference types="vite/client" />
declare module 'popup-library' {
  export const usePopups: () => {
    addPopup: (popup: any) => void;
    closeAll: () => void;
  };

  export const PopupsProvider: React.FC<{ children: React.ReactNode }>;
}
