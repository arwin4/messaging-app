import React, { useCallback, useRef } from 'react';
import roomPropType from '@components/propTypes/roomPropType';
import { InlineIcon } from '@iconify/react';
import SmallDialog from '@components/dialogs/SmallDialog';
import deleteMessages from '@utils/fetch/deleteMessages';

export default function ClearMessages({ room }) {
  const clearMessagesModal = useRef();

  function openClearMessagesModal() {
    clearMessagesModal.current.showModal();
  }

  const closeClearMessagesModal = useCallback(() => {
    clearMessagesModal.current.close();
  });

  const handleClearMessages = useCallback(async () => {
    await deleteMessages(room._id);
  });

  return (
    <>
      <button
        type="button"
        className="label-btn clear-messages"
        onClick={() => openClearMessagesModal()}
      >
        <InlineIcon className="icon" icon="ri:eraser-line" height="unset" />
        Clear chat
      </button>

      <SmallDialog
        onSubmit={handleClearMessages}
        onClose={closeClearMessagesModal}
        title="Clear chat?"
        explanation={
          <div className="explanation emphasis">
            This will permanently delete all messages in this chat.
          </div>
        }
        submitBtnText="Yes, clear"
        ref={clearMessagesModal}
      />
    </>
  );
}

/* Prop Types */
ClearMessages.propTypes = {
  room: roomPropType.isRequired,
};
