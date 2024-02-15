import LabelButton from '@components/buttons/LabelButton';
import React, { useEffect, useRef } from 'react';
import { useActionData, useFetcher } from 'react-router-dom';

export default function AddFriend() {
  const actionData = useActionData();
  const fetcher = useFetcher();
  const busy = fetcher.state !== 'idle';
  const inputRef = useRef();

  useEffect(() => {
    // Autofocus and clear input on submit
    if (fetcher.state === 'idle') {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [fetcher.state]);

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
          ref={inputRef}
        />
        <LabelButton
          icon="ri:user-add-line"
          inline="true"
          text="Add friend"
          type="submit"
          busy={busy}
        />

        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </fetcher.Form>
    </div>
  );
}
