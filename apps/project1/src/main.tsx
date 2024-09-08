import { PopupsProvider } from 'popup-library';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './components/mainApp/MainApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopupsProvider>
      <MainApp />
    </PopupsProvider>
  </StrictMode>
);
