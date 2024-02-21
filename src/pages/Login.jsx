import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import { InlineIcon } from '@iconify/react';
import './style/Login.css';
import LinkButton from '@components/buttons/LinkButton';
import LabelButton from '@components/buttons/LabelButton';

export default function Login() {
  const { login, authed } = useAuth();
  const { state } = useLocation();

  if (authed) {
    return <Navigate to={state?.path || '/'} />;
  }

  // TODO: Error messages on failed login

  return (
    <div className="login">
      <header>
        <InlineIcon
          className="icon"
          icon="ri:chat-smile-3-line"
          height="unset"
        />
        <h1>Welcome to Chat App!</h1>
      </header>

      <form onSubmit={login}>
        <label htmlFor="username">
          Username
          <input type="text" id="username" name="username" required />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            required
          />
        </label>

        <LabelButton
          icon="ri:arrow-right-double-fill"
          inline="true"
          text="Log in"
          type="submit"
          // busy={busy}
        />
      </form>

      <div className="signup-container">
        <Link to="/signup">
          <LinkButton
            icon="ri:arrow-right-double-fill"
            text="Sign up in 10 seconds"
            inline="true"
            // busy={goToChatBusy}
          />
        </Link>
      </div>
    </div>
  );
}
