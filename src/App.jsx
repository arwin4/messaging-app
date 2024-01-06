import React from 'react';
import './App.css';
import useAuth from './hooks/auth/useAuth';

function App() {
  const { authed } = useAuth();

  return (
    <>
      <h1>Home</h1>
      {authed ? 'logged in' : 'logged out'}
    </>
  );
}

export default App;
