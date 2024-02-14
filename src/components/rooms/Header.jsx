import React from 'react';
import roomPropType from '@components/propTypes/roomPropType';
import BackToRoomsButton from './buttons/BackToRoomsButton';
import RoomSettings from './RoomSettings';
import '../style/Header.css';

export default function Header({ room }) {
  return (
    <header className="room-header">
      <BackToRoomsButton />
      <h1>Group chat</h1>
      <RoomSettings room={room} />
    </header>
  );
}

/* Prop Types */
Header.propTypes = {
  room: roomPropType.isRequired,
};
