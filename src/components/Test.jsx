import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from './buttons/LoginButton';

export default function Test() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <h1>Test page</h1>
      {isAuthenticated && 'You are logged in. '}

      <LoginButton />
    </>
  );
}
