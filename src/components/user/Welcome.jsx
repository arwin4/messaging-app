import React from 'react';
import getCurrentUser from '../../utils/getCurrentUser';

/* eslint-disable react/prop-types */
export default function Welcome() {
  const currentUser = getCurrentUser();
  const { username } = currentUser;
  return <div>You&apos;re logged in as {username}</div>;
}
