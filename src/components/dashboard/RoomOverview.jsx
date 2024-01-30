import React, { useEffect } from 'react';
import { NavLink, useLoaderData, useRevalidator } from 'react-router-dom';
import { io } from 'socket.io-client';
import getCurrentUser from '@utils/getCurrentUser';
import roomPropType from '@components/propTypes/roomPropType';
import getJwt from '@utils/getJwt';

export default function RoomOverview() {
  const rooms = useLoaderData();
  const revalidator = useRevalidator();
  const currentUser = getCurrentUser();

  // Connect userSocket, so the client can receive live updates for rooms
  useEffect(() => {
    const userSocket = currentUser
      ? io(`${import.meta.env.VITE_API_SERVER_URL}/user`, {
          autoConnect: false,
          transports: ['websocket'],
          auth: { token: currentUser._id },
        })
      : null;

    userSocket.connect();

    function joinRoom() {
      userSocket.emit('join-user-room', currentUser._id);
    }

    function handleRoomsChange() {
      revalidator.revalidate();
    }

    userSocket.on('rooms-changed', handleRoomsChange);
    userSocket.on('connect', joinRoom);

    return () => {
      userSocket.disconnect();
      userSocket.off('rooms-changed', handleRoomsChange);
      userSocket.off('connect', joinRoom);
    };
  }, []);

  return (
    <>
      <h2>Your group conversations</h2>
      {rooms
        .filter((room) => room.isGroup)
        .map((room) => (
          <RoomItem room={room} key={room._id} />
        ))}

      <h2>Your one-on-one conversations</h2>
      {rooms
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

export async function roomsLoader() {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/rooms/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
  if (res.status === 401) {
    throw new Response('Unauthorized', { status: res.status });
  }

  const fetchedRooms = await res.json();
  return fetchedRooms.rooms;
}

/* Prop Types */
RoomItem.propTypes = {
  room: roomPropType.isRequired,
};
