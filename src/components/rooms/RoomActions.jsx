/* eslint-disable react/prop-types */
import React from 'react';
import DeleteRoom from './roomActions/DeleteRoom';

export default function RoomActions({ room }) {
  return (
    <menu className="room-actions">
      <DeleteRoom room={room} />
    </menu>
  );
}
