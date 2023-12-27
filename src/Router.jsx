import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import Test from './components/Test';

// TODO: add error element/page
// TODO: add loading element

function Auth0ProviderLayout() {
  return (
    <Auth0Provider>
      <Outlet />
    </Auth0Provider>
  );
}

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Auth0ProviderLayout />,
      children: [
        {
          path: 'test',
          element: <Test />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
