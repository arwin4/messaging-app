/* eslint-disable react/prop-types */
import React from 'react';
import { Form, redirect } from 'react-router-dom';
import getJwt from '../../utils/getJwt';

export default function MessageForm({ room }) {
  const { messages } = room;

  return (
    <div className="send-message">
      <h2 className="title">Send message</h2>
      <Form method="post" action="">
        {/* <Form method="post" action={`conversations/${params.id}`}> */}
        <input type="text" name="message" maxLength={500} required />
        <button type="submit">Send</button>
      </Form>
    </div>
  );
}

export async function sendMessage({ params, request }) {
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

  // Stay on page
  return redirect(`/conversations/${roomId}`);
}
