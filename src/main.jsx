import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@hooks/auth/useAuth';
import Router from './Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
);
