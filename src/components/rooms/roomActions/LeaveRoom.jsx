/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteMember from '../../../utils/fetch/deleteMember';
import getCurrentUser from '../../../utils/getCurrentUser';

export default function LeaveRoom({ room }) {
  const leaveRoomModal = useRef();
  const navigate = useNavigate();

  function openLeaveRoomModal() {
    leaveRoomModal.current.showModal();
  }

  function closeDeleteConversationModal() {
    leaveRoomModal.current.close();
  }

  async function handleLeaveRoom() {
    const currentUser = getCurrentUser();
    await deleteMember(room._id, currentUser._id);
    navigate('/dashboard');
  }

  return (
    <>
      <button
        type="button"
        className="delete-room"
        onClick={openLeaveRoomModal}
      >
        Leave conversation
      </button>

      <dialog ref={leaveRoomModal}>
        <form onSubmit={handleLeaveRoom}>
          <p>
            If you leave this conversation, you won&apos;t be able to rejoin it,
            unless one of the other participants adds you back to it.
          </p>
          <p>Are you sure you want to leave this conversation?</p>

          <menu>
            <button formMethod="dialog" type="submit">
              Yes, leave
            </button>
            <button type="button" onClick={closeDeleteConversationModal}>
              Cancel
            </button>
          </menu>
        </form>
      </dialog>
    </>
  );
}
