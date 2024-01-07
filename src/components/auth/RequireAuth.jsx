import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/auth/useAuth';
import getJwt from '../../utils/getJwt';

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

      const fetchCurrentUser = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_SERVER_URL}/users/`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${getJwt()}` },
          },
        );
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
      };
      fetchCurrentUser();
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
