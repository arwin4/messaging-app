import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Auth0ProviderWithNavigate from './auth0ProviderWithNavigate';
import Test from './components/Test';
import Home from './components/Home';

function Auth0ProviderLayout() {
  return (
    <Auth0ProviderWithNavigate>
      <Outlet />
    </Auth0ProviderWithNavigate>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth0ProviderLayout />,
    children: [
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: '',
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
