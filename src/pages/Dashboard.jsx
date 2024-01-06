import React from 'react';
import useAuth from '../hooks/auth/useAuth';
import RoomOverview from '../components/rooms/RoomOverview';
// import Welcome from '../components/user/Welcome';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <>
      {/* <Welcome /> */}
      <h1>Dashboard (Private)</h1>
      <button type="button" onClick={logout}>
        Logout
      </button>
      <RoomOverview />
    </>
  );
}
