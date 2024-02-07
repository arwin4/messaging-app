import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteMember from '@utils/fetch/deleteMember';
import getCurrentUser from '@utils/getCurrentUser';
import roomPropType from '@components/propTypes/roomPropType';
import { InlineIcon } from '@iconify/react';

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
    navigate('/');
  }

  return (
    <>
      <button
        type="button"
        className="label-btn delete-room"
        onClick={openLeaveRoomModal}
      >
        <InlineIcon className="icon" icon="ri:door-open-line" height="unset" />
        Leave chat
      </button>

      <dialog ref={leaveRoomModal} className="confirmation">
        <header>
          <h1>Leave chat?</h1>
        </header>

        <form onSubmit={handleLeaveRoom}>
          <div className="explanation">
            <span className="emphasis">
              You won&apos;t be able to rejoin it,
            </span>{' '}
            unless another participants adds you back.
          </div>

          <footer>
            <menu>
              <button
                className="label-btn confirm-btn"
                formMethod="dialog"
                type="submit"
              >
                Yes, leave
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
LeaveRoom.propTypes = {
  room: roomPropType.isRequired,
};
