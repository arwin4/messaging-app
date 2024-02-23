import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import Login from '@pages/Login';

// TODO: add error element/page
// TODO: add loading element
import Room, { roomLoader } from '@pages/Room';
import Friends, { friendsLoader, friendsAction } from '@pages/Friends';
import RoomOverview, { roomsLoader } from '@components/dashboard/RoomOverview';
import Error from '@pages/Error';
import RequireAuthLayout from '@components/RequireAuthLayout';
import Profile from '@pages/Profile';
import Signup, { signupAction } from '@pages/Signup';
import LandingLayout from '@components/LandingLayout';

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
          element: <RoomOverview />,
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
          loader: roomLoader,
        },
        { path: 'profile', element: <Profile /> },
      ],
    },
    {
      path: '/login',
      element: (
        <LandingLayout>
          <Login />
        </LandingLayout>
      ),
      errorElement: <Error />,
    },
    {
      path: '/signup',
      element: (
        <LandingLayout>
          <Signup />
        </LandingLayout>
      ),
      errorElement: <Error />,
      action: signupAction,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
