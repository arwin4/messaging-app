/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteRoom from '@utils/fetch/deleteRoom';
import roomPropType from '@components/propTypes/roomPropType';
import LabelButton from '@components/buttons/LabelButton';

export default function DeleteRoom({ room }) {
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
    navigate('/');
  }

  return (
    <>
      <LabelButton
        onClick={() => openDeleteConversationModal()}
        icon="ri:delete-bin-2-line"
        text="Delete chat"
      />

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
  );
}

/* Prop Types */
DeleteRoom.propTypes = {
  room: roomPropType.isRequired,
};

LabelButton.defaultProps = {
  type: 'button',
};
