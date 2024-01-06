import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/auth/useAuth';

export default function RequireAuth({ children }) {
  const { authed, setAuthed } = useAuth();
  const location = useLocation();

  // TODO: actually verify the token
  // Check if already logged in
  useEffect(() => {
    if (authed) return;

    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setAuthed(true);
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
