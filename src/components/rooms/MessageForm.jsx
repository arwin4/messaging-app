/* eslint-disable react/prop-types */
import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import getJwt from '../../utils/getJwt';

export default function MessageForm() {
  const actionData = useActionData();

  return (
    <div className="send-message">
      <h2 className="title">Send message</h2>
      <Form method="post" action="">
        <input type="text" name="message" maxLength={500} required />
        <button type="submit">Send</button>

        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </Form>
    </div>
  );
}

export async function messageFormAction({ params, request }) {
  const roomId = params.id;
  const data = await request.formData();

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
        textContent: data.get('message'),
      }),
    },
  );

  if (res.status !== 200) {
    return { error: 'Unable to send message.' };
  }

  // Stay on page
  return redirect(`/conversations/${roomId}`);
}
