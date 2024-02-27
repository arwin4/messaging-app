import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAndSetCurrentUser from '@utils/fetch/fetchAndSetCurrentUser';

const authContext = createContext();

function useAuth() {
  const [authed, setAuthed] = useState(false);

  async function login(e) {
    e.preventDefault();

    // Fetch and set token
    const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    if (res.status !== 200) {
      setAuthed(false);
      return res;
    }

    const token = await res.json();

    /* There are a lot different well thought-out opinions about secure JWT
    storage, by people with much more experience than the author of this app.
    localStorage seems fine for this project. */
    // Slice() removes the quotes around the string
    localStorage.setItem('jwt', JSON.stringify(token).slice(1, -1));
    await fetchAndSetCurrentUser();

    setAuthed(true);
    return res;
  }

  function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setAuthed(false);
  }

  return { authed, setAuthed, login, logout };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
