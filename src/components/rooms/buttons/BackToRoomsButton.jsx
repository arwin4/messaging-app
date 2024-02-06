import { InlineIcon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function BackToRoomsButton() {
  return (
    <Link className="no-label-btn" to="/">
      <InlineIcon className="icon" icon="ri:arrow-left-line" height="unset" />
    </Link>
  );
}
