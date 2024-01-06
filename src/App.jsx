import React, { useEffect } from 'react';
import './App.css';
import useAuth from './hooks/auth/useAuth';

function App() {
  const { authed, setAuthed } = useAuth();

  // TODO: actually verify the token
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setAuthed(true);
    }
  }, []);

  return (
    <>
      <h1>Home</h1>
      {authed ? 'logged in' : 'logged out'}
    </>
  );
}

export default App;
