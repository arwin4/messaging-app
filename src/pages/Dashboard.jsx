import React from 'react';
import RoomOverview from '../components/rooms/RoomOverview';
import Welcome from '../components/user/Welcome';

export default function Dashboard() {
  return (
    <>
      <Welcome />
      <h1>Dashboard</h1>

      <RoomOverview />
    </>
  );
}
