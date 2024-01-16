/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import getRooms from '../../utils/fetch/getRooms';
import getCurrentUser from '../../utils/getCurrentUser';

export default function RoomOverview() {
  const {
    rooms: roomData,
    loading: loadingPosts,
    error: fetchError,
  } = getRooms();

  if (fetchError)
    return <>There was an error loading the rooms: {fetchError}</>;
  if (loadingPosts) return <>Loading rooms...</>;

  return (
    <>
      <h2>Your group conversations</h2>
      {roomData.rooms
        .filter((room) => room.isGroup)
        .map((room) => (
          <RoomItem room={room} key={room._id} />
        ))}

      <h2>Your one-on-one conversations</h2>
      {roomData.rooms
        .filter((room) => room.isGroup === false)
        .map((room) => (
          <RoomItem room={room} key={room._id} />
        ))}
    </>
  );
}

function RoomItem({ room }) {
  const currentUser = getCurrentUser();
  // TODO: semantic html: list item
  return (
    <div>
      <NavLink to={`/conversations/${room._id}`}>
        {room.members.map((member, i, { length }) => {
          if (length === 1) return 'Just you';
          if (member.username === currentUser.username) return '';
          return `${member.username} `;
        })}
      </NavLink>
    </div>
  );
}
