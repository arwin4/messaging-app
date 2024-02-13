import LabelButton from '@components/buttons/LabelButton';
import React from 'react';
import { Form, useActionData } from 'react-router-dom';

export default function AddFriend() {
  const actionData = useActionData();
  return (
    <div className="add-friend">
      <h1>Add a friend</h1>

      <Form className="add-friend-form" method="PATCH">
        <input
          type="text"
          placeholder="username"
          name="new-friend"
          maxLength={100}
          required
        />
        <LabelButton
          icon="ri:user-add-line"
          inline="true"
          text="Add friend"
          type="submit"
        />

        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </Form>
    </div>
  );
}
