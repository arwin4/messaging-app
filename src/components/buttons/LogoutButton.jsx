import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button type="button" className="logout-button" onClick={handleLogout}>
      Log Out
    </button>
  );
}
