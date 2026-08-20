import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import App from './App';
import { queryClient } from './lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              border: '1px solid #E2E2E2',
              background: '#FFFFFF',
              color: '#1A1A1A',
              fontSize: '13px',
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
