import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// Components
import RequireAuth from '@components/auth/RequireAuth';
import Logout from '@components/Logout';
import Sidebar from '@components/Sidebar';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';

// TODO: add error element/page
// TODO: add loading element
import Room from '@pages/Room';
import Friends, { friendsLoader, friendsAction } from '@pages/Friends';
import { roomsLoader } from '@components/dashboard/RoomOverview';
import Error from '@pages/Error';

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
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: roomsLoader,
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
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
