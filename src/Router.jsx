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
import { sendMessage } from './components/rooms/MessageForm';
import Friends, { friendLoader } from './pages/Friends';
import { addFriendAction } from './components/friends/AddFriend';

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
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'friends',
          element: <Friends />,
          action: addFriendAction,
          loader: friendLoader,
        },
        { path: 'conversations/:id', element: <Room />, action: sendMessage },
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
