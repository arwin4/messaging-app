import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { io } from 'socket.io-client';
import getCurrentUser from '@utils/getCurrentUser';
import useRooms from '@hooks/rooms/useRooms';
import roomPropType from '@components/propTypes/roomPropType';

export default function RoomOverview() {
  const [roomsChanged, setRoomsChanged] = useState(false);
  const {
    rooms: roomData,
    loading: loadingPosts,
    error: fetchError,
  } = useRooms(roomsChanged);

  const currentUser = getCurrentUser();

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
      setRoomsChanged((prev) => !prev);
    }

    userSocket.on('rooms-changed', handleRoomsChange);
    userSocket.on('connect', joinRoom);

    return () => {
      userSocket.disconnect();
      userSocket.off('rooms-changed', handleRoomsChange);
      userSocket.off('connect', joinRoom);
    };
    // }, [roomData]);
  }, []);

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

/* Prop Types */
RoomItem.propTypes = {
  room: roomPropType.isRequired,
};
