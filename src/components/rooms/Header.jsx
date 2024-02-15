import React from 'react';
import roomPropType from '@components/propTypes/roomPropType';
import socketMessagesPropType from '@components/propTypes/socketMessagesPropType';
import RoomSettings from './RoomSettings';
import '../style/Header.css';

export default function Header({ room, socketMessages }) {
  return (
    <header className="room-header">
      <h1>Chat</h1>
      <RoomSettings room={room} socketMessages={socketMessages} />
    </header>
  );
}

/* Prop Types */
Header.propTypes = {
  room: roomPropType.isRequired,
  socketMessages: socketMessagesPropType.isRequired,
};
