import React from 'react';
import './style/RequireAuthLayout.css';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import RequireAuth from './auth/RequireAuth';

export default function RequireAuthLayout() {
  return (
    <RequireAuth>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </RequireAuth>
  );
}
