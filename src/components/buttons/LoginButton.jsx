import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <button type="button" className="login-button" onClick={handleLogin}>
      Log In
    </button>
  );
}
