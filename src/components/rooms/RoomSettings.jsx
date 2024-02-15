import React, { useRef } from 'react';
import roomPropType from '@components/propTypes/roomPropType';
import { InlineIcon } from '@iconify/react';
import socketMessagesPropType from '@components/propTypes/socketMessagesPropType';
import MemberList from './RoomSettings/MemberList';
import AddMembers from './RoomSettings/AddMembers';
import ClearMessages from './RoomSettings/ClearMessages';
import './RoomSettings/style/RoomSettings.css';
import LeaveRoom from './RoomSettings/LeaveRoom';
import DeleteRoom from './RoomSettings/DeleteRoom';
import Header from './RoomSettings/Header';

export default function RoomSettings({ room, socketMessages }) {
  const roomSettingsModal = useRef();

  function openRoomSettingsModal() {
    roomSettingsModal.current.showModal();
  }

  return (
    <>
      <button
        className="no-label-btn"
        type="button"
        onClick={openRoomSettingsModal}
        aria-label="Chat settings"
      >
        <InlineIcon className="icon" icon="ri:settings-4-line" height="unset" />
      </button>

      <dialog className="room-settings-modal" ref={roomSettingsModal}>
        <Header />
        <menu className="settings">
          <DeleteRoom room={room} />
          {room.members.length > 1 && <LeaveRoom room={room} />}
          {room.messages.length + socketMessages.length > 0 && (
            <ClearMessages room={room} />
          )}
        </menu>
        <MemberList room={room} />
        <AddMembers room={room} />
      </dialog>
    </>
  );
}

/* Prop Types */
RoomSettings.propTypes = {
  room: roomPropType.isRequired,
  socketMessages: socketMessagesPropType.isRequired,
};
