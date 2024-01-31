import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';

// TODO: add error element/page
// TODO: add loading element
import Room from '@pages/Room';
import Friends, { friendsLoader, friendsAction } from '@pages/Friends';
import { roomsLoader } from '@components/dashboard/RoomOverview';
import Error from '@pages/Error';
import RequireAuthLayout from '@components/RequireAuthLayout';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      // Layout function wraps any of its children inside <RequireAuth>
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
