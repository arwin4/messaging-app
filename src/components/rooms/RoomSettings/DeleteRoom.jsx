/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */

import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteRoom from '@utils/fetch/deleteRoom';
import roomPropType from '@components/propTypes/roomPropType';
import LabelButton from '@components/buttons/LabelButton';
import SmallDialog from '@components/dialogs/SmallDialog';

export default function DeleteRoom({ room }) {
  const navigate = useNavigate();
  const deleteRoomModal = useRef();

  function openDeleteConversationModal() {
    deleteRoomModal.current.showModal();
  }

  const closeDeleteConversationModal = useCallback(() => {
    deleteRoomModal.current.close();
  });

  const handleDeleteConversation = useCallback(async () => {
    const res = await deleteRoom(room._id);
    if (res.status !== 200) {
      // TODO: Handle error
    }
    navigate('/');
  });

  return (
    <>
      <LabelButton
        onClick={() => openDeleteConversationModal()}
        icon="ri:delete-bin-2-line"
        text="Delete chat"
      />
      <SmallDialog
        onSubmit={handleDeleteConversation}
        onClose={closeDeleteConversationModal}
        title="Delete chat?"
        explanation={
          <div className="explanation emphasis">
            It will be forever lost to all participants.
          </div>
        }
        submitBtnText="Yes, delete"
        ref={deleteRoomModal}
      />
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
