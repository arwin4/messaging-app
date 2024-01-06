import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// Components
import Login from './pages/Login';
import Dashboard, { dashboardLoader } from './pages/Dashboard';
import RequireAuth from './components/auth/RequireAuth';
import Logout from './components/Logout';

// TODO: add error element/page
// TODO: add loading element

// Layout function to wrap any of its children inside <RequireAuth>
function RequireAuthLayout() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RequireAuthLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
        },
        {
          path: '/logout',
          element: <Logout />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
