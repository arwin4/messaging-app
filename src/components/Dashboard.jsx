import React from 'react';
import useAuth from '../hooks/auth/useAuth';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <>
      <h1>Dashboard (Private)</h1>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}
