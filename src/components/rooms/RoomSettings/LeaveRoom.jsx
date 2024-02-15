import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteMember from '@utils/fetch/deleteMember';
import getCurrentUser from '@utils/getCurrentUser';
import roomPropType from '@components/propTypes/roomPropType';
import { InlineIcon } from '@iconify/react';
import SmallDialog from '@components/dialogs/SmallDialog';

export default function LeaveRoom({ room }) {
  const navigate = useNavigate();
  const leaveRoomModal = useRef();

  function openLeaveRoomModal() {
    leaveRoomModal.current.showModal();
  }

  const closeDeleteConversationModal = useCallback(() => {
    leaveRoomModal.current.close();
  });

  const handleLeaveRoom = useCallback(async () => {
    const currentUser = getCurrentUser();
    await deleteMember(room._id, currentUser._id);
    navigate('/');
  });

  return (
    <>
      <button
        type="button"
        className="label-btn delete-room"
        onClick={() => openLeaveRoomModal()}
      >
        <InlineIcon className="icon" icon="ri:door-open-line" height="unset" />
        Leave chat
      </button>

      <SmallDialog
        onSubmit={handleLeaveRoom}
        onClose={closeDeleteConversationModal}
        title="Leave chat?"
        explanation={
          <div className="explanation">
            <span className="emphasis">
              You won&apos;t be able to rejoin it,
            </span>{' '}
            unless another participants adds you back.
          </div>
        }
        submitBtnText="Yes, leave"
        ref={leaveRoomModal}
      />
    </>
  );
}

/* Prop Types */
LeaveRoom.propTypes = {
  room: roomPropType.isRequired,
};
