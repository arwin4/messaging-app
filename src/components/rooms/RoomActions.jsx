/* eslint-disable react/prop-types */
import React from 'react';
import DeleteRoom from './roomActions/DeleteRoom';
import ManageMembers from './roomActions/ManageMembers';
import LeaveRoom from './roomActions/LeaveRoom';

// TODO: Add leave group button
// TODO: Clear messages button
export default function RoomActions({ room, setMembersChanged }) {
  // The LeaveRoom action is only displayed when there are multiple members,
  // because deleting the room is the equivalent action when the user is the
  // only member.
  return (
    <menu className="room-actions">
      <ManageMembers room={room} setMembersChanged={setMembersChanged} />
      {room.members.length > 1 && <LeaveRoom room={room} />}
      <DeleteRoom room={room} />
    </menu>
  );
}
