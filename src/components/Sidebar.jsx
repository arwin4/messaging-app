import React from 'react';
import { NavLink } from 'react-router-dom';

import useAuth from '../hooks/auth/useAuth';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <nav>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
