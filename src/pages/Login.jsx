import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth/useAuth';

export default function Login() {
  const { login, authed } = useAuth();
  const { state } = useLocation();

  if (authed) {
    return <Navigate to={state?.path || '/'} />;
  }

  // TODO: Error messages on failed login

  return (
    <>
      <h4>Log in</h4>
      <form onSubmit={login}>
        <div>
          <label htmlFor="username">
            Username
            <input type="text" id="username" name="username" required />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password
            <input type="password" name="password" id="password" required />
          </label>
        </div>

        <button type="submit">Log in</button>
      </form>
    </>
  );
}
