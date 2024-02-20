import React, { useEffect } from 'react';
import { Link, useLoaderData, useRevalidator } from 'react-router-dom';
import { io } from 'socket.io-client';
import getCurrentUser from '@utils/getCurrentUser';
import roomPropType from '@components/propTypes/roomPropType';
import getJwt from '@utils/getJwt';
import './style/RoomOverview.css';
import { InlineIcon } from '@iconify/react';

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
    <div className="room-overview">
      <h1>Chats</h1>
      {rooms.length === 0 && (
        <div className="no-chats-notice">
          <p>No chats yet!</p>
          <p>↓ Head over to Friends to get started. ↓</p>
        </div>
      )}
      {rooms.map((room) => (
        <RoomItem room={room} key={room._id} />
      ))}
    </div>
  );
}

function RoomItem({ room }) {
  const currentUser = getCurrentUser();

  return (
    <Link to={`/conversations/${room._id}`} type="button" className="room-card">
      <div className="member-count-wrapper">
        <div className="count">{room.members.length}</div>
        <InlineIcon className="icon" icon="ri:user-line" height="unset" />
      </div>
      <div className="members-wrapper">
        {room.members.map((member) => (
          <div className="username" key={member._id}>
            {member.username === currentUser.username ? 'You' : member.username}
          </div>
        ))}
      </div>
    </Link>
  );
}

export async function roomsLoader() {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/rooms/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });

  if (!res.ok) {
    const { errors } = await res.json();
    throw new Response(errors[0].title, { status: res.status });
  }

  const fetchedRooms = await res.json();
  return fetchedRooms.rooms;
}

/* Prop Types */
RoomItem.propTypes = {
  room: roomPropType.isRequired,
};
