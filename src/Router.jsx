import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import App from './App';
import useAuth from './hooks/auth/useAuth';

// Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/auth/RequireAuth';

// TODO: add error element/page
// TODO: add loading element

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  logout();
  useEffect(() => navigate('/'));
}

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },

    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
