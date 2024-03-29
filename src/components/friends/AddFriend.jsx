import LabelButton from '@components/buttons/LabelButton';
import React, { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';

export default function AddFriend() {
  const fetcher = useFetcher();
  const errors = fetcher.data;
  const busy = fetcher.state !== 'idle';
  const inputRef = useRef();

  const errorElement = errors ? (
    <div className="errors">
      {errors?.map((error) => (
        <p key={error.title}>{error.title}</p>
      ))}
    </div>
  ) : undefined;

  useEffect(() => {
    // Autofocus and clear input on submit
    if (fetcher.state === 'idle') {
      inputRef.current.value = '';

      // Autofocus only on non-touch screens, keeping the virtual keyboard from showing automatically
      if (!matchMedia('(pointer:coarse)').matches) inputRef.current.focus();
    }
  }, [fetcher.state]);

  return (
    <div className="add-friend">
      <h2 className="title section-title">Add a friend</h2>
      {errorElement}

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
      </fetcher.Form>
    </div>
  );
}
