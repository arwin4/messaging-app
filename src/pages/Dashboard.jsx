import React from 'react';
import RoomOverview from '../components/dashboard/RoomOverview';
import Welcome from '../components/dashboard/Welcome';

export default function Dashboard() {
  return (
    <>
      <Welcome />
      <h1>Dashboard</h1>

      <RoomOverview />
    </>
  );
}
