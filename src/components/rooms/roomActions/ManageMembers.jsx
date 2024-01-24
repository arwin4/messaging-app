/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import MemberList from './MemberList';
import AddMembers from './AddMembers';

export default function ManageMembers({ room, setMembersChanged }) {
  const manageMembersModal = useRef();

  function openManageMembersModal() {
    manageMembersModal.current.showModal();
  }

  function closeManageMembersModal() {
    manageMembersModal.current.close();
  }

  return (
    <>
      <button type="button" onClick={openManageMembersModal}>
        Manage members
      </button>

      <dialog ref={manageMembersModal}>
        <h1>Manage members</h1>
        <MemberList room={room} setMembersChanged={setMembersChanged} />
        <AddMembers room={room} setMembersChanged={setMembersChanged} />
        <menu>
          <button type="button" onClick={closeManageMembersModal}>
            Close
          </button>
        </menu>
      </dialog>
    </>
  );
}