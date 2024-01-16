import React from 'react';
import { NavLink } from 'react-router-dom';
import getRooms from '../../utils/fetch/getRooms';

export default function RoomOverview() {
  const { rooms, loading: loadingPosts, error: fetchError } = getRooms();

  if (fetchError)
    return <>There was an error loading the rooms: {fetchError}</>;
  if (loadingPosts) return <>Loading rooms...</>;

  return (
    <>
      <h2>Your conversations</h2>
      {rooms.rooms.map((room) => (
        <div key={room._id}>
          <NavLink to={`/conversations/${room._id}`}>{room._id}</NavLink>
        </div>
      ))}
    </>
  );
}
