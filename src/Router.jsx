import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// TODO: add error element/page
// TODO: add loading element

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
