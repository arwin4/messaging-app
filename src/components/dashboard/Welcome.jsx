import React from 'react';
import getCurrentUser from '@utils/getCurrentUser';

export default function Welcome() {
  const currentUser = getCurrentUser();
  const { username } = currentUser;
  return (
    <div className="welcome-message">You&apos;re logged in as {username}</div>
  );
}
