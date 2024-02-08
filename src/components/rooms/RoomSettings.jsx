import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import roomPropType from '@components/propTypes/roomPropType';
import { InlineIcon } from '@iconify/react';
import MemberList from './RoomSettings/MemberList';
import AddMembers from './RoomSettings/AddMembers';
import './RoomSettings/style/ManageMembers.css';
import LeaveRoom from './RoomSettings/LeaveRoom';
import DeleteRoom from './RoomSettings/DeleteRoom';
import Header from './RoomSettings/Header';

export default function RoomSettings({ room, setMembersChanged }) {
  const manageMembersModal = useRef();

  function openManageMembersModal() {
    manageMembersModal.current.showModal();
  }

  return (
    <>
      <button
        className="no-label-btn"
        type="button"
        onClick={openManageMembersModal}
        aria-label="Chat settings"
      >
        <InlineIcon className="icon" icon="ri:settings-4-line" height="unset" />
      </button>

      <dialog className="manage-members-dialog" ref={manageMembersModal}>
        <Header />
        <menu className="settings">
          <DeleteRoom room={room} />
          {room.members.length > 1 && <LeaveRoom room={room} />}
        </menu>
        <MemberList room={room} setMembersChanged={setMembersChanged} />
        <AddMembers room={room} setMembersChanged={setMembersChanged} />
      </dialog>
    </>
  );
}

/* Prop Types */
RoomSettings.propTypes = {
  room: roomPropType.isRequired,
  setMembersChanged: PropTypes.func.isRequired,
};
