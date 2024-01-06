import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/auth/RequireAuth';
import Logout from './components/Logout';

// TODO: add error element/page
// TODO: add loading element

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          index: true,
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/logout',
          element: <Logout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
