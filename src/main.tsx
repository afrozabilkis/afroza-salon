import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SalonProvider } from './context/SalonContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SalonProvider>
      <App />
    </SalonProvider>
  </StrictMode>,
);
