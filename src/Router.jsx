import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/auth/RequireAuth';
import Logout from './components/Logout';
import Sidebar from './components/Sidebar';

// TODO: add error element/page
// TODO: add loading element
import Room from './pages/Room';
import Friends, { friendsLoader, friendsAction } from './pages/Friends';

// Layout function to wrap any of its children inside <RequireAuth>
function RequireAuthLayout() {
  return (
    <RequireAuth>
      <Sidebar />
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
        },
        {
          path: 'friends',
          element: <Friends />,
          loader: friendsLoader,
          action: friendsAction,
        },
        {
          path: 'conversations/:id',
          element: <Room />,
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
