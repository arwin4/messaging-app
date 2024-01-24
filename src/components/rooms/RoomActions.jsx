/* eslint-disable react/prop-types */
import React from 'react';
import DeleteRoom from './roomActions/DeleteRoom';
import ManageMembers from './roomActions/ManageMembers';

// TODO: Add leave group button
// TODO: Clear messages button
export default function RoomActions({ room, setMembersChanged }) {
  return (
    <menu className="room-actions">
      <ManageMembers room={room} setMembersChanged={setMembersChanged} />
      <DeleteRoom room={room} />
    </menu>
  );
}
