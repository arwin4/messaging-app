/* eslint-disable react/prop-types */
import React from 'react';

export default function RoomOverview({ rooms }) {
  console.log(rooms);

  return (
    <>
      <h2>Your conversations</h2>
      {rooms.map((room) => (
        <p key={room._id}>{room._id}</p>
      ))}
    </>
  );
}
