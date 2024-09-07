import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './components/mainApp/MainApp';
import { PopupsProvider } from 'popup-library';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopupsProvider>
      <MainApp />
    </PopupsProvider>
  </StrictMode>
);
