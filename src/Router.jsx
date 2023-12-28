import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Test from './components/Test';
import Home from './components/Home';
import Callback from './views/Callback';
import Auth0ProviderWithNavigate from './auth0ProviderWithNavigate';
import Protected from './components/Protected';
import AuthenticationGuard from './components/auth/AuthenticationGuard';

// TODO: add error element/page
// TODO: add loading element

function Auth0ProviderLayout() {
  return (
    <Auth0ProviderWithNavigate>
      <Outlet />
    </Auth0ProviderWithNavigate>
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
        {
          path: '',
          element: <Home />,
        },

        { path: 'callback', element: <Callback /> },
        {
          path: 'protected',
          element: <AuthenticationGuard component={Protected} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
