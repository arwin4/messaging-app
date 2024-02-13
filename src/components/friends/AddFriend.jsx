import LabelButton from '@components/buttons/LabelButton';
import React from 'react';
import { useActionData, useFetcher } from 'react-router-dom';

export default function AddFriend() {
  const actionData = useActionData();
  const fetcher = useFetcher();
  const busy = fetcher.state !== 'idle';

  return (
    <div className="add-friend">
      <h1>Add a friend</h1>

      <fetcher.Form className="add-friend-form" method="PATCH">
        <input
          type="text"
          placeholder="username"
          name="new-friend"
          maxLength={100}
          required
          disabled={busy}
        />
        <LabelButton
          icon="ri:user-add-line"
          inline="true"
          text="Add friend"
          type="submit"
          fetcherState={fetcher.state}
        />

        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </fetcher.Form>
    </div>
  );
}
