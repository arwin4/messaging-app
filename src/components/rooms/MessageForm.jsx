import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import getJwt from '@utils/getJwt';
import './style/MessageForm.css';
import { InlineIcon } from '@iconify/react';
import getCurrentUser from '@utils/getCurrentUser';
import socketMessagesPropType from '@components/propTypes/socketMessagesPropType';

export default function MessageForm({ socketMessages }) {
  const inputRef = useRef();
  const roomId = useParams().id;
  const currentUser = getCurrentUser();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Autofocus on the message field on mount and after each message.
    // Only do this on non-touch screens, keeping the virtual keyboard from showing automatically.
    if (!matchMedia('(pointer:coarse)').matches) inputRef.current.focus();

    // Empty message field after user sends a message, but not on incoming messages
    if (socketMessages.at(-1)?.author.username !== currentUser.username) return;

    inputRef.current.value = '';
  }, [socketMessages]);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/rooms/${roomId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isText: true,
          isImage: false,
          textContent: e.target.message.value,
        }),
      },
    );

    if (!res.ok) inputRef.current.value = 'Unable to send message';

    setBusy(false);
  }

  return (
    <form
      className="send-message"
      method="post"
      action=""
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="message"
        ref={inputRef}
        maxLength={500}
        autoComplete="off"
        disabled={busy}
        required
      />
      <button className="label-btn" type="submit" aria-label="Send message">
        <InlineIcon
          className="icon"
          icon="ri:send-plane-2-line"
          height="unset"
        />
      </button>
    </form>
  );
}

/* Prop Types */
MessageForm.propTypes = {
  socketMessages: socketMessagesPropType.isRequired,
};
