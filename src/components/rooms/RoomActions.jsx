/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteRoom from '../../utils/fetch/deleteRoom';

export default function RoomActions({ room }) {
  const navigate = useNavigate();
  const deleteRoomModal = useRef();

  function openDeleteConversationModal() {
    deleteRoomModal.current.showModal();
  }

  function closeDeleteConversationModal() {
    deleteRoomModal.current.close();
  }

  async function handleDeleteConversation() {
    const res = await deleteRoom(room._id);
    if (res.status !== 200) {
      // TODO: Handle error
    }
    navigate('/dashboard');
  }

  return (
    <>
      <menu className="room-actions">
        <button
          type="button"
          className="delete-room"
          onClick={openDeleteConversationModal}
        >
          Delete conversation
        </button>
      </menu>

      <dialog ref={deleteRoomModal}>
        <form onSubmit={handleDeleteConversation}>
          <p>
            If you delete this conversation, it will be forever lost to all
            participants.
          </p>
          <p>Are you sure you want to delete this conversation?</p>

          <menu>
            <button formMethod="dialog" type="submit">
              Yes, delete
            </button>
            <button type="button" onClick={closeDeleteConversationModal}>
              Cancel
            </button>
          </menu>
        </form>
      </dialog>
    </>

    // Delete conversation:
    // Display modal
    // api -> delete room
    // handle error
  );
}
