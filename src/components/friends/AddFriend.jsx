import React from 'react';
import { Form, useActionData } from 'react-router-dom';

export default function AddFriend() {
  const actionData = useActionData();
  return (
    <>
      <h2>Add a friend</h2>

      <Form className="add-friend-form" method="PATCH">
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
