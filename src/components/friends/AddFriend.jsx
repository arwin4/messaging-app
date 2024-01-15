import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import getJwt from '../../utils/getJwt';

export default function AddFriend() {
  const actionData = useActionData();
  return (
    <>
      <h2>Add a friend</h2>

      <Form className="add-friend-form" method="post">
        <input
          type="text"
          placeholder="username"
          name="new-friend"
          maxLength={100}
          required
        />
        <button type="submit">Add friend</button>

        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </Form>
    </>
  );
}

export async function addFriendAction({ request }) {
  const data = await request.formData();

  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/friends`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getJwt()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newFriend: data.get('new-friend'),
    }),
  });

  if (res.status !== 200) {
    // TODO: fix error message
    console.log(await res.text());
    return { error: res.error };
  }

  return redirect('');
}
