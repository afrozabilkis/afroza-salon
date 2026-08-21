import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SalonProvider } from './context/SalonContext';
import './index.css';

// Register Service Worker for PWA installation on production (Vercel, etc.)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('Service worker registration failed:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SalonProvider>
      <App />
    </SalonProvider>
  </StrictMode>,
);
