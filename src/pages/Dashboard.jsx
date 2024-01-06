import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../hooks/auth/useAuth';
import RoomOverview from '../components/rooms/RoomOverview';
import getRooms from '../utils/fetch/getRooms';

export default function Dashboard() {
  const { logout } = useAuth();
  const { rooms } = useLoaderData();

  return (
    <>
      <h1>Dashboard (Private)</h1>
      <button type="button" onClick={logout}>
        Logout
      </button>
      <RoomOverview rooms={rooms.rooms} />
    </>
  );
}

export const dashboardLoader = async () => {
  const rooms = await getRooms();
  return { rooms };
};
