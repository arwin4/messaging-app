import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '@hooks/auth/useAuth';

export default function RequireAuth({ children }) {
  const { authed, setAuthed } = useAuth();
  const location = useLocation();

  // Check if already logged in
  useEffect(() => {
    if (authed) return;

    // Use the user item to check for login
    const user = localStorage.getItem('user');

    if (user) {
      // If there is no 'username' property, the user is not authorized and the
      // object will contain an error message instead.
      const parsedUser = JSON.parse(user);
      if (parsedUser.username) {
        setAuthed(true);
      }
    }
  }, []);

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
