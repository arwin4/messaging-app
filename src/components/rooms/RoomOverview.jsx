import React from 'react';
import getRooms from '../../utils/fetch/getRooms';

export default function RoomOverview() {
  const { rooms, loading: loadingPosts, error: fetchError } = getRooms();

  if (fetchError)
    return <>There was an error loading the blog posts: {fetchError}</>;
  if (loadingPosts) return <>Loading posts...</>;

  return (
    <>
      <h2>Your conversations</h2>
      {rooms.rooms.map((room) => (
        <p key={room._id}>{room._id}</p>
      ))}
    </>
  );
}
