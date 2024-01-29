import React from 'react';
import Welcome from '@components/dashboard/Welcome';
import RoomOverview from '@components/dashboard/RoomOverview';

export default function Dashboard() {
  return (
    <>
      <Welcome />
      <h1>Dashboard</h1>

      <RoomOverview />
    </>
  );
}
