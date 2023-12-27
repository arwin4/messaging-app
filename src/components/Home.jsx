import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { LogoutButton } from './buttons/LogoutButton';

export default function Home() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <h1>Home</h1>
      {isAuthenticated && 'You are logged in. '}

      <Link to="test">Go to test</Link>
      <LogoutButton />
    </>
  );
}
