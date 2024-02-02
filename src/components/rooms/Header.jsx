import React from 'react';
import PropTypes from 'prop-types';
import roomPropType from '@components/propTypes/roomPropType';
import BackToRoomsButton from './buttons/BackToRoomsButton';
import RoomSettings from './RoomSettings';

export default function Header({ room, setMembersChanged }) {
  return (
    <header>
      <BackToRoomsButton />
      <h1>Group chat</h1>
      <RoomSettings room={room} setMembersChanged={setMembersChanged} />
    </header>
  );
}

/* Prop Types */
Header.propTypes = {
  room: roomPropType.isRequired,
  setMembersChanged: PropTypes.func.isRequired,
};
