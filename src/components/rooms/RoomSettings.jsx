import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import roomPropType from '@components/propTypes/roomPropType';
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
    // TODO: style group settings button (w/ icon)
    <>
      <button type="button" onClick={openManageMembersModal}>
        Group settings
      </button>

      <dialog className="manage-members-dialog" ref={manageMembersModal}>
        <Header />
        <menu className="settings">
          <DeleteRoom room={room} />
          <LeaveRoom room={room} />
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
