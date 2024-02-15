import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import RequireAuth from './auth/RequireAuth';

export default function RequireAuthLayout() {
  return (
    <RequireAuth>
      <main>
        <Outlet />
      </main>
      <Navigation />
    </RequireAuth>
  );
}
