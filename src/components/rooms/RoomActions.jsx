import React from 'react';
import roomPropType from '@components/propTypes/roomPropType';
import DeleteRoom from './RoomSettings/DeleteRoom';
import ManageMembers from './RoomSettings/ManageMembers';
import LeaveRoom from './RoomSettings/LeaveRoom';

// TODO: Add leave group button
// TODO: Clear messages button
export default function RoomActions({ room }) {
  // The LeaveRoom action is only displayed when there are multiple members,
  // because deleting the room is the equivalent action when the user is the
  // only member.
  return (
    <menu className="room-actions">
      <ManageMembers room={room} />
    </menu>
  );
}

/* Prop Types */
RoomActions.propTypes = {
  room: roomPropType.isRequired,
};
