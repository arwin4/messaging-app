import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import getJwt from '@utils/getJwt';
import './style/MessageForm.css';
import { InlineIcon } from '@iconify/react';

export default function MessageForm() {
  const inputRef = useRef();
  const roomId = useParams().id;

  /**
   * Reset message field using an effect
   *
   * A dependency for this effect is not needed, nor is a state variable
   * 'messageSent'. If the message is sent succesfully, it will change the
   * socketMessages state of the parent Room component. That will trigger a
   * rerender for this component as well. If the message was not sent
   * succesfully, the message form does not need to be cleared.
   */
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.value = '';
  });

  async function handleSubmit(e) {
    e.preventDefault();

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

    if (res.status !== 200) {
      // TODO: handle error
      // return { error: 'Unable to send message.' };
    }
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
