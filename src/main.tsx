import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { FitTrackProvider } from './state/useFitTrackState';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FitTrackProvider>
      <App />
    </FitTrackProvider>
  </StrictMode>,
);
