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

      <dialog ref={deleteRoomModal} className="confirmation">
        <header>
          <h1>Delete chat?</h1>
        </header>

        <form onSubmit={handleDeleteConversation}>
          <div className="explanation emphasis">
            It will be forever lost to all participants.
          </div>

          <footer>
            <menu>
              <button
                className="label-btn confirm-btn"
                formMethod="dialog"
                type="submit"
              >
                Yes, delete
              </button>
              <button
                className="label-btn cancel-btn"
                type="button"
                onClick={closeDeleteConversationModal}
              >
                Cancel
              </button>
            </menu>
          </footer>
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
