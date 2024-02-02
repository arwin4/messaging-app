import { InlineIcon } from '@iconify/react';
import React from 'react';

export default function Header() {
  return (
    <header>
      <InlineIcon
        className="icon"
        icon="ri:chat-settings-fill"
        height="unset"
      />
      <h1>Chat settings</h1>
      <form className="close-btn" method="dialog">
        <button className="no-label-btn" aria-label="close modal" type="submit">
          <InlineIcon className="icon" icon="ri:close-line" height="unset" />
        </button>
      </form>
    </header>
  );
}
